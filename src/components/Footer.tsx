import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-8 pb-12 border-t theme-border mt-12 text-xs font-mono theme-text-faint">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, TypeScript & Tailwind.
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md theme-subtle transition-all shadow-sm cursor-pointer"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3 h-3 theme-text-faint" />
        </button>
      </div>
    </footer>
  );
};
