import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface GoalsViewProps {
  onBack: () => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#0C1413] flex flex-col h-screen w-screen overflow-hidden">
      {/* Top Floating Minimal Bar */}
      <div className="h-12 bg-[#142120] border-b border-[#253633] px-4 sm:px-6 flex items-center justify-between z-20 shrink-0 select-none">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#12302D] hover:bg-[#0F766E]/40 text-[#34D3C1] text-xs font-mono transition-all cursor-pointer shadow-xs active:scale-95 border border-[#34D3C1]/30"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[#93A8A3]">
          <span className="w-2 h-2 rounded-full bg-[#34D3C1] animate-pulse" />
          <span className="font-semibold text-[#E4EEEB]">Data Engineer Lock-In Plan</span>
          <span className="hidden sm:inline opacity-60">• Oct 2026 – Feb 2027</span>
        </div>
      </div>

      {/* Embedded Study Plan Document */}
      <div className="flex-1 w-full h-[calc(100vh-48px)] overflow-hidden bg-[#0C1413]">
        <iframe
          src="/goals.html"
          title="Data Engineer Lock-In Plan"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};
