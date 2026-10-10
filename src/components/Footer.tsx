import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Magnetic } from './ui/Magnetic';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-8 pb-14 mt-14 border-t theme-border text-xs font-mono theme-text-faint select-none">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Name & Title */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="theme-text-title font-semibold">{PERSONAL_INFO.name}</span>
          <span className="opacity-30">•</span>
          <span className="theme-text-muted">Data &amp; AI Engineer</span>
        </div>

        {/* Center / Tech Stack */}
        <div className="text-[11px] theme-text-faint hidden md:block">
          Built with React 19, TypeScript &amp; Tailwind
        </div>

        {/* Right: Magnetic Back to Top */}
        <Magnetic strength={0.2}>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md theme-subtle transition-all shadow-xs cursor-pointer active:scale-95 hover:theme-text-title group"
            title="Scroll back to top"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </Magnetic>
      </div>
    </footer>
  );
};
