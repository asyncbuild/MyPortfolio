import React from 'react';
import { Calendar, Mail, FileText, Command, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, TwitterIcon, LinkedinIcon, DiscordIcon } from './SocialIcons';

interface HeroProps {
  onOpenCalModal: () => void;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: (e?: React.MouseEvent) => void;
}

// Live Ticking Age Counter for DOB: May 26, 2003, 7:30 AM IST
const LiveAgeCounter: React.FC = () => {
  const [ageStr, setAgeStr] = React.useState('');

  React.useEffect(() => {
    const dobMs = new Date('2003-05-26T07:30:00+05:30').getTime();
    const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;

    const updateAge = () => {
      const diff = Date.now() - dobMs;
      const age = (diff / msPerYear).toFixed(9);
      setAgeStr(age);
    };

    updateAge();
    const interval = setInterval(updateAge, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-cyan-400 font-bold tracking-tight">
      {ageStr || '23.000000000'}
    </span>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenCalModal, onOpenCommandPalette, onOpenResume, theme, onToggleTheme }) => {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

  return (
    <section id="hero" className="relative pt-2 pb-4">
      {/* Outer Clean Card */}
      <div className="relative rounded-lg theme-card overflow-hidden shadow-sm">

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

          {/* Top Row: Avatar & Command trigger */}
          <div className="flex items-start justify-between gap-4 -mt-14 sm:-mt-20 mb-5 sm:mb-6 relative z-10">

            {/* Avatar Image */}
            <div className="relative">
              <img
                src={PERSONAL_INFO.avatarUrl}
                alt={PERSONAL_INFO.name}
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg object-cover border-2 theme-border shadow-2xl bg-black"
              />
            </div>

            {/* Top Right Quick Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 pt-12 sm:pt-16">
              {/* Command Palette Button (Handles both Ctrl+K and Cmd+K) */}
              <button
                onClick={onOpenCommandPalette}
                className="px-2 sm:px-2.5 py-1.5 rounded-md theme-subtle text-xs font-mono transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
                title={`Command Palette (${isMac ? '⌘K' : 'Ctrl+K'})`}
                aria-label="Open Command Palette"
              >
                {isMac ? (
                  <Command className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-[10px] font-semibold">Ctrl</span>
                )}
                <span>K</span>
              </button>

              {/* Theme Toggle Button (Dark / Light) */}
              <button
                onClick={(e) => onToggleTheme(e)}
                className="p-1.5 sm:p-2 rounded-md theme-subtle text-xs font-mono transition-all flex items-center justify-center shadow-sm cursor-pointer active:scale-95"
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400 animate-in fade-in zoom-in duration-300" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-indigo-500 animate-in fade-in zoom-in duration-300" />
                )}
              </button>
            </div>
          </div>

          {/* Name & Subtitle */}
          <div className="mb-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold theme-text-title tracking-tight flex items-center gap-3">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-xs theme-text-faint font-mono mt-1 font-medium flex items-center gap-1.5 flex-wrap">
              <LiveAgeCounter /> years old • {PERSONAL_INFO.location}
            </p>
          </div>

          {/* Bio Tagline */}
          <p className="text-sm sm:text-lg theme-text-body font-medium leading-relaxed mb-5">
            {PERSONAL_INFO.tagline}
          </p>

          {/* Bio Bullet Points */}
          <ul className="space-y-2 mb-6 sm:mb-7 text-xs sm:text-sm theme-text-muted">
            {PERSONAL_INFO.bioPoints.map((point, index) => {
              const parts = point.split(/(Draco|VengeanceUI)/g);
              return (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="theme-text-faint select-none mt-0.5">•</span>
                  <span className="leading-relaxed">
                    {parts.map((part, i) =>
                      part === 'Draco' || part === 'VengeanceUI' ? (
                        <strong key={i} className="theme-text-title font-semibold">{part}</strong>
                      ) : (
                        part
                      )
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Intro Call & Email Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-6 sm:mb-8">
            <button
              onClick={onOpenCalModal}
              className="px-3.5 sm:px-4 py-2 rounded-md theme-btn-primary font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book an intro call
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="px-3.5 sm:px-4 py-2 rounded-md theme-subtle font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              Send an email
            </a>
          </div>

          {/* Social Links Section */}
          <div className="pt-5 sm:pt-6 border-t theme-border">
            <p className="text-xs theme-text-faint mb-2.5 sm:mb-3">
              Here are my <strong className="theme-text-title font-medium">socials</strong>
            </p>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-md theme-subtle transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                GitHub
              </a>

              <a
                href={PERSONAL_INFO.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-md theme-subtle transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
                Twitter
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-md theme-subtle transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                LinkedIn
              </a>

              <a
                href={PERSONAL_INFO.socials.discord}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-md theme-subtle transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
              >
                <DiscordIcon className="w-3.5 h-3.5" />
                Discord
              </a>

              <button
                onClick={onOpenResume}
                className="px-3 py-1.5 rounded-md theme-subtle transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                Resume
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
