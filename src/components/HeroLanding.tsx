import React from 'react';
import {
  Sparkles,
  Zap,
  ArrowRight,
  Shield,
  FileCheck2,
  FileSearch,
  Scale,
  GitCompare,
  Network,
  Clock,
  MessageSquare,
  Globe,
  Briefcase,
  Lock,
  ChevronRight,
  CheckCircle2,
  Search,
  Layers
} from 'lucide-react';
import { LegalImages } from '../assets/images';

interface HeroLandingProps {
  onStartAnalyze: () => void;
  onStartDemo: () => void;
  onExploreFeatures: (feature: string) => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onStartAnalyze,
  onStartDemo,
  onExploreFeatures,
}) => {
  return (
    <div className="w-full space-y-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-slate-800/80">
        {/* Glow ambient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-cyan-500/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>World-Class GenAI Legal Document Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Turn Legal Complexity <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
                into Clarity.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Understand documents, discover important provisions, compare changes, ask evidence-backed questions, and prepare for professional legal review — all in one intelligent workspace.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-analyze-doc-btn"
                onClick={onStartAnalyze}
                className="px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all flex items-center gap-2.5 cursor-pointer text-sm sm:text-base group"
              >
                <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
                <span>✨ Analyze a Document</span>
                <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-interactive-demo-btn"
                onClick={onStartDemo}
                className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-indigo-500/50 hover:border-indigo-400 transition-all flex items-center gap-2.5 cursor-pointer text-sm sm:text-base shadow-lg shadow-indigo-950/50"
              >
                <Scale className="w-4 h-4 text-indigo-400" />
                <span>⚖️ Try LegalLens Demo</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">Fictional Demo</span>
              </button>
            </div>

            {/* Supported Audience pills */}
            <div className="pt-4 border-t border-slate-800/60">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Designed for everyday clarity & enterprise readiness:
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                {['Employees', 'Freelancers', 'Tenants', 'Contract Managers', 'Startup Founders', 'HR Teams', 'Students', 'Small Business'].map((audience) => (
                  <span key={audience} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 font-medium">
                    {audience}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right 3D Visual Asset */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-500/30 shadow-2xl shadow-indigo-950/80 border border-indigo-500/30">
              <img
                src={LegalImages.hero}
                alt="LegalLens 3D AI Legal Document Intelligence"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-xl object-cover"
              />
              {/* Floating Verified Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md border border-indigo-500/30 p-3 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Source-Grounded Precision</p>
                  <p className="text-[11px] text-slate-400">Every insight is directly cited to page and section evidence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM → THE SOLUTION (PROBLEM STATEMENT ALIGNMENT) */}
      <section className="max-w-7xl mx-auto px-4 text-left">
        <div className="bg-slate-950 border border-indigo-500/30 rounded-3xl p-8 lg:p-10 relative overflow-hidden shadow-2xl">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              The Legal Document Challenge
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why LegalLens AI?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Empowering citizens, workers, and businesses to understand, compare, and navigate complex legal information with uncompromised source evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Problem Column */}
            <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4 text-rose-400">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/15 flex items-center justify-center font-bold text-base">⚠️</div>
                  <h3 className="text-xl font-bold text-rose-300">The Problem</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  Everyday legal documents are systematically inaccessible to regular people:
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong className="text-rose-200">Complex:</strong> Wrapped in dense legal jargon, archaic phrasing, and convoluted clauses.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong className="text-rose-200">Long:</strong> Spanning dozens of dense pages that overwhelm readers and obscure critical details.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong className="text-rose-200">Difficult to Navigate:</strong> Fragmented schedules, hidden cross-references, and buried exceptions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong className="text-rose-200">Unfamiliar Terminology:</strong> Unclear phrases like indemnification, severability, and clawbacks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong className="text-rose-200">Difficult to Compare:</strong> Subtle wording differences between revisions can alter financial liability without notice.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-900/30 text-xs text-rose-300/80">
                Result: Unequal bargaining power and unintended legal exposure.
              </div>
            </div>

            {/* The Solution Column */}
            <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4 text-emerald-400">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center font-bold text-base">✨</div>
                  <h3 className="text-xl font-bold text-emerald-300">The LegalLens Solution</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  LegalLens AI converts intimidating legal documents into actionable clarity:
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="font-bold text-cyan-400 block mb-1">📖 Understand</span>
                    <span className="text-slate-300 text-xs">Plain-language summaries, key terms, and clause breakdowns.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="font-bold text-purple-400 block mb-1">⚖️ Compare</span>
                    <span className="text-slate-300 text-xs">Side-by-side diff tracking added, removed, and modified clauses.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="font-bold text-blue-400 block mb-1">🗺️ Explore</span>
                    <span className="text-slate-300 text-xs">Interactive Decision Map linking parties, duties, and provisions.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="font-bold text-emerald-400 block mb-1">💬 Ask</span>
                    <span className="text-slate-300 text-xs">Grounded Q&A engine with verifiable page/section evidence citations.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="font-bold text-amber-400 block mb-1">⏰ Track</span>
                    <span className="text-slate-300 text-xs">Timeline of deadlines, notice windows, and responsible parties.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="font-bold text-indigo-400 block mb-1">👨‍⚖️ Prepare</span>
                    <span className="text-slate-300 text-xs">Lawyer Brief and Next-Step Action Plan for professional consultation.</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-900/30 text-xs text-emerald-300/80">
                Outcome: Clear legal comprehension with zero hallucination.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL PIPELINE: FROM LEGAL DOCUMENT → LEGAL UNDERSTANDING */}
      <section className="max-w-7xl mx-auto px-4 text-left">
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Verifiable Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">From Legal Document → Legal Understanding</h2>
            <p className="text-xs sm:text-sm text-slate-400">Every step transforms dense contracts into structured comprehension.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 text-center text-xs">
            {[
              { label: 'Complex Contract', sub: 'Raw Input', color: 'from-slate-800 to-slate-900', border: 'border-slate-700' },
              { label: 'AI Document X-Ray', sub: 'Structural Scan', color: 'from-indigo-950 to-slate-900', border: 'border-indigo-800/60' },
              { label: 'Important Clauses', sub: 'Categorized', color: 'from-purple-950 to-slate-900', border: 'border-purple-800/60' },
              { label: 'Evidence', sub: 'Page & Section', color: 'from-cyan-950 to-slate-900', border: 'border-cyan-800/60' },
              { label: 'Plain Explanation', sub: 'Simple Terms', color: 'from-emerald-950 to-slate-900', border: 'border-emerald-800/60' },
              { label: 'Questions', sub: 'Neutral Inquiries', color: 'from-amber-950 to-slate-900', border: 'border-amber-800/60' },
              { label: 'Action Checklist', sub: 'Next Steps', color: 'from-blue-950 to-slate-900', border: 'border-blue-800/60' },
              { label: 'Professional Consult', sub: 'Lawyer Ready', color: 'from-teal-950 to-slate-900', border: 'border-teal-800/60' }
            ].map((node, i) => (
              <div key={i} className={`p-3 rounded-xl bg-gradient-to-b ${node.color} border ${node.border} flex flex-col justify-center items-center`}>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">0{i + 1}</span>
                <span className="font-bold text-slate-100 block text-xs leading-tight mb-0.5">{node.label}</span>
                <span className="text-[10px] text-slate-400">{node.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REAL EDUCATIONAL USE-CASE CARDS */}
      <section className="max-w-7xl mx-auto px-4 text-left">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Practical Applications</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Everyday Contract Scenarios</h2>
          <p className="text-xs sm:text-sm text-slate-400">Discover how LegalLens AI unpacks key obligations across common agreement types.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-2xl block mb-1">🏠</span>
            <h3 className="font-bold text-white text-sm">Rental Agreement</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Understand monthly rent, renewal grace periods, security deposit refund terms, and landlord entry notices.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-2xl block mb-1">💼</span>
            <h3 className="font-bold text-white text-sm">Employment Contract</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore base salary, bonus criteria, non-solicitation periods, early-termination clauses, and IP ownership.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-2xl block mb-1">🤝</span>
            <h3 className="font-bold text-white text-sm">Business Agreement</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Compare mutual deliverables, payment milestones, liability limits, and dispute arbitration rules.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-2xl block mb-1">🔐</span>
            <h3 className="font-bold text-white text-sm">Non-Disclosure (NDA)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Analyze definitions of confidential information, carve-outs, non-disclosure duration, and return protocol.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-2xl block mb-1">📑</span>
            <h3 className="font-bold text-white text-sm">Insurance Policy</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Navigate coverage limits, explicit exclusions, claim filing deadlines, and deductible obligations.
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-[11px] text-slate-400 italic">
            * These are educational examples for contract comprehension and navigation, not formal legal advice.
          </span>
        </div>
      </section>

      {/* 2. SIGNATURE PRODUCT DIFFERENTIATOR */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl text-left space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              The LegalLens Differentiator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              “Every important AI insight has a path back to the document.”
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              No black-box guesses. When LegalLens AI explains a clause, detects a deadline, or highlights an ambiguity, you can immediately trace the rationale to the exact page, section, and original text quote.
            </p>
          </div>

          {/* Step chain visualization */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2 pt-4 border-t border-slate-800 text-center text-xs">
            <div className="bg-purple-950/40 border border-purple-800/40 p-3 rounded-xl">
              <span className="text-purple-400 font-bold block mb-1">1. AI Insight</span>
              <span className="text-[11px] text-slate-300">Plain explanation</span>
            </div>
            <div className="bg-cyan-950/40 border border-cyan-800/40 p-3 rounded-xl">
              <span className="text-cyan-400 font-bold block mb-1">2. Evidence</span>
              <span className="text-[11px] text-slate-300">Supporting quote</span>
            </div>
            <div className="bg-indigo-950/40 border border-indigo-800/40 p-3 rounded-xl">
              <span className="text-indigo-400 font-bold block mb-1">3. Page</span>
              <span className="text-[11px] text-slate-300">Verified index</span>
            </div>
            <div className="bg-blue-950/40 border border-blue-800/40 p-3 rounded-xl">
              <span className="text-blue-400 font-bold block mb-1">4. Clause</span>
              <span className="text-[11px] text-slate-300">Section heading</span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-emerald-950/40 border border-emerald-800/40 p-3 rounded-xl">
              <span className="text-emerald-400 font-bold block mb-1">5. Original Text</span>
              <span className="text-[11px] text-slate-300">Full source text</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (5 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 text-left">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Streamlined Intelligence Flow</span>
          <h2 className="text-3xl font-bold text-white">How LegalLens AI Works</h2>
          <p className="text-sm text-slate-400">From raw document to actionable clarity in five intuitive stages.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              step: '1. Upload',
              title: 'Add Document',
              desc: 'Drag and drop PDF, DOCX, scanned images, or select fictional demo contracts.',
              icon: Layers
            },
            {
              step: '2. Understand',
              title: 'Document X-Ray',
              desc: 'Instant structural breakdown of pages, clauses, obligations, and payments.',
              icon: FileSearch
            },
            {
              step: '3. Explore',
              title: 'Clauses & Radar',
              desc: 'Navigate plain-language explanations with full context and source links.',
              icon: Network
            },
            {
              step: '4. Compare',
              title: 'Deep Compare',
              desc: 'Highlight delta changes between Version 1 and Version 2 side by side.',
              icon: GitCompare
            },
            {
              step: '5. Prepare',
              title: 'Lawyer Brief',
              desc: 'Generate executive consultation dossiers and targeted legal questions.',
              icon: Briefcase
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 p-5 rounded-2xl relative transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">{item.step}</span>
                <h3 className="text-base font-bold text-white mt-1 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WORLD-CLASS FEATURE MATRIX */}
      <section className="max-w-7xl mx-auto px-4 text-left">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Enterprise AI Capabilities</span>
          <h2 className="text-3xl font-bold text-white">Nine Core Document Intelligence Engines</h2>
          <p className="text-sm text-slate-400">Explore each specialized module crafted for precision, speed, and safety.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: X-Ray */}
          <div
            onClick={() => onExploreFeatures('xray')}
            className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:bg-slate-900 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FileSearch className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open X-Ray <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">🧠 AI Document Intelligence & X-Ray</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Synthesizes parties, effective dates, obligations, payments, and statutory governance without hallucination.
            </p>
          </div>

          {/* Card 2: Clause Explorer */}
          <div
            onClick={() => onExploreFeatures('clauses')}
            className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:bg-slate-900 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">🔍 Clause Explorer</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Categorized clause library breaking complex legalese into plain language, why it matters, and neutral questions to consider.
            </p>
          </div>

          {/* Card 3: Deep Compare */}
          <div
            onClick={() => onExploreFeatures('compare')}
            className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:bg-slate-900 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <GitCompare className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Compare <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">⚖️ Contract Compare (v1 vs v2)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Side-by-side diff highlighting added, modified, and removed clauses with dollar delta, notice extensions, and clawback tracking.
            </p>
          </div>

          {/* Card 4: Decision Map */}
          <div
            onClick={() => onExploreFeatures('decision_map')}
            className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:bg-slate-900 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Network className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Map <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">🗺️ Legal Decision Map</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Interactive node graph connecting Document → Parties → Obligations → Payments → Deadlines → Termination and cross-clause links.
            </p>
          </div>

          {/* Card 5: Obligation Timeline */}
          <div
            onClick={() => onExploreFeatures('timeline')}
            className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:bg-slate-900 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Dates <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">⏰ Obligation Timeline</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automatic extraction of critical dates, reviews, IP filing cutoffs, and notice windows mapped to responsible parties.
            </p>
          </div>

          {/* Card 6: Evidence Chat */}
          <div
            onClick={() => onExploreFeatures('chat')}
            className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:bg-slate-900 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ask Questions <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">💬 Evidence-Grounded Chat</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ask anything about your agreement. Every response cites exact page and section numbers with clickable source jumps.
            </p>
          </div>

          {/* Card 7: Multilingual Explanation */}
          <div
            onClick={() => onExploreFeatures('clauses')}
            className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:bg-slate-900 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Languages <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">🌐 Multilingual AI (EN, Telugu, Hindi)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Original legal text stays intact while plain-language explanations are translated accurately into Telugu (తెలుగు) and Hindi (हिन्दी).
            </p>
          </div>

          {/* Card 8: Lawyer Brief */}
          <div
            onClick={() => onExploreFeatures('lawyer_brief')}
            className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:bg-slate-900 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Generate Brief <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">👨‍⚖️ Lawyer Consultation Brief</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instantly create a professional 1-page briefing dossier formatted with key terms, potential ambiguities, and targeted questions for your attorney.
            </p>
          </div>

          {/* Card 9: Private Legal Vault */}
          <div
            onClick={() => onExploreFeatures('vault')}
            className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:bg-slate-900 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Vault <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">🔐 Private Legal Vault</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Isolated user document storage with strict mime validation, prompt injection shields, and instant deletion controls.
            </p>
          </div>
        </div>
      </section>

      {/* 5. TRUST CENTER (3 PRINCIPLES) */}
      <section className="max-w-7xl mx-auto px-4 text-left">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-10 relative overflow-hidden">
          <div className="max-w-2xl space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Built for Uncompromising Trust</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why Choose LegalLens AI?</h2>
            <p className="text-sm text-slate-300">
              Unlike generic chatbots that summarize without accountability, LegalLens is built strictly around three core principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">1. Evidence First</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every AI insight is anchored to genuine source pages and clause provisions. If the uploaded text lacks evidence, the system explicitly informs you.
              </p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-3">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">2. User in Control</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                LegalLens assists with comprehension, organization, and preparation. It never claims to replace a qualified lawyer or make decisions on your behalf.
              </p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">3. Privacy by Design</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Untrusted document content is isolated to protect against prompt injection. Server-side key management prevents leakages, and one-click data deletion is guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
