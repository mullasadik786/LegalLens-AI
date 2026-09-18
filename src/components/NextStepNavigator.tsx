import React, { useState } from 'react';
import { Calendar, CheckSquare, HelpCircle, Briefcase, AlertCircle, FileText, Download } from 'lucide-react';
import { LegalDocument } from '../types/legal';

interface NextStepNavigatorProps {
  document: LegalDocument;
  onNavigateToTab?: (tab: string) => void;
}

export const NextStepNavigator: React.FC<NextStepNavigatorProps> = ({ document, onNavigateToTab }) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 1. Deadlines & Dates
  const deadlines = [
    { id: 'd1', label: 'Commencement Date', date: 'October 1, 2026', source: 'Section 2.1, Pg 2', note: 'Reporting in-person or remote onboarding setup' },
    { id: 'd2', label: 'Written Termination Notice Window', date: '30 Days Prior', source: 'Section 8.2, Pg 7', note: 'Notice must be delivered via certified mail or tracked electronic receipt' },
    { id: 'd3', label: 'Hardware & Asset Return Window', date: 'Within 48 Hours', source: 'Section 8.4, Pg 7', note: 'Return laptops, keycards, and company materials upon departure' }
  ];

  // 2. My Obligations
  const obligations = [
    { id: 'o1', title: 'Devote Full Business Attention', detail: 'Section 1.2 requires faithful, full-time performance of duties under executive direction.', page: 1 },
    { id: 'o2', title: 'Maintain Proprietary Non-Disclosure', detail: 'Section 5.2 covenants non-disclosure of trade secrets and client lists indefinitely.', page: 3 },
    { id: 'o3', title: 'Assignment of Inventions & IP', detail: 'Section 6.1 assigns all inventions conceived using company time or facilities.', page: 4 },
    { id: 'o4', title: 'Non-Solicitation of Employees & Clients', detail: 'Section 5.3 restricts recruiting company staff for 12 months post-departure.', page: 4 }
  ];

  // 3. Information to Verify
  const verifications = [
    { id: 'v1', item: 'Discretionary Bonus Metrics', detail: 'Section 3.2 mentions annual bonus eligibility but does not specify quantitative KPIs.' },
    { id: 'v2', item: 'Medical & Dental Benefit Coverage Tier', detail: 'Section 4.1 references employer standard plan without itemizing employee cost contributions.' },
    { id: 'v3', item: 'Pre-existing Personal IP Disclosure', detail: 'Exhibit B requires attaching any prior patents/inventions to exclude them from company assignment.' }
  ];

  // 4. Questions to Consider
  const questions = [
    'Are remote work days permitted or required to be approved in writing?',
    'Does the 12-month non-solicitation clause align with your anticipated future career paths?',
    'What specific performance criteria govern the 15% annual target bonus payout?',
    'How is arbitration structured, and who pays for filing and arbitrator fees under California law?'
  ];

  // 5. Professional Review Topics
  const legalReviewTopics = [
    { id: 'r1', topic: 'Binding Arbitration & Class Action Waiver', section: 'Section 9.1, Pg 8', note: 'Consult California employment counsel regarding statutory enforceability.' },
    { id: 'r2', topic: 'Scope of Prior Inventions Carve-out', section: 'Section 6.2, Pg 5', note: 'Ensure personal software side-projects are formally documented before signing.' },
    { id: 'r3', topic: 'Severance & At-Will Protection', section: 'Section 8.1, Pg 6', note: 'Review whether severance pay is provided in the event of termination without cause.' }
  ];

  const handleExportChecklist = () => {
    const text = `LEGALLENS AI — NEXT-STEP NAVIGATOR CHECKLIST
Document: ${document.overview.title}
Date: ${new Date().toLocaleDateString()}
Notice: This document provides neutral informational organization, not legal representation.

1. IMPORTANT DATES & DEADLINES:
${deadlines.map((d) => `• [${d.date}] ${d.label} (${d.source}) - ${d.note}`).join('\n')}

2. MY OBLIGATIONS:
${obligations.map((o) => `• ${o.title} (Page ${o.page}): ${o.detail}`).join('\n')}

3. INFORMATION TO VERIFY:
${verifications.map((v) => `• ${v.item}: ${v.detail}`).join('\n')}

4. QUESTIONS TO CONSIDER:
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

5. TOPICS FOR PROFESSIONAL COUNSEL:
${legalReviewTopics.map((r) => `• ${r.topic} (${r.section}): ${r.note}`).join('\n')}
`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.overview.title.toLowerCase().replace(/\s+/g, '-')}-next-steps.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section aria-labelledby="next-step-heading" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Actionable Clarity</span>
          </div>
          <h2 id="next-step-heading" className="text-2xl font-bold text-white">
            Next-Step Navigator (“What Can I Do?”)
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            A neutral, organized summary of dates, duties, verifications, and questions to guide your personal review or attorney preparation.
          </p>
        </div>

        <button
          onClick={handleExportChecklist}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all text-xs font-semibold flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-indigo-400" />
          <span>Export Action Checklist</span>
        </button>
      </div>

      {/* Grid of 5 Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 1: Deadlines */}
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-400">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">1. Important Dates & Deadlines</h3>
              <p className="text-[11px] text-slate-400">Notice periods, effective milestones, and compliance clocks</p>
            </div>
          </div>

          <div className="space-y-3">
            {deadlines.map((d) => (
              <div key={d.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs text-slate-200">{d.label}</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {d.date}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{d.note}</p>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Source: {d.source}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: My Obligations */}
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-purple-400">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">2. My Key Obligations</h3>
              <p className="text-[11px] text-slate-400">Duties, covenants, and restrictions binding on you</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {obligations.map((o) => (
              <div key={o.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs text-slate-200">{o.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Page {o.page}</span>
                </div>
                <p className="text-xs text-slate-300">{o.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Module 3: Information to Verify */}
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">3. Information to Verify</h3>
              <p className="text-[11px] text-slate-400">Ambiguities, missing schedules, or discretionary terms</p>
            </div>
          </div>

          <div className="space-y-3">
            {verifications.map((v) => (
              <div key={v.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="font-bold text-xs text-cyan-200 block mb-1">{v.item}</span>
                <p className="text-xs text-slate-300">{v.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Module 4: Questions to Consider */}
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-indigo-400">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">4. Questions to Consider</h3>
              <p className="text-[11px] text-slate-400">Neutral self-reflection inquiries before committing</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {questions.map((q, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5">
                <span className="text-xs font-bold text-indigo-400 font-mono mt-0.5">{idx + 1}.</span>
                <span className="text-xs text-slate-300 leading-relaxed">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Module 5: Professional Review Topics (Full Width) */}
      <div className="bg-teal-950/20 border border-teal-800/40 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2.5 text-teal-400">
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">5. Priority Topics for Legal Counsel</h3>
            <p className="text-[11px] text-slate-400">Targeted areas where a qualified attorney can provide jurisdictional representation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {legalReviewTopics.map((r) => (
            <div key={r.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-teal-900/40">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-teal-300">{r.topic}</span>
                <span className="text-[10px] font-mono text-slate-400">{r.section}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{r.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
