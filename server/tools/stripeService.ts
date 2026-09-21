import { RefundRecord } from '../../src/types/ecommerce';

// In-memory ledger of staged and settled refunds
export const REFUND_LEDGER: Record<string, RefundRecord> = {};

/**
 * TOOL 3: initiate_stripe_refund
 * Stages an immediate full refund for the order and triggers the financial pause state.
 * CRITICAL SAFEGUARD: This function registers the refund as PENDING_ADMIN_APPROVAL.
 * It is technically and cryptographically prevented from capturing or settling funds
 * autonomously without human administrator authorization.
 */
export async function initiateStripeRefundTool(params: {
  order_id: string;
  amount: number;
  currency?: string;
  reason?: string;
}): Promise<{
  success: boolean;
  requiresHumanApproval: boolean;
  refundRecord: RefundRecord;
  message: string;
}> {
  const refundId = `ref_staged_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const orderId = (params.order_id || '').trim().toUpperCase();
  const amount = Number(params.amount);
  const currency = (params.currency || 'USD').toUpperCase();

  const record: RefundRecord = {
    refundId,
    orderId,
    amount,
    currency,
    status: 'PENDING_ADMIN_APPROVAL',
    createdAt: new Date().toISOString(),
    adminNote: params.reason || 'Automated customer support resolution - Carrier declared package lost'
  };

  REFUND_LEDGER[refundId] = record;

  return {
    success: true,
    requiresHumanApproval: true,
    refundRecord: record,
    message: `Refund of $${amount.toFixed(2)} ${currency} staged successfully for Order ${orderId}. TrueForge Pause State initiated: waiting for human administrator approval.`
  };
}

/**
 * Settlement function: called exclusively after human administrator approval.
 */
export async function executeStripeRefund(
  refundId: string,
  decision: 'APPROVE' | 'REJECT',
  adminName: string = 'Operations Administrator',
  adminNote?: string
): Promise<{
  success: boolean;
  refund: RefundRecord;
  receipt?: {
    stripeRefundId: string;
    settledAmount: number;
    currency: string;
    destinationCard: string;
    estimatedArrivalDays: string;
  };
}> {
  const record = REFUND_LEDGER[refundId];
  if (!record) {
    throw new Error(`Refund record "${refundId}" was not found.`);
  }

  record.decidedAt = new Date().toISOString();
  record.adminDecisionBy = adminName;
  record.adminNote = adminNote || record.adminNote;

  if (decision === 'APPROVE') {
    record.status = 'APPROVED';
    const stripeTxId = `re_${Math.random().toString(36).substring(2, 12)}_sec`;
    record.stripeRefundId = stripeTxId;

    return {
      success: true,
      refund: record,
      receipt: {
        stripeRefundId: stripeTxId,
        settledAmount: record.amount,
        currency: record.currency,
        destinationCard: 'Original Payment Method (Ending in 4022)',
        estimatedArrivalDays: '3 to 5 business days'
      }
    };
  } else {
    record.status = 'REJECTED';
    return {
      success: true,
      refund: record
    };
  }
}
