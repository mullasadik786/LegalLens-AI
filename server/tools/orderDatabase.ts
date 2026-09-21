import { Order } from '../../src/types/ecommerce';

// In-memory persistent database of e-commerce orders
export const ORDERS_DATABASE: Record<string, Order> = {
  'ORD-8821': {
    id: 'ORD-8821',
    customerEmail: 'sarah.j@example.com',
    customerName: 'Sarah Jenkins',
    orderDate: '2026-09-12',
    totalAmount: 149.99,
    currency: 'USD',
    items: [
      { id: 'itm-101', name: 'UltraComfort Wireless ANC Headphones', quantity: 1, price: 149.99 }
    ],
    shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
    trackingNumber: 'FDX-992014-DELIV',
    carrier: 'FedEx'
  },
  'ORD-4490': {
    id: 'ORD-4490',
    customerEmail: 'm.chen@example.com',
    customerName: 'Michael Chen',
    orderDate: '2026-09-18',
    totalAmount: 89.50,
    currency: 'USD',
    items: [
      { id: 'itm-204', name: 'Ergonomic Mechanical Keyboard (Brown Switches)', quantity: 1, price: 89.50 }
    ],
    shippingAddress: '1204 Pine Street, Apt 4B, Seattle, WA 98101',
    trackingNumber: 'UPS-339102-TRANS',
    carrier: 'UPS'
  },
  'ORD-1042': {
    id: 'ORD-1042',
    customerEmail: 'alex.rivera@example.com',
    customerName: 'Alex Rivera',
    orderDate: '2026-09-05',
    totalAmount: 279.00,
    currency: 'USD',
    items: [
      { id: 'itm-309', name: 'Pro-Level 4K Dual Monitor Arm & Docking Hub', quantity: 1, price: 279.00 }
    ],
    shippingAddress: '450 Mission Bay Blvd, San Francisco, CA 94158',
    trackingNumber: 'USPS-884019-LOST',
    carrier: 'USPS'
  },
  'ORD-9931': {
    id: 'ORD-9931',
    customerEmail: 'emily.w@example.com',
    customerName: 'Emily Watson',
    orderDate: '2026-09-02',
    totalAmount: 420.50,
    currency: 'USD',
    items: [
      { id: 'itm-410', name: 'Smart Fitness Treadmill Desk Base', quantity: 1, price: 420.50 }
    ],
    shippingAddress: '88 Commonwealth Ave, Boston, MA 02215',
    trackingNumber: 'DHL-552091-EXCP',
    carrier: 'DHL'
  }
};

/**
 * TOOL 1: query_database
 * Verifies the order exists, checks the total amount paid, and confirms it belongs to the active customer.
 */
export async function queryDatabaseTool(params: {
  order_id: string;
  customer_email?: string;
}): Promise<{
  success: boolean;
  orderExists: boolean;
  isOwnerVerified: boolean;
  order?: Order;
  error?: string;
}> {
  const normalizedId = (params.order_id || '').trim().toUpperCase();
  const normalizedEmail = (params.customer_email || '').trim().toLowerCase();

  const order = ORDERS_DATABASE[normalizedId];

  if (!order) {
    return {
      success: false,
      orderExists: false,
      isOwnerVerified: false,
      error: `Order with ID "${normalizedId}" was not found in the database.`
    };
  }

  // If email was provided, verify ownership
  const isOwnerVerified = normalizedEmail ? order.customerEmail.toLowerCase() === normalizedEmail : true;

  return {
    success: true,
    orderExists: true,
    isOwnerVerified,
    order: {
      id: order.id,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      orderDate: order.orderDate,
      totalAmount: order.totalAmount,
      currency: order.currency,
      items: order.items,
      shippingAddress: order.shippingAddress,
      trackingNumber: order.trackingNumber,
      carrier: order.carrier
    }
  };
}
