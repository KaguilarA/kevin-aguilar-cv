import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/resumeData';
import { Mail, Phone, MapPin, Download, Check, Terminal, ExternalLink, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import { GithubIcon } from './icons/GithubIcon';

interface HeroSectionProps {
  onOpenCommandPalette: () => void;
  onSelectSection: (id: string) => void;
  onOpenContactModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCommandPalette,
  onSelectSection,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative pt-6 pb-12 space-y-8">
      {/* Top Status & Meta Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Available for Senior / Staff / Architecture Opportunities</span>
        </div>

        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-600 transition-all shadow-sm"
        >
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span>Quick Launcher</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
            ⌘K / Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Main Grid: Headline & Profile Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
            {PERSONAL_INFO.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              {PERSONAL_INFO.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-slate-400 mt-3">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400" />
              {PERSONAL_INFO.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              {PERSONAL_INFO.phone}
            </span>
            <span>•</span>
            <span className="text-slate-300">San José, Costa Rica</span>
          </div>
        </div>

        {/* Bio paragraph */}
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl font-normal">
          {PERSONAL_INFO.summary}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onSelectSection('architecture')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Architecture Blueprints</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400" />
            <span>GitHub Profile</span>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Click to copy email address"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-sky-400" />}
            <span>{copied ? 'Email Copied!' : PERSONAL_INFO.email}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Print or Save PDF"
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span>Export CV (Print/PDF)</span>
          </button>
        </div>

        {/* Executive Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          {PERSONAL_INFO.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm shadow-md"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
