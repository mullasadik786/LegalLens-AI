import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  RefreshCw,
  Globe,
  Bot,
  User,
  AlertCircle
} from 'lucide-react';
import { LegalDocument, ChatMessage, SupportedLanguage } from '../types/legal';
import { LegalLensAIProvider } from '../services/aiProvider';

interface EvidenceChatProps {
  document: LegalDocument;
  language: SupportedLanguage;
  onJumpToEvidence: (page: number, section: string, text?: string) => void;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

export const EvidenceChat: React.FC<EvidenceChatProps> = ({
  document,
  language,
  onJumpToEvidence,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      content: `Hello! I am your LegalLens AI intelligence assistant. I analyze ${document.title} strictly using the uploaded text as evidence. What would you like to understand?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What are my main obligations?',
    'Show important dates and deadlines.',
    'Explain the early termination clause in Section 8.2.',
    'What bonus or compensation terms apply?',
    'What should I ask a qualified lawyer?',
    'Who owns the intellectual property and code?'
  ];

  // Handle passed initial prompt
  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await LegalLensAIProvider.answerQuestion(query, document, language);

      const aiMsg: ChatMessage = {
        id: 'msg-ai-' + Date.now(),
        sender: 'assistant',
        content: result.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        evidence: result.evidence,
        uncertaintyNotice: result.uncertainty,
        needsProfessionalReview: result.needsProfessionalReview
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        sender: 'assistant',
        content: 'I could not process this request right now. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        uncertaintyNotice: 'Temporary processing limitation.'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4 text-left max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Ask LegalLens</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                Evidence-Grounded
              </span>
            </h1>
            <p className="text-xs text-slate-400">Ask questions about your uploaded document.</p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Citation Validator Active</span>
          </span>
          <p className="text-[10px] text-slate-500">Untrusted prompt injection protected</p>
        </div>
      </div>

      {/* Suggested Questions Pills */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pl-1">
          Suggested Questions:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Container */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-6 min-h-[420px] max-h-[580px] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-3 ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-white/10">
                  <span className="font-semibold">{isUser ? 'You' : 'LegalLens AI'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>

                {/* Evidence Box */}
                {!isUser && msg.evidence && msg.evidence.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                      <span>📄 Supporting Document Evidence:</span>
                    </div>

                    {msg.evidence.map((ev, i) => (
                      <div
                        key={i}
                        className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 space-y-1.5 text-xs text-slate-300"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-cyan-300">
                            Page {ev.page} · {ev.section}
                          </span>
                          <button
                            onClick={() => onJumpToEvidence(ev.page, ev.section, ev.text)}
                            className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>View Source</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="italic text-slate-400 font-mono text-[11px] border-l-2 border-cyan-500/50 pl-2">
                          "{ev.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Uncertainty or Professional Review Notice */}
                {!isUser && (msg.uncertaintyNotice || msg.needsProfessionalReview) && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-[11px] text-amber-400/90 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      {msg.uncertaintyNotice && <p><strong>Note:</strong> {msg.uncertaintyNotice}</p>}
                      {msg.needsProfessionalReview && (
                        <p className="text-slate-300 mt-0.5">
                          Professional legal review is recommended for definitive application in your jurisdiction.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/30 flex items-center justify-center animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-300 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-purple-400 animate-spin" />
              <span>Analyzing document clauses and validating citations...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="relative flex items-center"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question about this contract (e.g., 'What happens if I terminate early?')..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-4 pr-24 py-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500 shadow-lg transition"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="absolute right-2 px-4 py-2 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed shadow transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>Ask</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
