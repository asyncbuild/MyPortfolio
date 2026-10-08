import React, { useState, useEffect } from 'react';
import { Radio, Sparkles, Headphones, Cpu, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';

export const Currently: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'building' | 'exploring' | 'vibe'>('building');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Indian Standard Time (IST / UTC+5:30)
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
    <section id="currently" className="relative">
      <SpotlightCard className="p-4 sm:p-5 border theme-border">
        {/* Header with Live Status & Time */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b theme-border">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-semibold tracking-wider uppercase theme-text-title">
              Currently Live
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono theme-text-faint">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400/80" />
              <span>India</span>
            </div>
            <span className="select-none opacity-40">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400/80" />
              <span className="text-zinc-200 dark:text-zinc-200 font-medium tabular-nums">
                {timeStr || '10:00:00 PM'} IST
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Activity Selector */}
        <div className="grid grid-cols-3 gap-1.5 my-3.5 p-1 rounded-lg bg-zinc-900/40 dark:bg-zinc-950/60 border theme-border">
          <button
            onClick={() => setActiveTab('building')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'building'
                ? 'bg-zinc-800 text-white font-medium shadow-xs ring-1 ring-zinc-700'
                : 'theme-text-faint hover:theme-text-title'
            }`}
          >
            <Radio className="w-3 h-3 text-indigo-400" />
            <span>Building</span>
          </button>

          <button
            onClick={() => setActiveTab('exploring')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'exploring'
                ? 'bg-zinc-800 text-white font-medium shadow-xs ring-1 ring-zinc-700'
                : 'theme-text-faint hover:theme-text-title'
            }`}
          >
            <Cpu className="w-3 h-3 text-amber-400" />
            <span>Exploring</span>
          </button>

          <button
            onClick={() => setActiveTab('vibe')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'vibe'
                ? 'bg-zinc-800 text-white font-medium shadow-xs ring-1 ring-zinc-700'
                : 'theme-text-faint hover:theme-text-title'
            }`}
          >
            <Headphones className="w-3 h-3 text-emerald-400" />
            <span>Focus Track</span>
          </button>
        </div>

        {/* Tab Content Cards */}
        {activeTab === 'building' && (
          <div className="space-y-2 animate-in fade-in duration-300">
            <div className="p-3 rounded-lg bg-zinc-900/30 border theme-border flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-xs theme-text-title">WhisprLive Platform</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                    Real-time Audience
                  </span>
                </div>
                <p className="text-xs theme-text-muted leading-relaxed">
                  Zero-install audience interaction platform for keynotes & webinars with anonymous Q&A, live polls, dynamic word clouds, and 4K stage projector mode.
                </p>
              </div>
              <a
                href="#architecture"
                className="shrink-0 p-1.5 rounded theme-subtle text-xs font-mono flex items-center gap-1 hover:text-indigo-300"
                title="Jump to Interactive Architecture"
              >
                <span className="hidden sm:inline">Flow</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono theme-text-faint px-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Status: Scaling real-time Socket.IO room clustering & stage projection</span>
            </div>
          </div>
        )}

        {activeTab === 'exploring' && (
          <div className="space-y-2 animate-in fade-in duration-300">
            <div className="p-3 rounded-lg bg-zinc-900/30 border theme-border">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-xs theme-text-title">Current Research & Architecture Focus</span>
              </div>
              <p className="text-xs theme-text-muted leading-relaxed mb-2.5">
                Optimizing high-concurrency room clustering, client-side fingerprinting for single-vote integrity, and sub-50ms event dispatch pipelines.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Socket.IO Clustering', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
                  { name: 'Redis Adapter', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
                  { name: 'Dynamic Word Clouds', color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
                  { name: 'Rate Limiting', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                  { name: 'Prisma / PostgreSQL', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                ].map((tech) => (
                  <span
                    key={tech.name}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${tech.color}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vibe' && (
          <div className="space-y-2 animate-in fade-in duration-300">
            <div className="p-3 rounded-lg bg-zinc-900/30 border theme-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-1 bg-emerald-400 animate-pulse h-3 rounded-full" />
                    <span className="w-1 bg-emerald-400 animate-pulse h-4 rounded-full" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1 bg-emerald-400 animate-pulse h-2 rounded-full" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold theme-text-title">Synthwave & Deep Focus Chill</div>
                  <div className="text-[11px] font-mono theme-text-faint">Coding flow & late-night builds</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Playing
              </span>
            </div>
          </div>
        )}
      </SpotlightCard>
    </section>
  );
};
