import React from 'react';
import { Terminal, Volume2, VolumeX, FileJson, Printer } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface HeaderNavProps {
  onOpenCommandPalette: () => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
  onOpenJsonMode: () => void;
  onSelectSection: (id: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenCommandPalette,
  onToggleSound,
  soundEnabled,
  onOpenJsonMode,
  onSelectSection,
}) => {
  const navLinks = [
    { id: 'architecture', label: 'Architecture' },
    { id: 'games', label: 'Games' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'profiler', label: 'Live Profiler' },
    { id: 'certifications', label: 'Education' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090a0f]/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            soundFx.playClick(900);
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-black text-white text-xs font-mono tracking-tighter">
              KA
            </div>
          </div>
          <div>
            <div className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
              <span>Kevin Aguilar</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] font-mono text-slate-400">Senior Architect</div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80 font-mono text-xs">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onSelectSection(link.id)}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Quick Launcher Pill */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 text-xs font-mono text-slate-300 transition-all hover:border-slate-600 shadow-sm"
            title="Open Command Launcher"
          >
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">⌘K</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-purple-950/40 border-purple-700/60 text-purple-300'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Mute futuristic UI sound effects' : 'Enable futuristic UI sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Raw JSON Mode */}
          <button
            onClick={onOpenJsonMode}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
            title="Inspect Raw Dev JSON Schema"
          >
            <FileJson className="w-4 h-4" />
          </button>

          {/* Quick Print CV */}
          <button
            onClick={() => window.print()}
            className="hidden sm:flex p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-sky-400 transition-colors"
            title="Print or Export PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
