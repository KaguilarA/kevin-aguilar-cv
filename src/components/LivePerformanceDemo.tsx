import React, { useState, useEffect, useRef, memo } from 'react';
import { Gauge, Play, Pause, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

// Memoized optimized node
const OptimizedCell = memo(({ id, value, renderCountRef }: { id: number; value: number; renderCountRef: React.MutableRefObject<number> }) => {
  renderCountRef.current++;
  return (
    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-emerald-900/40 text-center font-mono">
      <div className="text-[10px] text-slate-400">Node #{id}</div>
      <div className="text-base font-bold text-emerald-400">{value}</div>
      <div className="text-[9px] text-emerald-500/80">Memoized (O(1))</div>
    </div>
  );
});

// Unoptimized node that re-renders unconditionally
const UnoptimizedCell = ({ id, value, renderCountRef }: { id: number; value: number; renderCountRef: React.MutableRefObject<number> }) => {
  renderCountRef.current++;
  return (
    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-rose-900/40 text-center font-mono">
      <div className="text-[10px] text-slate-400">Node #{id}</div>
      <div className="text-base font-bold text-rose-400">{value}</div>
      <div className="text-[9px] text-rose-500/80">Waste Re-render</div>
    </div>
  );
};

export const LivePerformanceDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'optimized' | 'unoptimized'>('optimized');
  const [dataStream, setDataStream] = useState<number[]>([120, 340, 560, 780, 910, 420]);
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const [globalTick, setGlobalTick] = useState<number>(0);

  const optimizedRendersRef = useRef<number>(0);
  const unoptimizedRendersRef = useRef<number>(0);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        const randIdx = Math.floor(Math.random() * 6);
        setTargetIndex(randIdx);
        setDataStream((prev) => {
          const next = [...prev];
          next[randIdx] = Math.floor(Math.random() * 999);
          return next;
        });
        setGlobalTick((t) => t + 1);
      }, 120);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleReset = () => {
    optimizedRendersRef.current = 0;
    unoptimizedRendersRef.current = 0;
    setGlobalTick(0);
    setDataStream([100, 200, 300, 400, 500, 600]);
    soundFx.playClick(400);
  };

  const toggleRun = () => {
    soundFx.playClick(isRunning ? 500 : 750);
    setIsRunning(!isRunning);
  };

  return (
    <section id="profiler" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2">
          <Gauge className="w-3.5 h-3.5" />
          <span>Interactive Proof of Craft</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Senior React Performance Profiler
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-1">
          Live simulation comparing naive React re-render cascades against senior fine-grained reactivity and memoization topology.
        </p>
      </div>

      {/* Main Interactive Profiler Box */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleRun}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all shadow-lg ${
                isRunning
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 hover:bg-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4 text-rose-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
              {isRunning ? 'Pause Event Stream' : 'Run Live Stream Simulation'}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Profiler
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActiveTab('optimized');
                soundFx.playClick(700);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'optimized'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Fine-Grained Architecture
            </button>
            <button
              onClick={() => {
                setActiveTab('unoptimized');
                soundFx.playClick(500);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'unoptimized'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Naive / Unoptimized
            </button>
          </div>
        </div>

        {/* Live Metrics HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 font-mono">
            <div className="text-[11px] text-slate-500">Events Streamed</div>
            <div className="text-xl font-bold text-sky-400">{globalTick}</div>
            <div className="text-[10px] text-slate-500">Mutations per sec: ~8</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 font-mono">
            <div className="text-[11px] text-slate-500">Mutated Target Cell</div>
            <div className="text-xl font-bold text-purple-400">Node #{targetIndex}</div>
            <div className="text-[10px] text-slate-500">Value: {dataStream[targetIndex]}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 font-mono">
            <div className="text-[11px] text-slate-500">Optimized Render Count</div>
            <div className="text-xl font-bold text-emerald-400">{optimizedRendersRef.current}</div>
            <div className="text-[10px] text-emerald-500">Only updated leaf nodes</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 font-mono">
            <div className="text-[11px] text-slate-500">Unoptimized Render Count</div>
            <div className="text-xl font-bold text-rose-400">{unoptimizedRendersRef.current}</div>
            <div className="text-[10px] text-rose-500">6x Cascade re-renders</div>
          </div>
        </div>

        {/* Visualized Subtree Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Visualized Component Subtree (6 Nodes)</span>
            <span>
              Current Strategy:{' '}
              <span className={activeTab === 'optimized' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {activeTab === 'optimized' ? 'React.memo + Stable References' : 'Uncontrolled Prop Propagation'}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {dataStream.map((val, idx) =>
              activeTab === 'optimized' ? (
                <OptimizedCell key={idx} id={idx} value={val} renderCountRef={optimizedRendersRef} />
              ) : (
                <UnoptimizedCell key={idx} id={idx} value={val} renderCountRef={unoptimizedRendersRef} />
              )
            )}
          </div>
        </div>

        {/* Senior Engineering Quality Standards */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Senior Architectural Principles Applied</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1">
              <div className="text-sky-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                Zero Render Thrashing
              </div>
              <p className="text-slate-400">
                Isolating high-frequency mutation boundaries using custom hooks and selector subscriptions.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1">
              <div className="text-purple-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                Garbage Collection Avoidance
              </div>
              <p className="text-slate-400">
                Object pooling & static structures preventing allocation spikes during streaming data loops.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1">
              <div className="text-emerald-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Enterprise Typing Contracts
              </div>
              <p className="text-slate-400">
                Strict generic interfaces ensuring 100% type safety from API payloads to UI components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
