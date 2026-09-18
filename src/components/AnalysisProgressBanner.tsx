import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface AnalysisProgressBannerProps {
  onComplete?: () => void;
}

const STAGES = [
  'Document loaded',
  'Text extracted',
  'Clauses identified',
  'Dates identified',
  'Evidence mapped',
  'Analysis ready'
];

export const AnalysisProgressBanner: React.FC<AnalysisProgressBannerProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (currentStep < STAGES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [currentStep, onComplete]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-2xl mb-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Loader2 className={`w-4 h-4 text-indigo-400 ${currentStep < STAGES.length - 1 ? 'animate-spin' : ''}`} />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            {currentStep < STAGES.length - 1 ? 'AI Analysis Pipeline in Progress...' : 'Analysis Complete'}
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Stage {currentStep + 1} of {STAGES.length}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
        {STAGES.map((stage, idx) => {
          const isDone = idx <= currentStep;
          const isCurrent = idx === currentStep && currentStep < STAGES.length - 1;

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                isDone
                  ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-200'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400'
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 shrink-0 ${
                  isDone ? 'text-emerald-400' : 'text-slate-500'
                }`}
              />
              <span className="truncate font-medium text-[11px]">
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
