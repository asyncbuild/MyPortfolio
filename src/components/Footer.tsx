import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-8 pb-14 mt-12 sm:mt-14 border-t theme-border text-xs font-mono theme-text-faint select-none">
      {/* Closing Philosophy Note */}
      <div className="flex flex-col items-center justify-center text-center pb-7 mb-7 border-b theme-border space-y-1.5">
        <p className="text-sm sm:text-base italic font-serif tracking-wide theme-text-title select-text">
          “Be Delusional.”
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Left: Name & Title */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="theme-text-title font-semibold">{PERSONAL_INFO.name}</span>
          <span className="opacity-30">•</span>
          <span className="theme-text-muted">Associate Software Engineer</span>
        </div>

        {/* Center / Tech Stack */}
        <div className="text-[11px] theme-text-faint hidden md:flex items-center gap-2">
          <span>Built with React 19, TypeScript &amp; Tailwind</span>
          <span>•</span>
          <a
            href="/goal"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/goal');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:theme-text-title transition-colors underline underline-offset-2 cursor-pointer"
            title="View AI Backend Lock-In Plan"
          >
            Lock-In Plan
          </a>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md theme-subtle transition-all duration-150 shadow-xs cursor-pointer active:scale-[0.98] hover:theme-text-title group"
          title="Scroll back to top"
          aria-label="Back to top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
        </button>
      </div>
    </footer>
  );
};
