import React from 'react';
import { CERTIFICATIONS, PERSONAL_INFO } from '../data/resumeData';
import { Award, GraduationCap, Globe, CheckCircle } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Accreditations & Languages</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Education & Certifications
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-1">
          Formal academic foundation paired with rigorous continuous specialization in system design, advanced JavaScript runtimes, and engineering leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Education & Certifications (2 Cols) */}
        <div className="md:col-span-2 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  cert.highlight
                    ? 'bg-slate-900/80 border-slate-700/80 hover:border-sky-500/50 shadow-md'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-indigo-400 shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                      <span>{cert.issuer}</span>
                      <span>•</span>
                      <span className="text-sky-400">{cert.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages & Working Proficiency (1 Col) */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-sky-400" />
              Language Fluency
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Experienced working in distributed international and English-speaking engineering squads across time zones (CST / EST / PST).
            </p>

            <div className="space-y-3">
              {PERSONAL_INFO.languages.map((lang) => (
                <div key={lang.name} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-slate-200 font-semibold">{lang.name}</span>
                    <span className="text-emerald-400">{lang.proficiency}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        lang.name === 'Spanish' ? 'w-full bg-emerald-500' : 'w-[95%] bg-sky-400'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-800/40 text-xs text-slate-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Ready for Remote & High-Velocity Engineering Cultures</span>
          </div>
        </div>
      </div>
    </section>
  );
};
