import React, { useState } from 'react';
import {
  GitCompare,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign,
  FileCheck2,
  Columns,
  ExternalLink,
  CheckCircle2,
  PlusCircle,
  MinusCircle
} from 'lucide-react';
import { ComparisonDiff, LegalDocument } from '../types/legal';
import { DEMO_DOCUMENT_V1, DEMO_DOCUMENT_V2, DEMO_COMPARISONS } from '../data/demoDocuments';

interface DeepCompareProps {
  documentA: LegalDocument;
  documentB: LegalDocument;
  diffs?: ComparisonDiff[];
  onJumpToDocument: (docId: string, page: number) => void;
}

export const DeepCompare: React.FC<DeepCompareProps> = ({
  documentA,
  documentB,
  diffs = DEMO_COMPARISONS,
  onJumpToDocument,
}) => {
  const [selectedDiffId, setSelectedDiffId] = useState<string>(diffs[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'cards' | 'split'>('cards');

  const selectedDiff = diffs.find(d => d.id === selectedDiffId) || diffs[0];

  const getStatusBadge = (status: ComparisonDiff['status']) => {
    switch (status) {
      case 'modified':
        return { label: 'MODIFIED', text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
      case 'added':
        return { label: 'ADDED', text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
      case 'removed':
        return { label: 'REMOVED', text: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
    }
  };

  return (
    <div className="w-full space-y-6 text-left pb-16">
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <GitCompare className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Deep Contract Compare</h1>
              <p className="text-xs text-slate-400">
                Comparing {documentA.title} (v1) against {documentB.title} (v2).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'cards' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Visual Cards
            </button>
            <button
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Side-by-Side Split View
            </button>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic">
          *LegalLens highlights objective changes between drafts. It does not declare one contract “better” or advise on business acceptance.
        </p>
      </div>

      {activeTab === 'cards' ? (
        /* Visual Cards Comparison Mode */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {diffs.map((diff) => {
              const badge = getStatusBadge(diff.status);
              const isSelected = selectedDiffId === diff.id;
              return (
                <div
                  key={diff.id}
                  onClick={() => setSelectedDiffId(diff.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500/80 shadow-lg ring-1 ring-indigo-500/50'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {diff.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{diff.title}</h3>

                  {diff.financialImpact && (
                    <div className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                      Delta: {diff.financialImpact}
                    </div>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {diff.deltaExplanation}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Selected Delta Detail Spotlight */}
          {selectedDiff && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Detailed Provision Diff: {selectedDiff.title}
                </span>
                <span className="text-xs text-slate-400">Category: {selectedDiff.category}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Version A */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-300">Version 1 (Original)</span>
                    <span className="text-cyan-400 font-semibold">{selectedDiff.versionA.section} · Pg {selectedDiff.versionA.page}</span>
                  </div>
                  <p className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30 text-slate-200 italic font-mono leading-relaxed">
                    "{selectedDiff.versionA.text}"
                  </p>
                </div>

                {/* Version B */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-300">Version 2 (Revised)</span>
                    <span className="text-cyan-400 font-semibold">{selectedDiff.versionB.section} · Pg {selectedDiff.versionB.page}</span>
                  </div>
                  <p className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-slate-200 italic font-mono leading-relaxed">
                    "{selectedDiff.versionB.text}"
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/20 text-xs text-slate-300">
                <strong className="text-indigo-300">Analysis Summary: </strong>
                {selectedDiff.deltaExplanation}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Side-by-Side Split View Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left: Original Version A */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Document A (Original)</h3>
                <p className="text-[11px] text-slate-400">Oct 1, 2026 Baseline Execution</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">v1</span>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300 max-h-[460px] overflow-y-auto pr-2">
              {documentA.rawPages.map((p) => (
                <div key={p.pageNumber} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 block uppercase">Page {p.pageNumber}</span>
                  <p className="whitespace-pre-wrap leading-relaxed text-[11px] text-slate-300">
                    {p.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Revised Version B */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Document B (Revised)</h3>
                <p className="text-[11px] text-slate-400">Counter-Proposal with Amendments</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">v2 (Updated)</span>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300 max-h-[460px] overflow-y-auto pr-2">
              {documentB.rawPages.map((p) => (
                <div key={p.pageNumber} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 block uppercase">Page {p.pageNumber}</span>
                  <p className="whitespace-pre-wrap leading-relaxed text-[11px] text-slate-300">
                    {p.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
