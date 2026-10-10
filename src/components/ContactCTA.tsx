import React from 'react';
import { Mail, Calendar, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SpotlightCard } from './ui/SpotlightCard';
import { Magnetic } from './ui/Magnetic';
import { useToast } from '../context/ToastContext';

interface ContactCTAProps {
  onOpenCalModal?: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onOpenCalModal }) => {
  const { copyToClipboard } = useToast();

  const handleCopyEmail = () => {
    copyToClipboard(PERSONAL_INFO.email, `Copied ${PERSONAL_INFO.email} to clipboard!`);
  };

  return (
    <section id="contact" className="py-2 relative space-y-4">
      <h2 className="text-2xl font-bold theme-text-title tracking-tight">
        Contact
      </h2>

      <SpotlightCard className="p-6 sm:p-7 rounded-xl relative overflow-hidden theme-border shadow-xs">
        <div className="relative z-10 space-y-5">
          <p className="text-xs sm:text-sm theme-text-muted leading-relaxed max-w-xl">
            If you need any service, have a project or custom software to build, or want to collaborate—feel free to reach out. I'm always open to discussing new opportunities.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.15}>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-4 py-2 rounded-md theme-btn-primary font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.15}>
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-2 rounded-md theme-subtle font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-xs"
                title="Click to copy email address"
              >
                <Copy className="w-3.5 h-3.5 opacity-70" />
                <span className="font-mono text-xs">{PERSONAL_INFO.email}</span>
              </button>
            </Magnetic>

            {onOpenCalModal && (
              <Magnetic strength={0.15}>
                <button
                  onClick={onOpenCalModal}
                  className="px-3.5 py-2 rounded-md theme-subtle font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 opacity-70" />
                  <span>Book a call</span>
                </button>
              </Magnetic>
            )}
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
};


