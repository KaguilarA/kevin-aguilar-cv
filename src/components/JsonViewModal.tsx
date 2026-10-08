import React, { useState } from 'react';
import { X, Copy, Check, FileJson } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, ARCHITECTURE_SHOWCASE, SKILL_CATEGORIES, CERTIFICATIONS, OPEN_SOURCE_LIBRARIES, COINBOX_GAMES } from '../data/resumeData';
import { soundFx } from '../utils/soundEffects';

interface JsonViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JsonViewModal: React.FC<JsonViewModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const fullResumeJson = {
    $schema: "https://json-resume.org/schema/",
    basics: PERSONAL_INFO,
    work: EXPERIENCES,
    architectures: ARCHITECTURE_SHOWCASE,
    openSourcePackages: OPEN_SOURCE_LIBRARIES,
    shippedGames: COINBOX_GAMES,
    skills: SKILL_CATEGORIES,
    education: CERTIFICATIONS,
  };

  const jsonString = JSON.stringify(fullResumeJson, null, 2);

  const handleCopy = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-slate-950 border border-slate-850 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2 text-slate-200">
            <FileJson className="w-4 h-4 text-amber-400" />
            <span className="font-bold">kevin-aguilar-resume-schema.json</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">JSON-LD / Schema.org</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Raw JSON'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-5 overflow-auto bg-[#07090e] text-slate-300 leading-relaxed font-mono">
          <pre className="text-emerald-400/90 whitespace-pre">
            {jsonString}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-slate-900/90 border-t border-slate-800 text-slate-500 text-[11px] flex items-center justify-between">
          <span>Machine-readable Senior Software Engineer Profile</span>
          <span className="text-sky-400">UTF-8 • Valid JSON</span>
        </div>
      </div>
    </div>
  );
};
