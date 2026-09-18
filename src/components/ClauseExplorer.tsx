import React, { useState } from 'react';
import {
  FileText,
  Search,
  Globe,
  ExternalLink,
  HelpCircle,
  AlertCircle,
  Tag,
  BookOpen,
  Filter,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { LegalClause, ClauseCategory, SupportedLanguage } from '../types/legal';

interface ClauseExplorerProps {
  clauses: LegalClause[];
  currentLanguage: SupportedLanguage;
  onJumpToEvidence: (page: number, section: string, text?: string) => void;
  onAskAboutClause: (clauseTitle: string) => void;
}

export const ClauseExplorer: React.FC<ClauseExplorerProps> = ({
  clauses,
  currentLanguage,
  onJumpToEvidence,
  onAskAboutClause,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cardLang, setCardLang] = useState<Record<string, SupportedLanguage>>({});

  const categories: string[] = [
    'All',
    'Payment',
    'Obligations',
    'Termination',
    'Intellectual Property',
    'Confidentiality',
    'Restrictions',
    'Dispute Resolution',
    'Governing Law'
  ];

  const filteredClauses = clauses.filter((clause) => {
    const matchesCat = selectedCategory === 'All' || clause.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      clause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.whyItMatters.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.sourceSection.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryColor = (cat: ClauseCategory) => {
    switch (cat) {
      case 'Payment': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Obligations': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Termination': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Intellectual Property': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'Confidentiality': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'Restrictions': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Dispute Resolution': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      default: return 'text-slate-300 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="w-full space-y-6 text-left pb-16">
      {/* Header & Search */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>Clause Explorer</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Interactive legal clause library with plain-language explanations, contextual importance, and source mapping.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20 self-start sm:self-auto">
            {filteredClauses.length} Clauses Found
          </span>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clauses by keyword, section, title, or legal term..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clauses Grid */}
      <div className="grid grid-cols-1 gap-5">
        {filteredClauses.map((clause) => {
          const lang = cardLang[clause.id] || currentLanguage;
          const explanation = clause.plainLanguage[lang] || clause.plainLanguage.en;

          return (
            <div
              key={clause.id}
              className="bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-6 space-y-4 transition-all shadow-md"
            >
              {/* Card Top bar: Category, Title, and Source Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${getCategoryColor(clause.category)}`}>
                    {clause.category}
                  </span>
                  <h3 className="text-base font-bold text-white tracking-tight">{clause.title}</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Evidence verified</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Language switch for this card */}
                  <div className="flex items-center gap-1 text-[11px] bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                    <Globe className="w-3 h-3 text-cyan-400" />
                    <select
                      value={lang}
                      aria-label={`Language for ${clause.title}`}
                      onChange={(e) => setCardLang({ ...cardLang, [clause.id]: e.target.value as SupportedLanguage })}
                      className="bg-transparent text-slate-300 outline-none cursor-pointer"
                    >
                      <option value="en" className="bg-slate-900">EN</option>
                      <option value="te" className="bg-slate-900">తెలుగు</option>
                      <option value="hi" className="bg-slate-900">हिन्दी</option>
                    </select>
                  </div>

                  {/* Jump to Source */}
                  <button
                    onClick={() => onJumpToEvidence(clause.sourcePage, clause.sourceSection, clause.originalText)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg transition cursor-pointer"
                    title="Open document viewer at this exact section"
                  >
                    <span>Page {clause.sourcePage} · {clause.sourceSection}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 5-PART STRUCTURE */}
              
              {/* Part 1: What it says (Original text quote) */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>1. What It Says (Original Text)</span>
                </div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed italic bg-slate-900/40 p-3 rounded-lg border-l-2 border-indigo-500">
                  "{clause.originalText}"
                </p>
              </div>

              {/* Part 2: In simple language */}
              <div className="bg-purple-950/20 border border-purple-900/30 rounded-xl p-4 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block">
                  2. In Simple Language ({lang.toUpperCase()})
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {explanation}
                </p>
              </div>

              {/* Part 3: Why it may matter */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  3. Why It May Matter
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{clause.whyItMatters}</p>
              </div>

              {/* Part 4: Evidence */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">4. Evidence Reference:</span>
                  <span className="text-slate-200 font-mono font-semibold">Page {clause.sourcePage}, {clause.sourceSection}</span>
                </div>
                <button
                  onClick={() => onJumpToEvidence(clause.sourcePage, clause.sourceSection, clause.originalText)}
                  className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Highlight in PDF/Document View</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Part 5: Questions to consider */}
              {clause.questionsToConsider && clause.questionsToConsider.length > 0 && (
                <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>5. Questions to Consider:</span>
                  </span>
                  <ul className="space-y-1.5 pl-4 text-xs text-slate-300 list-disc marker:text-indigo-500">
                    {clause.questionsToConsider.map((q, idx) => (
                      <li key={idx} className="leading-relaxed">{q}</li>
                    ))}
                  </ul>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onAskAboutClause(clause.title)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ask AI more about this clause</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
