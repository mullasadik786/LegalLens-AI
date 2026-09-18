import React, { useState } from 'react';
import { Network, ArrowRight, ExternalLink, CheckCircle2, ChevronRight, Layers, HelpCircle } from 'lucide-react';
import { LegalDocument, DecisionNode } from '../types/legal';

interface LegalDecisionMapProps {
  document: LegalDocument;
  onJumpToEvidence: (page: number, section: string) => void;
  onAskAI: (question: string) => void;
}

export const LegalDecisionMap: React.FC<LegalDecisionMapProps> = ({
  document,
  onJumpToEvidence,
  onAskAI,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-doc');

  const selectedNode = document.decisionNodes.find(n => n.id === selectedNodeId) || document.decisionNodes[0];

  const getNodeColor = (cat: DecisionNode['category']) => {
    switch (cat) {
      case 'document': return 'border-indigo-500 bg-indigo-950/40 text-indigo-300';
      case 'parties': return 'border-cyan-500 bg-cyan-950/40 text-cyan-300';
      case 'obligations': return 'border-blue-500 bg-blue-950/40 text-blue-300';
      case 'payments': return 'border-emerald-500 bg-emerald-950/40 text-emerald-300';
      case 'deadlines': return 'border-orange-500 bg-orange-950/40 text-orange-300';
      case 'termination': return 'border-amber-500 bg-amber-950/40 text-amber-300';
      case 'ip': return 'border-purple-500 bg-purple-950/40 text-purple-300';
      case 'dispute': return 'border-rose-500 bg-rose-950/40 text-rose-300';
      default: return 'border-slate-700 bg-slate-900 text-slate-300';
    }
  };

  return (
    <div className="w-full space-y-6 text-left pb-16">
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Legal Decision Map</h1>
            <p className="text-xs text-slate-400">
              Interactive structural dependency graph tracing clauses from Execution to Obligations, Payments, and Termination.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Graph Canvas Visualizer */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-6 relative min-h-[480px] overflow-x-auto">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center justify-between">
            <span>Contract Flow Graph (Click any node)</span>
            <span className="text-cyan-400">Connected Nodes Active</span>
          </div>

          {/* Connected Cards Layout */}
          <div className="space-y-6 max-w-2xl mx-auto">
            {/* Level 1: Root Contract Node */}
            <div className="flex justify-center">
              {document.decisionNodes.filter(n => n.category === 'document').map(node => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`px-5 py-3 rounded-2xl border text-sm font-bold transition-all shadow-lg cursor-pointer ${
                    selectedNodeId === node.id ? 'ring-2 ring-indigo-400 scale-105' : 'hover:border-indigo-400'
                  } ${getNodeColor(node.category)}`}
                >
                  📄 {node.label}
                </button>
              ))}
            </div>

            {/* Connecting arrows */}
            <div className="flex justify-center text-slate-600">
              <span className="text-xs">↓</span>
            </div>

            {/* Level 2: Parties & Duties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {document.decisionNodes.filter(n => ['parties', 'obligations'].includes(n.category)).map(node => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-4 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                    selectedNodeId === node.id ? 'ring-2 ring-indigo-400 scale-[1.02]' : 'hover:border-slate-600'
                  } ${getNodeColor(node.category)}`}
                >
                  <span className="block text-[10px] uppercase tracking-wider opacity-75 font-bold mb-1">
                    {node.category}
                  </span>
                  <span className="text-sm font-bold text-white block mb-1">{node.label}</span>
                  <span className="text-[11px] opacity-85 line-clamp-1">{node.summary}</span>
                </button>
              ))}
            </div>

            {/* Connecting arrows */}
            <div className="flex justify-around text-slate-600 text-xs px-10">
              <span>↓</span>
              <span>↓</span>
            </div>

            {/* Level 3: Financials, IP, and Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {document.decisionNodes.filter(n => ['payments', 'ip', 'deadlines'].includes(n.category)).map(node => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-4 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                    selectedNodeId === node.id ? 'ring-2 ring-indigo-400 scale-[1.02]' : 'hover:border-slate-600'
                  } ${getNodeColor(node.category)}`}
                >
                  <span className="block text-[10px] uppercase tracking-wider opacity-75 font-bold mb-1">
                    {node.category}
                  </span>
                  <span className="text-sm font-bold text-white block mb-1">{node.label}</span>
                  <span className="text-[11px] opacity-85 line-clamp-1">{node.summary}</span>
                </button>
              ))}
            </div>

            {/* Connecting arrows */}
            <div className="flex justify-around text-slate-600 text-xs px-10">
              <span>↓</span>
              <span>↓</span>
            </div>

            {/* Level 4: Termination & Dispute Resolution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {document.decisionNodes.filter(n => ['termination', 'dispute'].includes(n.category)).map(node => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-4 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                    selectedNodeId === node.id ? 'ring-2 ring-indigo-400 scale-[1.02]' : 'hover:border-slate-600'
                  } ${getNodeColor(node.category)}`}
                >
                  <span className="block text-[10px] uppercase tracking-wider opacity-75 font-bold mb-1">
                    {node.category}
                  </span>
                  <span className="text-sm font-bold text-white block mb-1">{node.label}</span>
                  <span className="text-[11px] opacity-85 line-clamp-1">{node.summary}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Node Details Panel */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Selected Node Details
            </span>
            <button
              onClick={() => onJumpToEvidence(selectedNode.sourcePage, selectedNode.sourceSection)}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Pg {selectedNode.sourcePage} · {selectedNode.sourceSection}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <h2 className="text-lg font-bold text-white">{selectedNode.label}</h2>

          <div className="space-y-1.5 text-xs">
            <span className="text-slate-400 block font-semibold">Node Explanation:</span>
            <p className="text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
              {selectedNode.summary}
            </p>
          </div>

          {/* Connected Dependencies */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300">Connected Dependencies:</span>
            <div className="space-y-1.5">
              {selectedNode.connectedTo.length > 0 ? (
                selectedNode.connectedTo.map(connId => {
                  const target = document.decisionNodes.find(n => n.id === connId);
                  if (!target) return null;
                  return (
                    <div
                      key={connId}
                      onClick={() => setSelectedNodeId(connId)}
                      className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 text-xs text-slate-300 flex items-center justify-between cursor-pointer transition"
                    >
                      <span>→ {target.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-500 italic">Terminal resolution node.</p>
              )}
            </div>
          </div>

          {/* Ask AI action */}
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => onAskAI(`Explain how ${selectedNode.label} affects my legal obligations and rights under this agreement.`)}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ask AI About This Node</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
