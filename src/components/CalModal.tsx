import React, { useEffect } from 'react';
import { Calendar, X, ExternalLink } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalModal: React.FC<CalModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi({});
        cal('ui', {
          theme: 'dark',
          styles: { branding: { brandColor: '#10b981' } },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      } catch (err) {
        console.error('Cal.com embed initialization error:', err);
      }
    })();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[85vh] rounded-xl theme-card-solid shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border theme-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b theme-border bg-[var(--subtle-bg)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold theme-text-title flex items-center gap-2">
                Book a 1-on-1 Intro Call
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                  Live Sync
                </span>
              </h3>
              <p className="text-xs theme-text-muted mt-0.5">Select a date & time to schedule a 30-min video call</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.calComLink}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono theme-subtle theme-text-muted hover:theme-text-title transition-colors"
            >
              <span>Open in Cal.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md theme-text-faint hover:theme-text-title hover:theme-subtle transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body: Live Cal.com Embed */}
        <div className="w-full flex-1 overflow-y-auto bg-[var(--bg-primary)] p-2">
          <Cal
            calLink={PERSONAL_INFO.calSlug || 'saikumar2603'}
            style={{ width: '100%', height: '100%', minHeight: '550px', overflow: 'scroll' }}
            config={{ layout: 'month_view', theme: 'dark' }}
          />
        </div>
      </div>
    </div>
  );
};
