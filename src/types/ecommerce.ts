export type ShipmentStatus = 'DELIVERED' | 'IN-TRANSIT' | 'DELAYED' | 'LOST' | 'EXCEPTION';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  currency: string;
  items: OrderItem[];
  shippingAddress: string;
  trackingNumber: string;
  carrier: 'FedEx' | 'UPS' | 'USPS' | 'DHL';
}

export interface CarrierTrackingInfo {
  trackingNumber: string;
  carrier: 'FedEx' | 'UPS' | 'USPS' | 'DHL';
  status: ShipmentStatus;
  currentLocation: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  proofDetails?: {
    deliveredTo: string;
    signedBy?: string;
    locationNote?: string;
  };
  exceptionReason?: string;
  history: {
    timestamp: string;
    location: string;
    status: string;
    detail: string;
  }[];
}

export interface RefundRecord {
  refundId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'PENDING_ADMIN_APPROVAL' | 'APPROVED' | 'REJECTED';
  stripeRefundId?: string;
  createdAt: string;
  decidedAt?: string;
  adminDecisionBy?: string;
  adminNote?: string;
}

export interface ToolCallExecution {
  id: string;
  toolName: 'query_database' | 'check_shipping_carrier_api' | 'initiate_stripe_refund';
  arguments: Record<string, any>;
  result: Record<string, any>;
  timestamp: string;
  durationMs: number;
  status: 'success' | 'error';
}

export type HarnessAgentPhase =
  | 'IDLE'
  | 'AUTHENTICATING'
  | 'INVESTIGATING'
  | 'PAUSED_FOR_APPROVAL'
  | 'RESOLVED_DELIVERED'
  | 'RESOLVED_IN_TRANSIT'
  | 'RESOLVED_REFUNDED'
  | 'RESOLVED_MANUAL_REVIEW';

export interface AgentHarnessState {
  phase: HarnessAgentPhase;
  activeOrderId: string | null;
  activeCustomerEmail: string | null;
  orderData: Order | null;
  carrierData: CarrierTrackingInfo | null;
  pendingRefund: RefundRecord | null;
  toolsExecuted: ToolCallExecution[];
  pauseTimestamp?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  text: string;
  timestamp: string;
  metadata?: {
    phase?: HarnessAgentPhase;
    toolCallIds?: string[];
    isPaused?: boolean;
    refundDetails?: {
      refundId: string;
      amount: number;
      stripeRefundId: string;
      status: string;
    };
  };
}
