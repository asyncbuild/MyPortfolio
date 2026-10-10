import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';

export const Currently: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');

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
      <SpotlightCard className="p-3 sm:p-3.5 border theme-border rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          {/* Left: Live status with blinking green pulse */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-2 truncate text-xs">
              <span className="font-mono font-semibold uppercase tracking-wider text-[11px] theme-text-title shrink-0">
                Currently
              </span>
              <span className="opacity-30 select-none">•</span>
              <span className="theme-text-muted truncate">
                Scaling real-time WebSocket clusters for <strong className="font-medium text-zinc-200">WhisprLive</strong>
              </span>
            </div>
          </div>

          {/* Right: Location, IST Live Clock & Quick Jump */}
          <div className="flex items-center gap-3 text-[11px] font-mono theme-text-faint shrink-0 self-end sm:self-auto">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-400/80" />
              <span>India</span>
            </div>
            <span className="opacity-30 select-none">•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400/80" />
              <span className="text-zinc-200 dark:text-zinc-200 tabular-nums">
                {timeStr || '11:27 PM'} IST
              </span>
            </div>
            <a
              href="#projects"
              className="p-1 rounded theme-subtle hover:text-indigo-400 transition-colors flex items-center gap-0.5 ml-1"
              title="View Projects"
            >
              <span>Projects</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
};

