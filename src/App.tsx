import { useState, useEffect, useCallback } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import { ArchitectureShowcase } from './components/ArchitectureShowcase';
import { LibrariesShowcase } from './components/LibrariesShowcase';
import { GamesShowcase } from './components/GamesShowcase';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsMatrix } from './components/SkillsMatrix';
import { LivePerformanceDemo } from './components/LivePerformanceDemo';
import { CertificationsSection } from './components/CertificationsSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { JsonViewModal } from './components/JsonViewModal';
import { soundFx } from './utils/soundEffects';

export function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = useCallback(() => {
    soundFx.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      soundFx.playSuccess();
    }
  }, [soundEnabled]);

  const handleSelectSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      soundFx.playClick(600);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-sky-300">
      {/* Background ambient mesh gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/10 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[128px] animate-pulse-glow" />
      </div>

      {/* Sticky Navigation Header */}
      <HeaderNav
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleSound={handleToggleSound}
        soundEnabled={soundEnabled}
        onOpenJsonMode={() => setIsJsonModalOpen(true)}
        onSelectSection={handleSelectSection}
      />

      {/* Main Content Container */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-20">
        {/* Executive Hero */}
        <HeroSection
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onSelectSection={handleSelectSection}
          onOpenContactModal={() => handleSelectSection('contact')}
        />

        {/* Real-Time Interactive Canvas 2D / WebGL Engine */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              Live Interactive Architecture & Particle Topology Engine
            </span>
            <span className="hidden sm:inline text-slate-500">60 FPS Hardware-Accelerated Canvas</span>
          </div>
          <InteractiveCanvas />
        </div>

        {/* Systems Architecture Showcase */}
        <ArchitectureShowcase />

        {/* Authored Open-Source Libraries (Reactive-Values & owl-expressjs-utils) */}
        <LibrariesShowcase />

        {/* Shipped Games Showcase (Konceptik & CoinBox Studio) */}
        <GamesShowcase />

        {/* Professional Experience Timeline */}
        <ExperienceTimeline />

        {/* Technical Skills Matrix */}
        <SkillsMatrix />

        {/* Live React Performance Profiler & Benchmark */}
        <LivePerformanceDemo />

        {/* Education & Certifications */}
        <CertificationsSection />
      </main>

      {/* Footer & Direct Contact */}
      <Footer />

      {/* Command Palette Modal (CMD+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectSection={handleSelectSection}
        onToggleSound={handleToggleSound}
        soundEnabled={soundEnabled}
        onToggleJsonMode={() => {
          setIsJsonModalOpen(true);
        }}
      />

      {/* Developer Raw JSON Resume Schema Modal */}
      <JsonViewModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
      />
    </div>
  );
}

export default App;