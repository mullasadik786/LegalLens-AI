import {
  AgentHarnessState,
  ToolCallExecution,
  ShipmentStatus
} from '../../src/types/ecommerce';
import { queryDatabaseTool } from '../tools/orderDatabase';
import { checkShippingCarrierApiTool } from '../tools/carrierService';
import { initiateStripeRefundTool, executeStripeRefund } from '../tools/stripeService';

// Confidential words that MUST NEVER appear in customer-facing messages
const FORBIDDEN_CONFIDENTIAL_TERMS = [
  'trueforge',
  'harness',
  'sandbox',
  'system prompt',
  'json schema',
  'prompt injection',
  'function calling'
];

/**
 * Strips/sanitizes any confidential framework leakages from customer-facing text
 */
export function sanitizeCustomerText(text: string): string {
  let sanitized = text;
  for (const term of FORBIDDEN_CONFIDENTIAL_TERMS) {
    const reg = new RegExp(term, 'gi');
    sanitized = sanitized.replace(reg, 'internal system');
  }
  return sanitized;
}

/**
 * Extracts order ID and email from message or parameters
 */
export function parseCustomerInput(input: string): { orderId?: string; email?: string } {
  const orderMatch = input.match(/\b(ORD-\d{4})\b/i);
  const emailMatch = input.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);

  return {
    orderId: orderMatch ? orderMatch[1].toUpperCase() : undefined,
    email: emailMatch ? emailMatch[0].toLowerCase() : undefined
  };
}

export class TrueForgeAgentHarness {
  private state: AgentHarnessState;

  constructor() {
    this.state = {
      phase: 'IDLE',
      activeOrderId: null,
      activeCustomerEmail: null,
      orderData: null,
      carrierData: null,
      pendingRefund: null,
      toolsExecuted: []
    };
  }

  public getState(): AgentHarnessState {
    return { ...this.state };
  }

  /**
   * Resets the harness session
   */
  public resetSession() {
    this.state = {
      phase: 'IDLE',
      activeOrderId: null,
      activeCustomerEmail: null,
      orderData: null,
      carrierData: null,
      pendingRefund: null,
      toolsExecuted: []
    };
  }

  /**
   * Process incoming customer message following the strict Core Workflow Loop
   */
  public async processCustomerMessage(userMessage: string, explicitOrderId?: string, explicitEmail?: string): Promise<{
    agentReply: string;
    state: AgentHarnessState;
    newTools: ToolCallExecution[];
  }> {
    const newTools: ToolCallExecution[] = [];

    // Parse extracted identifiers
    const parsed = parseCustomerInput(userMessage);
    const orderId = explicitOrderId || parsed.orderId || this.state.activeOrderId;
    const email = explicitEmail || parsed.email || this.state.activeCustomerEmail;

    if (orderId) this.state.activeOrderId = orderId;
    if (email) this.state.activeCustomerEmail = email;

    // STEP 1: Authentication & Greeting
    // If order_id has not been captured yet, prompt politely and DO NOT proceed with any backend queries
    if (!this.state.activeOrderId) {
      this.state.phase = 'AUTHENTICATING';
      const greeting =
        "Hello! I would be glad to assist you with your package inquiry. To locate your shipment and investigate its status, could you please provide your order ID (for example, ORD-8821) and your registered account email address?";

      return {
        agentReply: greeting,
        state: this.getState(),
        newTools
      };
    }

    // If order_id captured but we haven't run investigation, run Step 2 sequential tool calling
    this.state.phase = 'INVESTIGATING';

    // STEP 2: Sequential Tool Calling
    // 1. First, call query_database
    const t0 = Date.now();
    const dbResult = await queryDatabaseTool({
      order_id: this.state.activeOrderId,
      customer_email: this.state.activeCustomerEmail || undefined
    });
    const t1 = Date.now();

    const dbToolExecution: ToolCallExecution = {
      id: `tool_call_db_${Date.now()}`,
      toolName: 'query_database',
      arguments: {
        order_id: this.state.activeOrderId,
        customer_email: this.state.activeCustomerEmail || undefined
      },
      result: dbResult,
      timestamp: new Date().toISOString(),
      durationMs: t1 - t0,
      status: dbResult.success ? 'success' : 'error'
    };

    this.state.toolsExecuted.push(dbToolExecution);
    newTools.push(dbToolExecution);

    if (!dbResult.orderExists || !dbResult.order) {
      this.state.phase = 'AUTHENTICATING';
      const reply = `I searched our records, but could not find an order matching "${this.state.activeOrderId}". Please double-check your order number and registered email address so I can locate your purchase.`;
      return {
        agentReply: reply,
        state: this.getState(),
        newTools
      };
    }

    this.state.orderData = dbResult.order;

    // 2. Second, call check_shipping_carrier_api
    const t2 = Date.now();
    const carrierResult = await checkShippingCarrierApiTool({
      tracking_number: dbResult.order.trackingNumber
    });
    const t3 = Date.now();

    const carrierToolExecution: ToolCallExecution = {
      id: `tool_call_carrier_${Date.now()}`,
      toolName: 'check_shipping_carrier_api',
      arguments: { tracking_number: dbResult.order.trackingNumber },
      result: carrierResult,
      timestamp: new Date().toISOString(),
      durationMs: t3 - t2,
      status: carrierResult.success ? 'success' : 'error'
    };

    this.state.toolsExecuted.push(carrierToolExecution);
    newTools.push(carrierToolExecution);

    if (!carrierResult.carrierFound || !carrierResult.trackingInfo) {
      const reply = `I verified Order ${dbResult.order.id}, but the carrier (${dbResult.order.carrier}) has not published active transit data for tracking number ${dbResult.order.trackingNumber} yet. I will continue to monitor this for you.`;
      return {
        agentReply: reply,
        state: this.getState(),
        newTools
      };
    }

    this.state.carrierData = carrierResult.trackingInfo;
    const status: ShipmentStatus = carrierResult.trackingInfo.status;

    // STEP 3: Decision Matrix
    // SCENARIO A: Shipment Status is "DELIVERED"
    if (status === 'DELIVERED') {
      this.state.phase = 'RESOLVED_DELIVERED';
      const proof = carrierResult.trackingInfo.proofDetails;
      const deliveredTime = carrierResult.trackingInfo.deliveredAt || 'recently';
      const proofStr = proof
        ? `Delivered to: ${proof.deliveredTo} (${proof.signedBy || proof.locationNote || 'Signed on delivery'})`
        : 'Confirmed delivery by courier driver';

      const reply =
        `Thank you for waiting. According to ${dbResult.order.carrier} records, your package for Order ${dbResult.order.id} was successfully delivered on ${deliveredTime}.\n\n` +
        `• Delivery Location: ${proofStr}\n` +
        `• Carrier Tracking Number: ${dbResult.order.trackingNumber}\n\n` +
        `Because the carrier has officially confirmed delivery of the parcel, I cannot issue a refund for this order. If you are unable to find the package, we recommend checking with your household members or neighbors, or filing a missing package / stolen property report with local authorities and the courier.`;

      // Terminate process (no refund tool, no pause)
      return {
        agentReply: sanitizeCustomerText(reply),
        state: this.getState(),
        newTools
      };
    }

    // SCENARIO B: Shipment Status is "IN-TRANSIT" or "DELAYED"
    if (status === 'IN-TRANSIT' || status === 'DELAYED') {
      this.state.phase = 'RESOLVED_IN_TRANSIT';
      const location = carrierResult.trackingInfo.currentLocation || 'In transit';
      const eta = carrierResult.trackingInfo.estimatedDelivery || 'in 2-3 business days';

      const reply =
        `I checked with ${carrierResult.trackingInfo.carrier} regarding your shipment for Order ${dbResult.order.id}.\n\n` +
        `Your package is currently in transit at ${location}, and the estimated delivery date is ${eta}.\n\n` +
        `Please allow a little more time for the courier to complete delivery. Our automated monitoring system will continue tracking your parcel until it reaches your doorstep.`;

      // Terminate process (no refund tool, no pause)
      return {
        agentReply: sanitizeCustomerText(reply),
        state: this.getState(),
        newTools
      };
    }

    // SCENARIO C: Shipment Status is "LOST" or "EXCEPTION"
    if (status === 'LOST' || status === 'EXCEPTION') {
      // 1. Apologize sincerely and inform about full refund preparation
      // 2. CRITICAL ACTIONS:
      //    a. Call initiate_stripe_refund with exact order_id and calculated amount
      //    b. Enter TrueForge Pause State immediately. Stop autonomous text generation.
      const t4 = Date.now();
      const refundResult = await initiateStripeRefundTool({
        order_id: dbResult.order.id,
        amount: dbResult.order.totalAmount,
        currency: dbResult.order.currency,
        reason: carrierResult.trackingInfo.exceptionReason || 'Courier officially declared shipment lost'
      });
      const t5 = Date.now();

      const refundToolExecution: ToolCallExecution = {
        id: `tool_call_refund_${Date.now()}`,
        toolName: 'initiate_stripe_refund',
        arguments: {
          order_id: dbResult.order.id,
          amount: dbResult.order.totalAmount
        },
        result: refundResult,
        timestamp: new Date().toISOString(),
        durationMs: t5 - t4,
        status: 'success'
      };

      this.state.toolsExecuted.push(refundToolExecution);
      newTools.push(refundToolExecution);

      this.state.pendingRefund = refundResult.refundRecord;
      this.state.phase = 'PAUSED_FOR_APPROVAL';
      this.state.pauseTimestamp = new Date().toISOString();

      const reply =
        `I am sincerely sorry for the inconvenience. The carrier (${carrierResult.trackingInfo.carrier}) has officially declared your package for Order ${dbResult.order.id} as lost in transit.\n\n` +
        `I have prepared an immediate full refund of $${dbResult.order.totalAmount.toFixed(2)} ${dbResult.order.currency} to your original payment method. For financial security and accounting verification, this refund request is now queued for final administrative confirmation. Our supervisor will verify and complete the transfer shortly.`;

      // Return paused state
      return {
        agentReply: sanitizeCustomerText(reply),
        state: this.getState(),
        newTools
      };
    }

    return {
      agentReply: "I have investigated your order details and am monitoring the shipment.",
      state: this.getState(),
      newTools
    };
  }

  /**
   * STEP 4: Post-Approval Execution
   * Called when the human administrator clicks "Approve" or "Reject"
   */
  public async resolveHumanApproval(
    decision: 'APPROVE' | 'REJECT',
    adminName: string = 'Supervisor Admin',
    adminNote?: string
  ): Promise<{
    agentReply: string;
    state: AgentHarnessState;
    settledReceipt?: any;
  }> {
    if (!this.state.pendingRefund) {
      throw new Error('No pending refund exists in the TrueForge Agent Harness to approve or reject.');
    }

    const refundId = this.state.pendingRefund.refundId;
    const settlement = await executeStripeRefund(refundId, decision, adminName, adminNote);

    if (decision === 'APPROVE') {
      this.state.phase = 'RESOLVED_REFUNDED';
      this.state.pendingRefund = settlement.refund;

      const receipt = settlement.receipt!;
      const reply =
        `Great news! Your full refund for Order ${this.state.orderData?.id} has been approved and processed successfully.\n\n` +
        `• Refund Amount: $${receipt.settledAmount.toFixed(2)} ${receipt.currency}\n` +
        `• Stripe Transaction ID: ${receipt.stripeRefundId}\n` +
        `• Payment Destination: ${receipt.destinationCard}\n` +
        `• Estimated Arrival: ${receipt.estimatedArrivalDays}\n\n` +
        `A confirmation receipt has also been dispatched to your email (${this.state.orderData?.customerEmail}). Thank you for your patience and understanding!`;

      return {
        agentReply: sanitizeCustomerText(reply),
        state: this.getState(),
        settledReceipt: receipt
      };
    } else {
      this.state.phase = 'RESOLVED_MANUAL_REVIEW';
      this.state.pendingRefund = settlement.refund;

      const reply =
        `Regarding Order ${this.state.orderData?.id}: The automatic refund could not be completed at this time. Your case has been escalated to a customer support specialist for manual review. A representative will reach out directly to ${this.state.orderData?.customerEmail} within 1 business day.`;

      return {
        agentReply: sanitizeCustomerText(reply),
        state: this.getState()
      };
    }
  }
}
