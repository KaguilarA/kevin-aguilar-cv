import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, ArrowRight, X, Volume2, Sparkles, FileText, Mail, ExternalLink, Code } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEffects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (id: string) => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
  onToggleJsonMode: () => void;
}

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Actions' | 'Tools';
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  onToggleSound,
  soundEnabled,
  onToggleJsonMode,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
      soundFx.playClick(800);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      id: 'nav-architecture',
      label: 'Explore Architecture Blueprints (Module Federation, Signals, Canvas)',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-purple-400" />,
      action: () => onSelectSection('architecture'),
      shortcut: 'G A',
    },
    {
      id: 'nav-experience',
      label: 'View Professional Experience & Career Milestones',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-sky-400" />,
      action: () => onSelectSection('experience'),
      shortcut: 'G E',
    },
    {
      id: 'nav-skills',
      label: 'Inspect Technical Competencies & Skill Matrix',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: () => onSelectSection('skills'),
      shortcut: 'G S',
    },
    {
      id: 'nav-profiler',
      label: 'Launch Live React Performance Profiler & Benchmark',
      category: 'Navigation',
      icon: <Code className="w-4 h-4 text-amber-400" />,
      action: () => onSelectSection('profiler'),
      shortcut: 'G P',
    },
    {
      id: 'nav-certifications',
      label: 'Review Certifications & Academic Accreditations',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      action: () => onSelectSection('certifications'),
      shortcut: 'G C',
    },
    {
      id: 'action-copy-email',
      label: 'Copy Email to Clipboard (kevin.231@hotmail.com)',
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: () => {
        navigator.clipboard.writeText('kevin.231@hotmail.com');
        soundFx.playSuccess();
        alert('Email copied to clipboard: kevin.231@hotmail.com');
      },
      shortcut: '⌘ C',
    },
    {
      id: 'action-confetti',
      label: 'Deploy Particle Confetti Blast',
      category: 'Actions',
      icon: <Sparkles className="w-4 h-4 text-pink-400" />,
      action: () => {
        soundFx.playLaser();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#c084fc', '#34d399', '#f43f5e'],
        });
      },
    },
    {
      id: 'action-export-cv',
      label: 'Print / Save Executive PDF CV',
      category: 'Actions',
      icon: <FileText className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.print();
      },
      shortcut: '⌘ P',
    },
    {
      id: 'action-toggle-json',
      label: 'Inspect Raw Dev JSON Schema (Resume Data)',
      category: 'Tools',
      icon: <Code className="w-4 h-4 text-yellow-400" />,
      action: onToggleJsonMode,
    },
    {
      id: 'action-toggle-sound',
      label: `Toggle Futuristic UI Audio FX (${soundEnabled ? 'Enabled' : 'Muted'})`,
      category: 'Tools',
      icon: <Volume2 className="w-4 h-4 text-teal-400" />,
      action: onToggleSound,
    },
    {
      id: 'action-linkedin',
      label: 'Open LinkedIn Profile (linkedin.com/in/kaguilara)',
      category: 'Actions',
      icon: <ExternalLink className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.open('https://linkedin.com/in/kaguilara', '_blank');
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      soundFx.playClick(500);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      soundFx.playClick(600);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans backdrop-filter backdrop-blur-xl"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3 bg-slate-950/40">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to section (e.g. 'architecture', 'email', 'skills')..."
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none text-sm md:text-base font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-slate-500 font-mono text-sm">
              No matching commands or sections found.
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-gradient-to-r from-sky-500/20 via-purple-500/20 to-transparent border border-sky-500/40 text-white'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.shortcut && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {item.shortcut}
                      </span>
                    )}
                    {isSelected && <ArrowRight className="w-4 h-4 text-sky-400 animate-pulse" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer HUD */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-sky-400/80">Kevin Aguilar • Architecture Hub</span>
        </div>
      </div>
    </div>
  );
};
