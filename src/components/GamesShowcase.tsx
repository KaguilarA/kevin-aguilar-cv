import React, { useState } from 'react';
import { COINBOX_GAMES } from '../data/resumeData';
import { Gamepad2, ExternalLink, Sparkles, Cpu, Layers } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const GamesShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Slot' | 'Scratch' | 'Keno'>('All');

  const filteredGames = COINBOX_GAMES.filter((g) => {
    if (activeFilter === 'All') return true;
    return g.type === activeFilter;
  });

  const handleFilterChange = (filter: 'All' | 'Slot' | 'Scratch' | 'Keno') => {
    setActiveFilter(filter);
    soundFx.playClick(650);
  };

  return (
    <section id="games" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Interactive Graphics & Engine Architecture</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Shipped Games (Konceptik & CoinBox Studio)
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-1">
            Engineered the core JavaScript/Canvas rendering architecture powering 35+ commercial slot and scratch card titles published on{' '}
            <a
              href="https://coinboxstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 underline font-semibold inline-flex items-center gap-1"
            >
              CoinBox Studio
              <ExternalLink className="w-3 h-3" />
            </a>.
          </p>
        </div>

        {/* Live Studio Button */}
        <a
          href="https://coinboxstudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-pink-500/60 text-xs font-mono text-slate-200 hover:text-white transition-all shadow-md self-start md:self-auto"
        >
          <span>Visit coinboxstudio.com</span>
          <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(['All', 'Slot', 'Scratch', 'Keno'] as const).map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                isActive
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/60 shadow-md shadow-pink-500/10'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {filter === 'All' ? 'All Games (11+)' : `${filter} Titles`}
            </button>
          );
        })}
      </div>

      {/* Games Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl hover:border-pink-500/50 hover:shadow-pink-500/10 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Card Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <img
                src={game.background}
                alt={game.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/80 text-pink-400 border border-pink-500/40 backdrop-blur-md">
                  {game.type}
                </span>
                {game.lines && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-950/80 text-sky-400 border border-sky-500/40 backdrop-blur-md">
                    {game.lines} Lines
                  </span>
                )}
              </div>

              {game.featured && (
                <div className="absolute top-2.5 right-2.5 p-1 rounded-md bg-slate-950/80 text-amber-400 border border-amber-500/40 backdrop-blur-md">
                  <Sparkles className="w-3 h-3" />
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-3.5 space-y-2">
              <h3 className="font-bold text-sm text-slate-100 group-hover:text-pink-300 transition-colors line-clamp-1">
                {game.title}
              </h3>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
                <span className="flex items-center gap-1 text-slate-400">
                  <Cpu className="w-3 h-3 text-sky-400" />
                  60 FPS Canvas
                </span>

                <a
                  href="https://coinboxstudio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 flex items-center gap-0.5"
                >
                  <span>Play</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engine Technical Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-950/30 via-purple-950/20 to-slate-900 border border-pink-900/40 text-xs text-slate-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-white font-bold block text-sm font-sans">
              Konceptik Engine Architecture Highlights
            </span>
            <p className="text-slate-400 text-xs mt-0.5 font-sans leading-relaxed">
              Targeted 16.6ms requestAnimationFrame tick rate • Object pooling to eliminate GC spikes on mobile • PIXI.js / WebGL batch vertex pipelines • AWS CloudFront & S3 multi-region asset streaming.
            </p>
          </div>
        </div>

        <a
          href="https://coinboxstudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/50 transition-all font-semibold shrink-0"
        >
          Explore All Games at CoinBox Studio →
        </a>
      </div>
    </section>
  );
};
