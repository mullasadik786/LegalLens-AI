import React, { useState } from 'react';
import {
  CalendarClock,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  UserCheck,
  Calendar,
  Filter
} from 'lucide-react';
import { LegalDocument, TimelineEvent } from '../types/legal';

interface ObligationTimelineProps {
  timeline: TimelineEvent[];
  onJumpToEvidence: (page: number, section: string) => void;
}

export const ObligationTimeline: React.FC<ObligationTimelineProps> = ({
  timeline,
  onJumpToEvidence,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredEvents = timeline.filter((e) => {
    if (filterStatus === 'all') return true;
    return e.status === filterStatus;
  });

  const getStatusBadge = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'milestone':
        return { label: 'Milestone', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
      case 'action_required':
        return { label: 'Action Required', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
      case 'upcoming':
        return { label: 'Scheduled', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
    }
  };

  return (
    <div className="w-full space-y-6 text-left pb-16">
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center text-orange-400">
              <CalendarClock className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Obligation & Critical Date Timeline</h1>
              <p className="text-xs text-slate-400">
                Explicit dates, milestone windows, and compliance cutoffs mapped to responsible parties.
              </p>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl self-start sm:self-auto text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                filterStatus === 'all' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Events ({timeline.length})
            </button>
            <button
              onClick={() => setFilterStatus('action_required')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                filterStatus === 'action_required' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Action Required
            </button>
            <button
              onClick={() => setFilterStatus('milestone')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                filterStatus === 'milestone' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Milestones
            </button>
          </div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500/30 space-y-8 ml-3">
        {filteredEvents.map((event, index) => {
          const badge = getStatusBadge(event.status);
          return (
            <div key={event.id} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center text-[10px] font-bold text-indigo-400 group-hover:scale-125 transition-transform shadow-md shadow-indigo-500/20">
                {index + 1}
              </div>

              {/* Event Card */}
              <div className="bg-slate-900/80 border border-slate-800/90 hover:border-indigo-500/40 rounded-2xl p-5 space-y-3 transition-all shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-cyan-400 font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.dateString}</span>
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  <button
                    onClick={() => onJumpToEvidence(event.sourcePage, event.sourceSection)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                  >
                    <span>Pg {event.sourcePage} · {event.sourceSection}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-white">{event.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{event.description}</p>

                {event.responsibleParty && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Responsible Party: <strong className="text-slate-200">{event.responsibleParty}</strong></span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
