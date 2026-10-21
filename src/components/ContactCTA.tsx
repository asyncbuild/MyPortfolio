import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SpotlightCard } from './ui/SpotlightCard';

interface ContactCTAProps {
  onOpenCalModal?: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onOpenCalModal }) => {
  return (
    <section id="contact" className="py-2 relative space-y-4">
      <h2 className="text-2xl font-bold theme-text-title tracking-tight">
        Contact
      </h2>

      <SpotlightCard className="p-5 sm:p-7 rounded-xl relative overflow-hidden theme-border shadow-xs">
        <div className="relative z-10 space-y-4 sm:space-y-5">
          <p className="text-xs sm:text-sm theme-text-muted leading-relaxed max-w-xl">
            Have a project in mind, need help building a web tool or data pipeline, or just want to chat about engineering? My inbox is always open.
          </p>

          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-full sm:w-auto justify-center px-4 py-2.5 sm:py-2 rounded-md theme-btn-primary font-semibold text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>

            {onOpenCalModal && (
              <button
                onClick={onOpenCalModal}
                className="w-full sm:w-auto justify-center px-4 py-2.5 sm:py-2 rounded-md theme-subtle font-medium text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 cursor-pointer active:scale-[0.98] shadow-xs hover:theme-text-title"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a call</span>
              </button>
            )}
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
};


