import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Lock, CheckCircle } from 'lucide-react';

export const LegalDisclaimerBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id="legal-disclaimer-banner" className="bg-slate-900/90 border-b border-indigo-950/80 px-4 py-2 text-xs text-slate-400 backdrop-blur transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-300">Legal Information, Not Legal Advice:</span>
          <span>
            LegalLens AI helps you understand documents and prepare questions. For advice regarding your specific situation, consult a qualified attorney.
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors whitespace-nowrap cursor-pointer"
        >
          <span>Trust & Privacy Guarantee</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-300 animate-in fade-in duration-200">
          <div className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-200">1. Evidence First</p>
              <p className="text-[11px] text-slate-400">All AI observations trace back to verifiable pages and sections in your document.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-200">2. User in Control</p>
              <p className="text-[11px] text-slate-400">We never make legal decisions for you. We provide clarity so you can act with confidence.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
            <Lock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-200">3. Privacy by Design</p>
              <p className="text-[11px] text-slate-400">Isolated document storage, untrusted input safeguards, and instant client deletion controls.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
