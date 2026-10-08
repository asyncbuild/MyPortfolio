import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Radio, Play, Pause, Sparkles, Volume2, Globe } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';
import { playSound } from '../utils/sound';
import { useToast } from '../context/ToastContext';

export const BentoGrid: React.FC = () => {
  const { showToast } = useToast();

  // 1. Live Local Time (IST - UTC+5:30)
  const [timeStr, setTimeStr] = useState('');
  const [timePeriod, setTimePeriod] = useState<'day' | 'night'>('day');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in Asia/Kolkata
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const str = formatter.format(now);
      setTimeStr(str);

      // Hour in IST
      const istHour = parseInt(
        new Intl.DateTimeFormat([], { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }).format(now),
        10
      );
      setTimePeriod(istHour >= 6 && istHour < 19 ? 'day' : 'night');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Ambient Lo-Fi Generator / Vibe Player (Synthesized Web Audio chill chords)
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  const toggleLofiMusic = () => {
    playSound('click');
    if (isPlaying) {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlaying(false);
      showToast('Lo-Fi chill audio paused', 'info');
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const chordProgression = [
          [261.63, 329.63, 392.0, 523.25], // C maj
          [220.0, 261.63, 329.63, 440.0],  // A min
          [174.61, 220.0, 261.63, 349.23], // F maj
          [196.0, 246.94, 293.66, 392.0],  // G maj
        ];
        let chordIdx = 0;

        const playChord = () => {
          if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
          const currentCtx = audioContextRef.current;
          const now = currentCtx.currentTime;
          const chord = chordProgression[chordIdx % chordProgression.length];
          chordIdx++;

          chord.forEach((freq) => {
            const osc = currentCtx.createOscillator();
            const gain = currentCtx.createGain();
            const filter = currentCtx.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(650, now);

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.018, now + 1.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(currentCtx.destination);

            osc.start(now);
            osc.stop(now + 4);
          });
        };

        playChord();
        synthIntervalRef.current = window.setInterval(playChord, 3500);
        setIsPlaying(true);
        showToast('Playing synthesized ambient coding beats 🎧', 'success');
      } catch {
        showToast('Unable to start audio', 'info');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // 3. Interactive Reactions / Guestbook counters
  const [reactions, setReactions] = useState<{ [key: string]: number }>(() => {
    const saved = localStorage.getItem('deepesh-portfolio-reactions');
    return saved
      ? JSON.parse(saved)
      : {
          fire: 84,
          rocket: 62,
          code: 118,
          coffee: 45,
          heart: 97,
        };
  });

  const handleReaction = (type: string) => {
    playSound('pop');
    setReactions((prev) => {
      const updated = { ...prev, [type]: (prev[type] || 0) + 1 };
      localStorage.setItem('deepesh-portfolio-reactions', JSON.stringify(updated));
      return updated;
    });
    showToast(`Thanks for the reaction! ✨`, 'success');
  };

  return (
    <section id="live" className="space-y-4 pt-2">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono uppercase tracking-wider theme-text-faint flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          Live Pulse & Activity
        </h2>
      </div>

      {/* Bento 3-Box Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Box 1: Local Clock & Availability */}
        <SpotlightCard
          className="p-4 flex flex-col justify-between"
          spotlightColor="rgba(56, 189, 248, 0.12)"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono theme-text-faint flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              India Standard Time (IST)
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
              <span className="font-semibold">Available</span>
            </div>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold theme-text-title tracking-tight">
                {timeStr || '11:35:00 AM'}
              </span>
              <span className="text-xs font-mono theme-text-faint">
                {timePeriod === 'day' ? '☀️ Active' : '🌙 Remote'}
              </span>
            </div>
            <p className="text-xs theme-text-muted mt-1 leading-relaxed">
              Ready for high-impact full stack & frontend roles.
            </p>
          </div>

          <div className="pt-2 mt-2 border-t theme-border flex items-center justify-between text-[10px] font-mono theme-text-faint">
            <span>Location: Remote / Kolkata</span>
            <span>UTC +5:30</span>
          </div>
        </SpotlightCard>

        {/* Box 2: Lo-Fi Coding Ambient Vibe */}
        <SpotlightCard
          className="p-4 flex flex-col justify-between"
          spotlightColor="rgba(168, 85, 247, 0.12)"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono theme-text-faint flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              Deep Focus Ambient Vibe
            </span>
            {isPlaying && (
              <span className="flex items-center gap-0.5 h-3">
                <span className="w-1 h-3 bg-purple-500 dark:bg-purple-400 animate-pulse" />
                <span className="w-1 h-2 bg-purple-500 dark:bg-purple-400 animate-pulse delay-75" />
                <span className="w-1 h-4 bg-purple-500 dark:bg-purple-400 animate-pulse delay-150" />
              </span>
            )}
          </div>

          <div className="my-2">
            <p className="text-sm font-semibold theme-text-title">Chill Chords Generator</p>
            <p className="text-xs theme-text-muted mt-0.5 leading-relaxed">
              Synthesized atmospheric soundscape for deep coding sessions.
            </p>
          </div>

          <div className="pt-2 border-t theme-border flex items-center justify-between">
            <button
              onClick={toggleLofiMusic}
              className="px-3 py-1.5 rounded-md theme-subtle text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  <span>Pause Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  <span>Play Coding Beats</span>
                </>
              )}
            </button>
            <Volume2 className="w-3.5 h-3.5 theme-text-faint" />
          </div>
        </SpotlightCard>

        {/* Box 3: Quick Tap Reactions */}
        <SpotlightCard
          className="p-4 flex flex-col justify-between sm:col-span-2 lg:col-span-1"
          spotlightColor="rgba(244, 63, 94, 0.12)"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono theme-text-faint flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
              Instant Reactions
            </span>
            <span className="text-[10px] font-mono theme-text-faint">Tap to boost!</span>
          </div>

          <div className="my-1">
            <p className="text-xs theme-text-muted mb-2.5">
              Leave a quick reaction for the portfolio:
            </p>

            <div className="flex items-center justify-between gap-1.5">
              {[
                { type: 'fire', icon: '🔥', label: reactions.fire },
                { type: 'rocket', icon: '🚀', label: reactions.rocket },
                { type: 'code', icon: '💻', label: reactions.code },
                { type: 'coffee', icon: '☕', label: reactions.coffee },
                { type: 'heart', icon: '❤️', label: reactions.heart },
              ].map((item) => (
                <motion.button
                  key={item.type}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleReaction(item.type)}
                  className="flex-1 flex flex-col items-center py-1.5 px-1 rounded-md theme-subtle transition-all cursor-pointer group shadow-xs"
                >
                  <span className="text-base group-hover:scale-125 transition-transform">{item.icon}</span>
                  <span className="text-[10px] font-mono font-semibold theme-text-title mt-0.5">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t theme-border text-[10px] font-mono theme-text-faint flex justify-between">
            <span>Interactive Feedback</span>
            <span>Saved in Storage</span>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
