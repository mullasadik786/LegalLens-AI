import React, { useState } from 'react';
import { Radar, Info, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';
import { LegalDocument, LegalClause } from '../types/legal';

interface ClauseRadarProps {
  document: LegalDocument;
  onSelectClause: (clause: LegalClause) => void;
  onJumpToEvidence: (page: number, section: string) => void;
}

interface RadarCategoryNode {
  category: string;
  angle: number; // in degrees
  distance: number; // percentage from center
  color: string;
  clauseCount: number;
  description: string;
}

export const ClauseRadar: React.FC<ClauseRadarProps> = ({
  document,
  onSelectClause,
  onJumpToEvidence,
}) => {
  const [selectedNode, setSelectedNode] = useState<string | null>('Payment');

  const categories: RadarCategoryNode[] = [
    { category: 'Payment', angle: 0, distance: 75, color: '#10b981', clauseCount: 3, description: 'Base salary, 15% discretionary bonus, travel reimbursement' },
    { category: 'Obligations', angle: 36, distance: 68, color: '#3b82f6', clauseCount: 4, description: 'Full-time attention, standard duty performance, ethical adherence' },
    { category: 'Termination', angle: 72, distance: 82, color: '#f59e0b', clauseCount: 3, description: '30-day voluntary written notice, immediate cause definitions, 48h hardware return' },
    { category: 'Renewal', angle: 108, distance: 50, color: '#8b5cf6', clauseCount: 1, description: 'At-will indefinite term without mandatory renewal expiration' },
    { category: 'Liability', angle: 144, distance: 60, color: '#ec4899', clauseCount: 1, description: 'Statutory limitations, indemnification for official company acts' },
    { category: 'Confidentiality', angle: 180, distance: 80, color: '#06b6d4', clauseCount: 2, description: '5-year post-employment protection, perpetual trade secrets defense' },
    { category: 'Intellectual Property', angle: 216, distance: 88, color: '#a855f7', clauseCount: 3, description: 'Work made for hire, patent assignment, Cal. Labor Code 2870 carve-out' },
    { category: 'Privacy & Data', angle: 252, distance: 55, color: '#14b8a6', clauseCount: 1, description: 'Employee data handling, workplace monitoring permissions' },
    { category: 'Dispute Resolution', angle: 288, distance: 72, color: '#6366f1', clauseCount: 2, description: 'Binding AAA individual arbitration in SF, class action waiver' },
    { category: 'Deadlines', angle: 324, distance: 78, color: '#f97316', clauseCount: 4, description: '90-day review (Dec 31), annual bonus review (Sep 15), 48-hr turnover' },
  ];

  const activeCategory = categories.find(c => c.category === selectedNode) || categories[0];
  const relatedClauses = document.clauses.filter(c => 
    c.category.toLowerCase().includes(activeCategory.category.toLowerCase()) ||
    (activeCategory.category === 'Deadlines' && c.category === 'Termination') ||
    (activeCategory.category === 'Intellectual Property' && c.category === 'Intellectual Property')
  );

  return (
    <div className="w-full space-y-6 text-left pb-16">
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Radar className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Clause Radar Intelligence</h1>
            <p className="text-xs text-slate-400">
              Multi-dimensional structural map of key provisions. Click any category node to inspect coverage.
            </p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 italic">
          *Radar reflects thematic distribution across the document, not a subjective legal score.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Radar SVG Stage */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[460px]">
          {/* Radar Sweep Animation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
            <div className="w-[360px] h-[360px] rounded-full border border-indigo-500/40 animate-spin" style={{ animationDuration: '14s' }} />
          </div>

          <svg viewBox="-220 -220 440 440" className="w-full max-w-[420px] h-auto overflow-visible select-none">
            {/* Concentric circles */}
            {[50, 100, 150, 200].map((r) => (
              <circle
                key={r}
                cx="0"
                cy="0"
                r={r}
                fill="none"
                stroke="#1e293b"
                strokeWidth="1"
                strokeDasharray={r === 200 ? '4 4' : undefined}
              />
            ))}

            {/* Radial axis lines */}
            {categories.map((cat, i) => {
              const rad = (cat.angle * Math.PI) / 180;
              const x2 = Math.cos(rad) * 200;
              const y2 = Math.sin(rad) * 200;
              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={x2}
                  y2={y2}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
              );
            })}

            {/* Central Node */}
            <circle cx="0" cy="0" r="32" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
            <text
              x="0"
              y="-4"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              LEGAL
            </text>
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fill="#818cf8"
              fontSize="8"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              DOCUMENT
            </text>

            {/* Category Nodes */}
            {categories.map((cat) => {
              const rad = (cat.angle * Math.PI) / 180;
              const r = (cat.distance / 100) * 190;
              const cx = Math.cos(rad) * r;
              const cy = Math.sin(rad) * r;
              const isSelected = selectedNode === cat.category;

              return (
                <g
                  key={cat.category}
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={() => setSelectedNode(cat.category)}
                >
                  {/* Outer glow ring if selected */}
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="18"
                      fill="none"
                      stroke={cat.color}
                      strokeWidth="1.5"
                      opacity="0.6"
                      strokeDasharray="2 2"
                    />
                  )}
                  {/* Node Circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? "13" : "10"}
                    fill="#0f172a"
                    stroke={cat.color}
                    strokeWidth={isSelected ? "3" : "2"}
                  />
                  {/* Inner Count */}
                  <text
                    x={cx}
                    y={cy + 3.5}
                    textAnchor="middle"
                    fill={cat.color}
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {cat.clauseCount}
                  </text>
                  {/* Label Text */}
                  <text
                    x={cx}
                    y={cy > 0 ? cy + 22 : cy - 16}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#94a3b8'}
                    fontSize="9"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    {cat.category}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="text-xs text-slate-400 mt-4 text-center">
            Click any node on the radial radar to explore clauses & evidence.
          </p>
        </div>

        {/* Node Detail Drawer */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: activeCategory.color }}
              />
              <h2 className="text-base font-bold text-white">{activeCategory.category} Domain</h2>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {activeCategory.clauseCount} Identified Sections
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            {activeCategory.description}
          </p>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Mapped Clauses in Document:
            </h3>

            {relatedClauses.length > 0 ? (
              relatedClauses.map((clause) => (
                <div
                  key={clause.id}
                  className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/90 space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{clause.title}</span>
                    <button
                      onClick={() => onJumpToEvidence(clause.sourcePage, clause.sourceSection)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Pg {clause.sourcePage}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {clause.plainLanguage.en}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">
                Standard provisions apply. Refer to general contract boilerplate.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
