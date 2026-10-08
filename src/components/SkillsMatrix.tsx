import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/resumeData';
import { Wrench, Search, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.category)];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    soundFx.playClick(600);
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
      return null;
    }
    const filteredSkills = cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredSkills.length === 0) return null;
    return {
      ...cat,
      skills: filteredSkills,
    };
  }).filter(Boolean);

  return (
    <section id="skills" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>Technical Capabilities & Mastery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Engineering Skill Matrix
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-1">
            Deep JavaScript & TypeScript proficiency across runtimes, rendering contexts, component architectures, and scalable cloud systems.
          </p>
        </div>

        {/* Live Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter skills (e.g. WebGL, React)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="space-y-6">
        {filteredCategories.map((group) => {
          if (!group) return null;
          return (
            <div
              key={group.category}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4 shadow-lg backdrop-blur-sm"
            >
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {group.category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                            {skill.name}
                          </span>
                          {skill.featured && (
                            <span className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              <Sparkles className="w-2.5 h-2.5" />
                              Expertise
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-mono text-slate-400">
                          {skill.experienceYears}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        {skill.description}
                      </p>
                    </div>

                    {/* Progress Level Bar */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                        <span>Proficiency Index</span>
                        <span className="text-emerald-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full transition-all duration-500 group-hover:from-emerald-400 group-hover:to-cyan-300"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
