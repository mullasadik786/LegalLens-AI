import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Calendar,
  AlertCircle,
  FileSearch,
  HelpCircle,
  FolderOpen,
  Briefcase,
  ExternalLink,
  Plus,
  CheckCircle2
} from 'lucide-react';
import { ActionChecklistItem } from '../types/legal';
import { DEMO_ACTION_PLAN_ITEMS } from '../data/demoDocuments';

interface ActionPlanProps {
  initialItems?: ActionChecklistItem[];
  onJumpToEvidence: (page: number, section: string) => void;
}

export const ActionPlan: React.FC<ActionPlanProps> = ({
  initialItems = DEMO_ACTION_PLAN_ITEMS as ActionChecklistItem[],
  onJumpToEvidence,
}) => {
  const [items, setItems] = useState<ActionChecklistItem[]>(initialItems);
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ActionChecklistItem['category']>('Questions to Ask');

  const categories: ActionChecklistItem['category'][] = [
    'Important Dates',
    'My Obligations',
    'Information to Verify',
    'Questions to Ask',
    'Documents to Gather',
    'Professional Review Topics'
  ];

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newItem: ActionChecklistItem = {
      id: 'act-custom-' + Date.now(),
      category: newItemCategory,
      text: newItemText.trim(),
      completed: false
    };
    setItems([...items, newItem]);
    setNewItemText('');
  };

  const completedCount = items.filter(i => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100) || 0;

  const getCategoryIcon = (cat: ActionChecklistItem['category']) => {
    switch (cat) {
      case 'Important Dates': return <Calendar className="w-4 h-4 text-cyan-400" />;
      case 'My Obligations': return <CheckSquare className="w-4 h-4 text-blue-400" />;
      case 'Information to Verify': return <FileSearch className="w-4 h-4 text-purple-400" />;
      case 'Questions to Ask': return <HelpCircle className="w-4 h-4 text-amber-400" />;
      case 'Documents to Gather': return <FolderOpen className="w-4 h-4 text-emerald-400" />;
      case 'Professional Review Topics': return <Briefcase className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div className="w-full space-y-6 text-left pb-16">
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">My Legal Action Plan</h1>
              <p className="text-xs text-slate-400">
                Actionable checklist to track obligations, missing documentation, and consultation topics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl self-start sm:self-auto">
            <div className="text-right">
              <span className="text-xs font-bold text-white">{completedCount} of {items.length} done</span>
              <span className="text-[10px] text-slate-400 block">{progressPercent}% complete</span>
            </div>
            <div className="w-12 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-emerald-400 h-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={addItem} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-3">
        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value as ActionChecklistItem['category'])}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none w-full sm:w-auto"
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add custom action or question for legal counsel..."
          className="bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 outline-none flex-1 w-full"
        />
        <button
          type="submit"
          disabled={!newItemText.trim()}
          className="w-full sm:w-auto px-4 py-2 rounded-lg font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>
      </form>

      {/* Checklist Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((category) => {
          const categoryItems = items.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                {getCategoryIcon(category)}
                <h2 className="text-xs font-bold uppercase tracking-wider text-white">{category}</h2>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono ml-auto">
                  {categoryItems.filter(i => i.completed).length}/{categoryItems.length}
                </span>
              </div>

              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3 rounded-xl border flex items-start gap-3 transition cursor-pointer ${
                      item.completed
                        ? 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                        : 'bg-slate-950/90 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-slate-400 hover:text-emerald-400 transition shrink-0"
                    >
                      {item.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>

                    <div className="flex-1 text-xs">
                      <p className={`leading-relaxed ${item.completed ? 'line-through opacity-60' : 'font-medium'}`}>
                        {item.text}
                      </p>
                      {item.sourcePage && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onJumpToEvidence(item.sourcePage!, item.sourceSection || '');
                          }}
                          className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 mt-1 font-semibold"
                        >
                          <span>Source: Pg {item.sourcePage} ({item.sourceSection})</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
