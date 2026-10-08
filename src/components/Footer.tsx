import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/resumeData';
import { Mail, MapPin, ExternalLink, Copy, Check, Clock, Code2 } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Costa Rica (America/Costa_Rica)
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Costa_Rica',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="border-t border-slate-800/80 pt-16 pb-12 bg-slate-950/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Contact Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-sky-950/40 via-purple-950/40 to-slate-900 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
              Let's Build Exceptional Systems Together
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Ready for the next technical challenge.
            </h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Open to discussions regarding Senior Frontend Engineering, Staff/Lead Roles, and Architecture Consulting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4 text-sky-400" />
              <span>Send Direct Message</span>
            </a>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-mono text-slate-400">
          <div>
            <span className="text-slate-200 font-bold block mb-2 font-sans text-sm">Location & Timezone</span>
            <p className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              San José, Costa Rica (UTC-6)
            </p>
            <p className="flex items-center gap-1.5 text-emerald-400 mt-1">
              <Clock className="w-3.5 h-3.5" />
              Local Time: {localTime || '19:50 CST'}
            </p>
          </div>

          <div>
            <span className="text-slate-200 font-bold block mb-2 font-sans text-sm">Direct Contact</span>
            <p className="text-slate-300">{PERSONAL_INFO.email}</p>
            <p className="text-slate-300 mt-1">{PERSONAL_INFO.phone}</p>
          </div>

          <div>
            <span className="text-slate-200 font-bold block mb-2 font-sans text-sm">Professional Networks</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/kaguilara"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white mt-1 flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <span className="text-slate-200 font-bold block mb-2 font-sans text-sm">Crafted Architecture</span>
            <p className="text-slate-400">
              Engineered with React 19, TypeScript, Tailwind CSS, HTML5 Canvas 2D Pipeline & Web Audio API.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
          <span>© {new Date().getFullYear()} Kevin Aguilar. All rights reserved.</span>
          <span className="flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5 text-sky-500" />
            Senior Engineering Excellence
          </span>
        </div>
      </div>
    </footer>
  );
};
