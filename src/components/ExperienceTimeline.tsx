import React, { useState } from 'react';
import { EXPERIENCES } from '../data/resumeData';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle, Zap } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const ExperienceTimeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(EXPERIENCES[0].id);

  const toggleExpand = (id: string) => {
    soundFx.playClick(650);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono uppercase tracking-wider mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Track Record & Engineering Leadership</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Professional Experience
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-1">
          Over 8 years building, scaling, and architecting mission-critical web applications, enterprise libraries, and interactive systems.
        </p>
      </div>

      {/* Timeline items */}
      <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 pl-6 md:pl-8 space-y-8">
        {EXPERIENCES.map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          const isCurrent = index === 0;

          return (
            <div key={exp.id} className="relative group">
              {/* Timeline marker */}
              <div
                className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  isCurrent
                    ? 'bg-sky-400 border-sky-300 ring-4 ring-sky-500/20 shadow-lg shadow-sky-500/50'
                    : 'bg-slate-900 border-slate-600 group-hover:border-sky-400 group-hover:scale-110'
                }`}
              />

              {/* Main Card */}
              <div
                className={`p-6 rounded-2xl border transition-all duration-200 ${
                  isExpanded
                    ? 'bg-slate-900/90 border-slate-700/80 shadow-xl shadow-black/40 ring-1 ring-sky-500/30'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                {/* Header info */}
                <div
                  className="cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3"
                  onClick={() => toggleExpand(exp.id)}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-lg md:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {exp.role}
                      </span>
                      <span className="text-slate-400">@</span>
                      <span className="text-base md:text-lg font-bold text-sky-400">
                        {exp.company}
                      </span>
                      {isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold animate-pulse">
                          Current Role
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {exp.location}
                      </span>
                      <span className="text-slate-500">• {exp.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    {/* Metrics preview */}
                    {exp.metrics && exp.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-950/40 border border-sky-800/50 text-xs font-mono text-sky-300"
                      >
                        <Zap className="w-3 h-3 text-sky-400" />
                        <span>{m.value}</span>
                        <span className="text-[10px] text-slate-400">{m.label}</span>
                      </div>
                    ))}

                    <button
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  {exp.summary}
                </p>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-slate-800 space-y-4 animate-fadeIn">
                    {/* Highlights bullet points */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Key Responsibilities & Architectural Impact
                      </h4>
                      <ul className="space-y-2">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                            <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-2">
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Technologies Deployed
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-200 border border-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
