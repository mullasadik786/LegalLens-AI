import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  FileSearch,
  Radar,
  Network,
  MessageSquareText,
  GitCompare,
  CalendarClock,
  CheckSquare,
  Briefcase,
  LockKeyhole,
  Settings,
  BookOpen,
  Compass
} from 'lucide-react';

export type NavTab = 
  | 'home'
  | 'xray'
  | 'clauses'
  | 'radar'
  | 'decision_map'
  | 'chat'
  | 'next_steps'
  | 'compare'
  | 'timeline'
  | 'action_plan'
  | 'lawyer_brief'
  | 'viewer'
  | 'vault'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  hasDocument: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isMobileOpen,
  onCloseMobile,
  hasDocument,
}) => {
  const navItems = [
    { id: 'home' as NavTab, label: 'Overview / Hero', icon: LayoutDashboard, badge: undefined },
    { id: 'xray' as NavTab, label: 'Document X-Ray', icon: Cpu, badge: hasDocument ? 'Active' : undefined },
    { id: 'clauses' as NavTab, label: 'Clause Explorer', icon: FileSearch, badge: undefined },
    { id: 'radar' as NavTab, label: 'Clause Radar', icon: Radar, badge: undefined },
    { id: 'decision_map' as NavTab, label: 'Decision Map', icon: Network, badge: undefined },
    { id: 'chat' as NavTab, label: 'Ask LegalLens', icon: MessageSquareText, badge: 'AI' },
    { id: 'next_steps' as NavTab, label: 'Next-Step Navigator', icon: Compass, badge: 'Guide' },
    { id: 'viewer' as NavTab, label: 'Document Reader', icon: BookOpen, badge: undefined },
    { id: 'compare' as NavTab, label: 'Deep Compare', icon: GitCompare, badge: 'v1 vs v2' },
    { id: 'timeline' as NavTab, label: 'Timeline', icon: CalendarClock, badge: undefined },
    { id: 'action_plan' as NavTab, label: 'Action Plan', icon: CheckSquare, badge: undefined },
    { id: 'lawyer_brief' as NavTab, label: 'Lawyer Brief', icon: Briefcase, badge: 'Prep' },
    { id: 'vault' as NavTab, label: 'Legal Vault', icon: LockKeyhole, badge: undefined },
    { id: 'settings' as NavTab, label: 'Settings & Privacy', icon: Settings, badge: undefined },
  ];

  const handleItemClick = (id: NavTab) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800/80 shrink-0 h-[calc(100vh-4rem)] sticky top-16 select-none overflow-y-auto">
        <div className="p-3">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-2">
            Intelligence Workspace
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-nav-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      item.badge === 'AI' 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : item.badge === 'Active'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Workspace Status */}
        <div className="mt-auto p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-medium text-slate-300">Safety Guardian: Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Grounded evidence verification enabled.</p>
        </div>
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-950/80 backdrop-blur-sm flex">
          <div className="w-72 bg-slate-950 border-r border-slate-800 h-full flex flex-col p-4 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-bold text-white">LegalLens Navigation</span>
              <button
                onClick={onCloseMobile}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            <nav className="mt-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="flex-1" onClick={onCloseMobile} />
        </div>
      )}

      {/* Mobile Bottom Bar for key actions */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur px-2 py-1.5 flex justify-around items-center">
        <button
          onClick={() => onSelectTab('xray')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] ${activeTab === 'xray' ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}
        >
          <Cpu className="w-5 h-5" />
          <span>X-Ray</span>
        </button>
        <button
          onClick={() => onSelectTab('clauses')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] ${activeTab === 'clauses' ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}
        >
          <FileSearch className="w-5 h-5" />
          <span>Clauses</span>
        </button>
        <button
          onClick={() => onSelectTab('chat')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] ${activeTab === 'chat' ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}
        >
          <MessageSquareText className="w-5 h-5" />
          <span>Ask AI</span>
        </button>
        <button
          onClick={() => onSelectTab('compare')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] ${activeTab === 'compare' ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}
        >
          <GitCompare className="w-5 h-5" />
          <span>Compare</span>
        </button>
        <button
          onClick={() => onSelectTab('timeline')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] ${activeTab === 'timeline' ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}
        >
          <CalendarClock className="w-5 h-5" />
          <span>Timeline</span>
        </button>
      </nav>
    </>
  );
};
