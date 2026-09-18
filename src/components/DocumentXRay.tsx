import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Calendar,
  DollarSign,
  HelpCircle,
  AlertTriangle,
  Scale,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info,
  Clock,
  Briefcase
} from 'lucide-react';
import { LegalDocument, AttentionLevel } from '../types/legal';

interface DocumentXRayProps {
  document: LegalDocument;
  onJumpToEvidence: (page: number, section: string, text?: string) => void;
  onOpenClauseExplorer: () => void;
  onOpenTimeline: () => void;
  onOpenChat: () => void;
}

export const DocumentXRay: React.FC<DocumentXRayProps> = ({
  document,
  onJumpToEvidence,
  onOpenClauseExplorer,
  onOpenTimeline,
  onOpenChat,
}) => {
  const [selectedAttentionFilter, setSelectedAttentionFilter] = useState<string>('All');
  const [expandedSummarySection, setExpandedSummarySection] = useState<string | null>('whatIsThis');

  // Attention badge styles
  const getAttentionStyle = (level: AttentionLevel) => {
    switch (level) {
      case 'Needs Attention':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          dot: 'bg-amber-400',
          label: '🟡 Needs Attention'
        };
      case 'Important Provision':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          dot: 'bg-blue-400',
          label: '🔵 Important Provision'
        };
      case 'Potential Ambiguity':
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          dot: 'bg-purple-400',
          label: '🟣 Potential Ambiguity'
        };
      case 'Deadline':
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          text: 'text-orange-400',
          dot: 'bg-orange-400',
          label: '🟠 Deadline'
        };
      case 'Missing Information':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          dot: 'bg-emerald-400',
          label: '🟢 Missing Information'
        };
      case 'Professional Review':
        return {
          bg: 'bg-slate-500/10',
          border: 'border-slate-400/30',
          text: 'text-slate-300',
          dot: 'bg-slate-300',
          label: '⚪ Professional Review'
        };
      default:
        return {
          bg: 'bg-slate-800',
          border: 'border-slate-700',
          text: 'text-slate-300',
          dot: 'bg-slate-400',
          label: level
        };
    }
  };

  const filteredAttention = selectedAttentionFilter === 'All'
    ? document.attentionItems
    : document.attentionItems.filter(item => item.level === selectedAttentionFilter);

  const summaryItems = [
    { key: 'whatIsThis', title: 'What is this document?', content: document.executiveSummary.whatIsThis },
    { key: 'parties', title: 'Who are the parties?', content: document.executiveSummary.parties },
    { key: 'purpose', title: 'What is the purpose?', content: document.executiveSummary.purpose },
    { key: 'obligations', title: 'What does each party agree to do?', content: document.executiveSummary.obligations },
    { key: 'financialTerms', title: 'What money is involved?', content: document.executiveSummary.financialTerms },
    { key: 'importantDates', title: 'What are the important dates?', content: document.executiveSummary.importantDates },
    { key: 'termination', title: 'How can the agreement end?', content: document.executiveSummary.termination },
    { key: 'reviewCarefully', title: 'What should I review carefully?', content: document.executiveSummary.reviewCarefully },
  ];

  return (
    <div className="w-full space-y-8 text-left pb-16">
      {/* 1. DOCUMENT X-RAY HEADER & STATS */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Document X-Ray Analytics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {document.title}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              File: {document.filename} ({document.fileSize}) · Analysis Status: Verified
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenClauseExplorer}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition cursor-pointer"
            >
              Clause Explorer →
            </button>
            <button
              onClick={onOpenChat}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition cursor-pointer"
            >
              Ask AI →
            </button>
          </div>
        </div>

        {/* 7 Metric Statistics Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
          <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl text-center">
            <span className="text-2xl font-black text-cyan-400 block">{document.pageCount}</span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pages</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl text-center">
            <span className="text-2xl font-black text-indigo-400 block">{document.sectionsCount}</span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Sections</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl text-center">
            <span className="text-2xl font-black text-purple-400 block">{document.clausesCount}</span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Clauses</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl text-center">
            <span className="text-2xl font-black text-blue-400 block">{document.obligationsCount}</span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Obligations</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl text-center">
            <span className="text-2xl font-black text-orange-400 block">{document.datesCount}</span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Dates</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl text-center">
            <span className="text-2xl font-black text-emerald-400 block">{document.paymentsCount}</span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Payments</span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl text-center">
            <span className="text-2xl font-black text-amber-400 block">{document.questionsCount}</span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Questions</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic text-right">
          *Statistics represent document-structural analysis metrics, not a subjective legal risk score.
        </p>
      </div>

      {/* 2. DOCUMENT OVERVIEW CARD */}
      <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Info className="w-4 h-4 text-indigo-400" />
          <h2 className="text-base font-bold text-white">Document Overview & Explicit Metadata</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block mb-1 font-medium">Document Type:</span>
            <span className="text-white font-semibold text-sm">{document.overview.documentType}</span>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block mb-1 font-medium">Identified Parties:</span>
            <span className="text-white font-semibold">{document.overview.parties.join(' & ')}</span>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block mb-1 font-medium">Effective Date:</span>
            <span className="text-cyan-300 font-semibold">{document.overview.effectiveDate}</span>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block mb-1 font-medium">Expiration / Term:</span>
            <span className="text-slate-200 font-semibold">{document.overview.expirationDate}</span>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block mb-1 font-medium">Governing Law:</span>
            <span className="text-indigo-300 font-semibold">
              {document.overview.governingLaw || 'Not identified in the uploaded document.'}
            </span>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block mb-1 font-medium">Source Language:</span>
            <span className="text-slate-200 font-semibold">{document.overview.documentLanguage}</span>
          </div>
        </div>
      </div>

      {/* 3. EXECUTIVE SUMMARY (PLAIN LANGUAGE) */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <h2 className="text-base font-bold text-white">Executive Plain-Language Summary</h2>
          </div>
          <span className="text-[11px] text-slate-400">Strictly grounded in uploaded text</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {summaryItems.map((item) => {
            const isExpanded = expandedSummarySection === item.key;
            return (
              <div
                key={item.key}
                onClick={() => setExpandedSummarySection(isExpanded ? null : item.key)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isExpanded
                    ? 'bg-slate-900 border-indigo-500/40 shadow-sm'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-200">{item.title}</h3>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-indigo-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
                {isExpanded && (
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                    {item.content}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ATTENTION MAP */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Attention Map</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Specific provisions deserving careful review with supporting questions.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {['All', 'Needs Attention', 'Important Provision', 'Potential Ambiguity', 'Deadline', 'Professional Review'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedAttentionFilter(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                  selectedAttentionFilter === lvl
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Attention Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAttention.map((item) => {
            const style = getAttentionStyle(item.level);
            return (
              <div
                key={item.id}
                className={`p-5 rounded-xl border ${style.border} ${style.bg} space-y-3 relative group transition-all`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${style.text} bg-slate-950/60 border border-slate-800`}>
                    {style.label}
                  </span>
                  <button
                    onClick={() => onJumpToEvidence(item.sourcePage, item.sourceSection)}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Pg {item.sourcePage} · {item.sourceSection}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white">{item.title}</h3>

                <div className="space-y-1.5 text-xs">
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-slate-200">Observation:</strong> {item.observation}
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Context:</strong> {item.reason}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-800/60 bg-slate-950/40 p-3 rounded-lg">
                  <p className="text-[11px] text-indigo-300 font-medium">
                    💡 <strong>Question to Consider:</strong> {item.questionToConsider}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
