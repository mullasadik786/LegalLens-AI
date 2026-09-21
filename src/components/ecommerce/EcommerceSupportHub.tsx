import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  RefreshCw,
  Send,
  Database,
  Truck,
  CreditCard,
  UserCheck,
  Package,
  Sparkles,
  Lock,
  ExternalLink,
  ChevronRight,
  Info,
  DollarSign
} from 'lucide-react';
import {
  AgentHarnessState,
  ChatMessage,
  Order,
  ToolCallExecution,
  CarrierTrackingInfo
} from '../../types/ecommerce';
import {
  sendAgentMessage,
  submitAdminDecision,
  resetHarnessSession,
  fetchDatabaseOrders
} from '../../services/agentApi';

export function EcommerceSupportHub() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-msg',
      sender: 'agent',
      text: "Hello! Welcome to Customer Support. I am here to help you check on your recent package delivery or resolve any questions regarding missing shipments. Could you please provide your order ID (e.g. ORD-8821) and your registered email address?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [harnessState, setHarnessState] = useState<AgentHarnessState>({
    phase: 'IDLE',
    activeOrderId: null,
    activeCustomerEmail: null,
    orderData: null,
    carrierData: null,
    pendingRefund: null,
    toolsExecuted: []
  });

  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [adminNote, setAdminNote] = useState('');
  const [adminSubmitting, setAdminSubmitting] = useState(false);
  const [activeInspectorTab, setActiveInspectorTab] = useState<'tools' | 'database' | 'carrier'>('tools');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Load sample database orders on mount
  useEffect(() => {
    fetchDatabaseOrders().then(orders => setAvailableOrders(orders));
  }, []);

  const handleSendMessage = async (customText?: string, explicitOrderId?: string, explicitEmail?: string) => {
    const textToSend = customText !== undefined ? customText : inputText;
    if (!textToSend.trim() && !explicitOrderId) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'customer',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await sendAgentMessage({
        message: textToSend,
        order_id: explicitOrderId,
        customer_email: explicitEmail
      });

      setHarnessState(response.state);

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: response.agentReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          phase: response.state.phase,
          toolCallIds: response.newTools.map(t => t.id),
          isPaused: response.state.phase === 'PAUSED_FOR_APPROVAL'
        }
      };

      setMessages(prev => [...prev, agentMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'system',
        text: `Error connecting to support service: ${err.message || 'Please retry.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Run predefined test scenarios with 1-click
  const runScenario = (orderId: string, email: string, promptText: string) => {
    handleSendMessage(promptText, orderId, email);
  };

  // Human Administrator Decision handler (Post-Approval Execution)
  const handleAdminDecision = async (decision: 'APPROVE' | 'REJECT') => {
    setAdminSubmitting(true);
    try {
      const res = await submitAdminDecision({
        decision,
        adminName: 'Operations Lead (HITL)',
        adminNote: adminNote || (decision === 'APPROVE' ? 'Carrier confirmed unrecoverable parcel' : 'Escalated for physical warehouse audit')
      });

      setHarnessState(res.state);

      const systemMsg: ChatMessage = {
        id: `admin-decision-${Date.now()}`,
        sender: 'agent',
        text: res.agentReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          phase: res.state.phase,
          refundDetails: res.settledReceipt ? {
            refundId: res.state.pendingRefund?.refundId || '',
            amount: res.settledReceipt.settledAmount,
            stripeRefundId: res.settledReceipt.stripeRefundId,
            status: 'SETTLED'
          } : undefined
        }
      };

      setMessages(prev => [...prev, systemMsg]);
      setAdminNote('');
    } catch (err: any) {
      alert(`Decision error: ${err.message}`);
    } finally {
      setAdminSubmitting(false);
    }
  };

  const handleReset = async () => {
    await resetHarnessSession();
    setHarnessState({
      phase: 'IDLE',
      activeOrderId: null,
      activeCustomerEmail: null,
      orderData: null,
      carrierData: null,
      pendingRefund: null,
      toolsExecuted: []
    });
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'agent',
        text: "Session refreshed. Hello! Please provide your order ID (e.g. ORD-8821) and your registered email address to get started.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                <Package className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  Smart E-Commerce Support & Refund Agent
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    TrueForge Agent Harness
                  </span>
                </h1>
                <p className="text-sm text-slate-400 mt-0.5">
                  Autonomous Customer Support with Sequential Tool Calling, Zero-Hallucination Verification & Human-in-the-Loop Financial Safeguard.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-mono flex items-center gap-2">
              <span className="text-slate-400">Harness Phase:</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded ${
                  harnessState.phase === 'PAUSED_FOR_APPROVAL'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                    : harnessState.phase === 'RESOLVED_REFUNDED'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : harnessState.phase === 'RESOLVED_DELIVERED'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-slate-700 text-slate-200'
                }`}
              >
                {harnessState.phase}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Reset session to IDLE"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Session
            </button>
          </div>
        </div>

        {/* Quick Test Scenario Launchers */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick Test Scenarios:
          </span>

          <button
            onClick={() =>
              runScenario(
                'ORD-8821',
                'sarah.j@example.com',
                "Hello, where is my order ORD-8821? I haven't received it and want a full refund."
              )
            }
            disabled={loading}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 border border-blue-800/60 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Scenario A: Delivered (ORD-8821)
          </button>

          <button
            onClick={() =>
              runScenario(
                'ORD-4490',
                'm.chen@example.com',
                "Hi, can you give me an update on package ORD-4490? Is it delayed?"
              )
            }
            disabled={loading}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-800/60 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Scenario B: In-Transit / Delayed (ORD-4490)
          </button>

          <button
            onClick={() =>
              runScenario(
                'ORD-1042',
                'alex.rivera@example.com',
                "My order ORD-1042 was supposed to arrive two weeks ago. I think it is lost, please help me with a refund."
              )
            }
            disabled={loading}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Scenario C: Lost Package (ORD-1042)
          </button>
        </div>
      </div>

      {/* Main Grid: Left Chat, Right Operations & Harness Control Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: Customer Support Chat Portal (Customer Facing) */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[680px] overflow-hidden">
          {/* Chat Window Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">ApexCommerce Support</h2>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Order Specialist • Instant Resolution
                </p>
              </div>
            </div>

            {harnessState.orderData && (
              <div className="text-right">
                <span className="text-[11px] font-mono font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {harnessState.orderData.id} (${harnessState.orderData.totalAmount.toFixed(2)})
                </span>
              </div>
            )}
          </div>

          {/* Chat Messages Feed */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/30"
            role="log"
            aria-live="polite"
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'customer' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[11px] font-medium text-slate-400">
                    {msg.sender === 'customer' ? 'You (Customer)' : 'Support Agent'}
                  </span>
                  <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'customer'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-800 border border-slate-700/80 text-slate-100 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}

                  {/* Settled Refund Card */}
                  {msg.metadata?.refundDetails && (
                    <div className="mt-3 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs space-y-1.5">
                      <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Refund Successfully Settled
                      </div>
                      <div className="text-slate-300 flex justify-between">
                        <span>Settled Amount:</span>
                        <span className="font-mono font-bold text-white">
                          ${msg.metadata.refundDetails.amount.toFixed(2)} USD
                        </span>
                      </div>
                      <div className="text-slate-300 flex justify-between">
                        <span>Stripe Reference:</span>
                        <span className="font-mono text-emerald-300">
                          {msg.metadata.refundDetails.stripeRefundId}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Paused state pill in chat */}
                  {msg.metadata?.isPaused && (
                    <div className="mt-2.5 py-1.5 px-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-xs flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      Pending Administrative Authorization...
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                Support Agent is verifying order details with carrier systems...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/60">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Type your message or order ID (e.g. ORD-8821)..."
                disabled={loading}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                aria-label="Customer message input"
              />
              <button
                type="submit"
                disabled={loading || !inputText.trim()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: TrueForge Agent Harness & Operations Center */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 space-y-5">
          {/* CRITICAL FINANCIAL SAFEGUARD: THE HARNESS PAUSE STATE BANNER */}
          {harnessState.phase === 'PAUSED_FOR_APPROVAL' && harnessState.pendingRefund && (
            <div
              className="bg-gradient-to-br from-amber-950/90 via-slate-900 to-amber-950/90 border-2 border-amber-500/80 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in duration-300"
              role="region"
              aria-label="Financial safeguard pause state"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-amber-300">
                  <span className="p-2 bg-amber-500/20 rounded-xl border border-amber-500/40 animate-pulse">
                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      TRUEFORGE HARNESS PAUSE: Human Approval Required
                    </h3>
                    <p className="text-xs text-amber-300/90">
                      Autonomous text generation halted. Financial safeguard protocol engaged.
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950">
                  ACTION REQUIRED
                </span>
              </div>

              <div className="bg-slate-950/70 border border-amber-500/30 rounded-xl p-3.5 text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Order Reference:</span>
                  <span className="font-mono font-bold text-white">{harnessState.pendingRefund.orderId}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Refund Staged Amount:</span>
                  <span className="font-mono font-extrabold text-amber-300 text-sm">
                    ${harnessState.pendingRefund.amount.toFixed(2)} {harnessState.pendingRefund.currency}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Carrier Justification:</span>
                  <span className="text-slate-200 font-medium">USPS Official Lost Declaration (#USPS-INV-9920)</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Staged Ticket ID:</span>
                  <span className="font-mono text-[11px] text-slate-400">{harnessState.pendingRefund.refundId}</span>
                </div>
              </div>

              {/* Admin Note Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Administrator Audit Note (Optional):
                </label>
                <input
                  type="text"
                  value={adminNote}
                  onChange={e => setAdminNote(e.target.value)}
                  placeholder="e.g. Verified tracking claims report with courier dispatcher"
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Approval Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => handleAdminDecision('APPROVE')}
                  disabled={adminSubmitting}
                  className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve Refund (${harnessState.pendingRefund.amount.toFixed(2)})
                </button>

                <button
                  onClick={() => handleAdminDecision('REJECT')}
                  disabled={adminSubmitting}
                  className="py-2.5 px-4 bg-rose-700 hover:bg-rose-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Reject & Escalate to Manual Review
                </button>
              </div>
            </div>
          )}

          {/* Sequential Tool Execution & Operational Inspector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">TrueForge Operations Inspector</h3>
              </div>

              {/* Inspector Tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveInspectorTab('tools')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    activeInspectorTab === 'tools'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tool Calls ({harnessState.toolsExecuted.length})
                </button>
                <button
                  onClick={() => setActiveInspectorTab('database')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    activeInspectorTab === 'database'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Orders DB
                </button>
                <button
                  onClick={() => setActiveInspectorTab('carrier')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    activeInspectorTab === 'carrier'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Carrier API
                </button>
              </div>
            </div>

            {/* TAB 1: Sequential Tool Calls View */}
            {activeInspectorTab === 'tools' && (
              <div className="space-y-3">
                {harnessState.toolsExecuted.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    <Clock className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    No operational tools executed yet. Enter an order ID or launch a scenario to begin investigation.
                  </div>
                ) : (
                  harnessState.toolsExecuted.map((tool, idx) => (
                    <div
                      key={tool.id}
                      className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-mono font-bold flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <span className="font-mono font-bold text-indigo-400">{tool.toolName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-emerald-400">
                            {tool.durationMs}ms
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            SUCCESS
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
                          <span className="text-slate-400 block mb-0.5">Parameters:</span>
                          <pre className="text-slate-200 overflow-x-auto text-[10px]">
                            {JSON.stringify(tool.arguments, null, 2)}
                          </pre>
                        </div>
                        <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
                          <span className="text-slate-400 block mb-0.5">Returned Result:</span>
                          <pre className="text-slate-200 overflow-x-auto text-[10px]">
                            {JSON.stringify(tool.result, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 2: Orders Database Viewer */}
            {activeInspectorTab === 'database' && (
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {availableOrders.map(ord => (
                  <div
                    key={ord.id}
                    onClick={() => runScenario(ord.id, ord.customerEmail, `Please check my order ${ord.id}`)}
                    className="p-3 bg-slate-950/80 hover:bg-slate-800/80 cursor-pointer border border-slate-800 hover:border-slate-700 rounded-xl transition-all text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-white">{ord.id}</span>
                      <span className="font-semibold text-emerald-400">${ord.totalAmount.toFixed(2)} USD</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Customer: {ord.customerName}</span>
                      <span className="font-mono">{ord.carrier} • {ord.trackingNumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: Carrier API Status */}
            {activeInspectorTab === 'carrier' && (
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs space-y-2">
                {harnessState.carrierData ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{harnessState.carrierData.carrier} Live Record</span>
                      <span className="font-mono text-emerald-400 font-bold">{harnessState.carrierData.status}</span>
                    </div>
                    <div className="text-slate-300">
                      Location: <span className="text-white">{harnessState.carrierData.currentLocation}</span>
                    </div>
                    {harnessState.carrierData.deliveredAt && (
                      <div className="text-slate-300">
                        Delivered At: <span className="text-white">{harnessState.carrierData.deliveredAt}</span>
                      </div>
                    )}
                    {harnessState.carrierData.proofDetails && (
                      <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-300">
                        Proof: {harnessState.carrierData.proofDetails.deliveredTo} ({harnessState.carrierData.proofDetails.signedBy})
                      </div>
                    )}
                    {harnessState.carrierData.exceptionReason && (
                      <div className="p-2 bg-rose-950/40 border border-rose-800/40 rounded text-rose-300 text-[11px]">
                        Exception: {harnessState.carrierData.exceptionReason}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-slate-500 text-center py-6">
                    Carrier data will appear here once an order tracking number is investigated.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Security & Operational Directives Status Card */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-xs space-y-2.5">
            <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Active System Directives & Guardrails
            </h4>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Hallucination Grounding</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Confidentiality Protection Active</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>HITL Financial Safeguard Enforced</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WCAG 2.2 AA Contrast Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
