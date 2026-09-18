import React from 'react';
import { Lock, FileCheck, Brain, Scale } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <div
      role="region"
      aria-label="LegalLens Trust & Safety Guardrails"
      className="w-full bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 text-xs text-slate-300"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-semibold text-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <span>Active Session Guardrails:</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-teal-300">
            <Lock className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
            <span>🔐 Private Workspace</span>
          </div>

          <div className="flex items-center gap-1.5 text-indigo-300">
            <FileCheck className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
            <span>📄 Evidence Grounded</span>
          </div>

          <div className="flex items-center gap-1.5 text-purple-300">
            <Brain className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
            <span>🧠 AI Assisted</span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-300">
            <Scale className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>⚖️ Not Legal Advice</span>
          </div>
        </div>
      </div>
    </div>
  );
};
