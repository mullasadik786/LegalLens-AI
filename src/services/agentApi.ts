import {
  AgentHarnessState,
  ChatMessage,
  Order,
  ToolCallExecution
} from '../types/ecommerce';

export async function sendAgentMessage(params: {
  message: string;
  order_id?: string;
  customer_email?: string;
}): Promise<{
  agentReply: string;
  state: AgentHarnessState;
  newTools: ToolCallExecution[];
}> {
  const res = await fetch('/api/agent/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Network request failed' }));
    throw new Error(errorData.error || 'Failed to communicate with agent');
  }

  const data = await res.json();
  return data;
}

export async function submitAdminDecision(params: {
  decision: 'APPROVE' | 'REJECT';
  adminName?: string;
  adminNote?: string;
}): Promise<{
  agentReply: string;
  state: AgentHarnessState;
  settledReceipt?: any;
}> {
  const res = await fetch('/api/harness/approve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Failed to process decision' }));
    throw new Error(errorData.error || 'Failed to submit administrative decision');
  }

  return await res.json();
}

export async function resetHarnessSession(): Promise<void> {
  await fetch('/api/agent/reset', { method: 'POST' });
}

export async function fetchDatabaseOrders(): Promise<Order[]> {
  const res = await fetch('/api/database/orders');
  if (!res.ok) return [];
  const data = await res.json();
  return data.orders || [];
}
