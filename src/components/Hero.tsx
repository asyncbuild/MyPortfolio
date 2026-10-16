import React, { useState, useEffect } from 'react';
import { Calendar, Mail, FileText, Command, Sun, Moon, Terminal, Clock, MapPin } from 'lucide-react';
import { ContainerTextFlip } from './ui/container-text-flip';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './SocialIcons';
import { Magnetic } from './ui/Magnetic';
import { SpotlightCard } from './ui/SpotlightCard';

interface HeroProps {
  onOpenCalModal: () => void;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: (e?: React.MouseEvent) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCalModal,
  onOpenCommandPalette,
  onOpenResume,
  onOpenTerminal,
  theme,
  onToggleTheme,
}) => {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      };
      setTimeStr(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative pt-2 pb-4">
      {/* Outer Clean Card */}
      <SpotlightCard className="relative overflow-hidden shadow-sm">

        {/* Top Header Banner Artwork */}
        <div className="w-full h-40 sm:h-52 relative overflow-hidden bg-black border-b theme-border">
          <img
            src={PERSONAL_INFO.bannerUrl}
            alt="Hero Header Banner"
            className="w-full h-full object-cover object-center opacity-85 hover:opacity-95 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Profile Content Body */}
        <div className="p-4 sm:p-8 relative">

          {/* Top Row: Avatar & Controls */}
          <div className="flex items-start justify-between gap-4 -mt-14 sm:-mt-20 mb-5 sm:mb-6 relative z-10">

            {/* Avatar Image with Magnetic Pull */}
            <Magnetic strength={0.2}>
              <div className="relative cursor-pointer group">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover object-center border-2 border-white/20 dark:border-white/10 shadow-2xl bg-zinc-950 transition-all duration-300 group-hover:scale-105 group-hover:border-white/40 ring-1 ring-black/40"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                  loading="eager"
                />
              </div>
            </Magnetic>

            {/* Top Right Clean Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 pt-12 sm:pt-16">
              {/* CLI Terminal Launcher Button */}
              <button
                onClick={onOpenTerminal}
                className="px-2.5 py-1.5 rounded-md theme-subtle text-xs font-mono transition-all duration-150 flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-[0.98] group"
                title="Open Interactive Terminal (Ctrl+T)"
                aria-label="Open Terminal"
              >
                <Terminal className="w-3.5 h-3.5 theme-text-muted group-hover:theme-text-title transition-colors" />
                <span className="hidden sm:inline">CLI</span>
              </button>

              {/* Command Palette Button */}
              <button
                onClick={onOpenCommandPalette}
                className="px-2.5 py-1.5 rounded-md theme-subtle text-xs font-mono transition-all duration-150 flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-[0.98] group"
                title={`Command Palette (${isMac ? '⌘K' : 'Ctrl+K'})`}
                aria-label="Open Command Palette"
              >
                <Command className="w-3.5 h-3.5 theme-text-muted group-hover:theme-text-title transition-colors" />
                <span className="text-xs font-mono font-medium">{isMac ? '⌘K' : 'Ctrl+K'}</span>
              </button>

              {/* Theme Toggle Button (Dark / Light) */}
              <button
                onClick={(e) => onToggleTheme(e)}
                className="p-1.5 sm:p-2 rounded-md theme-subtle text-xs font-mono transition-all duration-150 flex items-center justify-center shadow-xs cursor-pointer active:scale-[0.98] group"
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 theme-text-muted group-hover:theme-text-title transition-colors animate-in fade-in zoom-in duration-300" />
                ) : (
                  <Moon className="w-3.5 h-3.5 theme-text-muted group-hover:theme-text-title transition-colors animate-in fade-in zoom-in duration-300" />
                )}
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <h1 className="flex items-center gap-3">
              <ContainerTextFlip
                words={[PERSONAL_INFO.name, "asyncbuild"]}
                interval={5000}
                className="text-2xl sm:text-4xl font-extrabold tracking-tight pb-2"
              />
            </h1>
          </div>

          {/* Integrated Live Status & Real-Time IST Clock Banner */}
          <div className="mb-5 p-3 sm:p-3.5 rounded-xl bg-[var(--subtle-bg)] border theme-border flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 text-xs shadow-xs">
            {/* Unified Status Badge & Full Readable Sentence */}
            <div className="flex items-start gap-2.5 min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span>Live</span>
              </span>

              <p className="theme-text-muted text-[11px] sm:text-xs leading-relaxed">
                Scaling real-time AI on{' '}
                <a
                  href="https://whisprlive.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-text-title font-semibold underline decoration-emerald-500/50 underline-offset-2 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors"
                  title="Open WhisprLive (https://whisprlive.live)"
                >
                  WhisprLive
                </a>{' '}
                &amp; engineering distributed data pipelines for{' '}
                <strong className="theme-text-title font-semibold">GitHub Pulse</strong>
              </p>
            </div>

            {/* Location & IST Clock */}
            <div className="flex items-center gap-2.5 text-[11px] font-mono theme-text-faint shrink-0 pt-2 md:pt-0 border-t md:border-t-0 theme-border md:border-transparent">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="theme-text-muted">India</span>
              </div>
              <span className="opacity-30 select-none theme-text-faint">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="theme-text-title tabular-nums font-semibold">
                  {timeStr || 'IST'}
                </span>
              </div>
            </div>
          </div>

          {/* Bio Tagline */}
          <p className="text-sm sm:text-base theme-text-body font-medium leading-relaxed mb-4">
            {PERSONAL_INFO.tagline}
          </p>

          {/* Bio Bullet Points */}
          <ul className="space-y-2 mb-6 sm:mb-7 text-xs sm:text-sm theme-text-muted">
            {PERSONAL_INFO.bioPoints.map((point, index) => {
              const parts = point.split(/(React|TypeScript|Python|WhisprLive|GitHub Pulse|EY GDS)/g);
              return (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="theme-text-faint select-none mt-0.5">•</span>
                  <span className="leading-relaxed">
                    {parts.map((part, i) => {
                      if (part === 'WhisprLive') {
                        return (
                          <a
                            key={i}
                            href="https://whisprlive.live"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="theme-text-title font-semibold underline decoration-indigo-500/50 underline-offset-2 hover:text-indigo-400 hover:decoration-indigo-400 transition-colors cursor-pointer"
                            title="Open WhisprLive (https://whisprlive.live)"
                          >
                            WhisprLive
                          </a>
                        );
                      }
                      if (part === 'React' || part === 'TypeScript' || part === 'Python' || part === 'GitHub Pulse' || part === 'EY GDS') {
                        return (
                          <strong key={i} className="theme-text-title font-semibold">
                            {part}
                          </strong>
                        );
                      }
                      return part;
                    })}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Intro Call & Email Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <button
              onClick={onOpenCalModal}
              className="w-full sm:w-auto justify-center px-4 py-2.5 sm:py-2 rounded-md theme-btn-primary font-semibold text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an intro call</span>
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-full sm:w-auto justify-center px-4 py-2.5 sm:py-2 rounded-md theme-subtle font-medium text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 cursor-pointer active:scale-[0.98] shadow-xs hover:theme-text-title"
              title="Send an email"
            >
              <Mail className="w-4 h-4" />
              <span>Send an email</span>
            </a>
          </div>

          {/* Social Links Section */}
          <div className="pt-5 sm:pt-6 border-t theme-border">
            <p className="text-xs theme-text-faint mb-2.5 sm:mb-3">
              Here are my <strong className="theme-text-title font-medium">socials</strong>
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-center px-3 py-2 sm:py-1.5 rounded-md theme-subtle transition-all duration-150 flex items-center gap-2 text-xs font-medium cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-center px-3 py-2 sm:py-1.5 rounded-md theme-subtle transition-all duration-150 flex items-center gap-2 text-xs font-medium cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
                <span>Twitter</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-center px-3 py-2 sm:py-1.5 rounded-md theme-subtle transition-all duration-150 flex items-center gap-2 text-xs font-medium cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <button
                onClick={onOpenResume}
                className="justify-center px-3 py-2 sm:py-1.5 rounded-md theme-subtle transition-all duration-150 flex items-center gap-2 text-xs font-medium cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            </div>
          </div>

        </div>

      </SpotlightCard>
    </section>
  );
};

