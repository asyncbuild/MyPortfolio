import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

interface GoalsViewProps {
  onBack: () => void;
  theme?: 'dark' | 'light';
}

export const GoalsView: React.FC<GoalsViewProps> = ({ onBack, theme = 'dark' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isLight = theme === 'light';

  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'THEME_CHANGE', theme }, '*');
    }
  }, [theme]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col h-screen w-screen overflow-hidden ${isLight ? 'bg-[#EEF2F1]' : 'bg-[#0C1413]'}`}>
      {/* Top Floating Minimal Bar */}
      <div className={`h-12 border-b px-4 sm:px-6 flex items-center justify-between z-20 shrink-0 select-none ${
        isLight
          ? 'bg-[#FFFFFF] border-[#D3DCDA]'
          : 'bg-[#142120] border-[#253633]'
      }`}>
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-150 cursor-pointer shadow-xs active:scale-[0.98] border ${
            isLight
              ? 'bg-[#DDF0ED] hover:bg-[#cbeae5] text-[#0F766E] border-[#0F766E]/30'
              : 'bg-[#12302D] hover:bg-[#0F766E]/40 text-[#34D3C1] border-[#34D3C1]/30'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </button>

        <div className={`flex items-center gap-2 text-xs font-mono ${isLight ? 'text-[#586966]' : 'text-[#93A8A3]'}`}>
          <span className={`w-2 h-2 rounded-full animate-pulse ${isLight ? 'bg-[#0F766E]' : 'bg-[#34D3C1]'}`} />
          <span className={`font-semibold ${isLight ? 'text-[#13211F]' : 'text-[#E4EEEB]'}`}>AI Backend Lock-In Plan</span>
          <span className="hidden sm:inline opacity-60">• Nov 2026 – Apr 2027</span>
        </div>
      </div>

      {/* Embedded Study Plan Document */}
      <div className={`flex-1 w-full h-[calc(100vh-48px)] overflow-hidden ${isLight ? 'bg-[#EEF2F1]' : 'bg-[#0C1413]'}`}>
        <iframe
          ref={iframeRef}
          src={`/goals.html?theme=${theme}`}
          title="AI Backend Lock-In Plan"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};
