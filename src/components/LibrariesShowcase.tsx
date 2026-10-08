import React, { useState } from 'react';
import { OPEN_SOURCE_LIBRARIES } from '../data/resumeData';
import { Package, ExternalLink, Copy, Check, Terminal, Code, Sparkles, BookOpen } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const LibrariesShowcase: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<{ [key: string]: 'overview' | 'code' }>({
    'reactive-values': 'code',
    'owl-expressjs-utils': 'code',
  });

  const handleCopyCmd = (id: string, cmd: string) => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTab = (id: string, tab: 'overview' | 'code') => {
    soundFx.playClick(600);
    setActiveCodeTab((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section id="libraries" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Package className="w-3.5 h-3.5" />
            <span>Open Source Tooling & Public Packages</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Authored Open-Source Libraries
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-1">
            Production-ready NPM packages engineered with strict TypeScript typing, zero superfluous dependencies, and high-performance developer ergonomics.
          </p>
        </div>

        <a
          href="https://github.com/KaguilarA"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/60 text-xs font-mono text-slate-200 hover:text-white transition-all shadow-md self-start md:self-auto"
        >
          <span>github.com/KaguilarA</span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
        </a>
      </div>

      {/* Library Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {OPEN_SOURCE_LIBRARIES.map((lib) => {
          const currentTab = activeCodeTab[lib.id] || 'code';
          const isCopied = copiedId === lib.id;

          return (
            <div
              key={lib.id}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0d121c] to-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between space-y-5 hover:border-slate-700 transition-all"
            >
              {/* Card Header */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Package className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {lib.name}
                      </h3>
                      <span className="text-xs font-mono text-slate-400">{lib.category}</span>
                    </div>
                  </div>

                  {/* NPM badge pill */}
                  <a
                    href={lib.npmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-[11px] font-mono hover:bg-rose-900/50 transition-colors flex items-center gap-1.5"
                  >
                    <span>npm: {lib.packageName}</span>
                    <ExternalLink className="w-3 h-3 text-rose-400" />
                  </a>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {lib.description}
                </p>

                {/* Quick Copy Install Pill */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-cyan-300">{lib.installCmd}</span>
                  </div>

                  <button
                    onClick={() => handleCopyCmd(lib.id, lib.installCmd)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 transition-colors cursor-pointer"
                    title="Copy install command"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Tab Switcher: Code vs Features */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                    <button
                      onClick={() => toggleTab(lib.id, 'code')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        currentTab === 'code'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Code className="w-3 h-3" />
                        TypeScript Usage
                      </span>
                    </button>
                    <button
                      onClick={() => toggleTab(lib.id, 'overview')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        currentTab === 'overview'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Architectural Features
                      </span>
                    </button>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <span>100% Strict TypeScript</span>
                  </div>
                </div>

                {/* Tab Content */}
                {currentTab === 'code' ? (
                  <div className="p-3.5 rounded-xl bg-[#07090e] border border-slate-850 font-mono text-[11px] text-cyan-300/90 overflow-x-auto leading-relaxed shadow-inner">
                    <pre className="whitespace-pre">{lib.codeSample}</pre>
                  </div>
                ) : (
                  <ul className="space-y-2 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-300">
                    {lib.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Card Footer Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs font-mono">
                <div className="flex flex-wrap gap-1.5">
                  {lib.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-slate-800/80 text-[10px] text-slate-300 border border-slate-700/60"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {lib.docsUrl && (
                    <a
                      href={lib.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Docs</span>
                    </a>
                  )}

                  <a
                    href={lib.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    <span>GitHub Repo</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
