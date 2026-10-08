import React, { useState } from 'react';
import { Code2, Copy, Check, Sparkles } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';
import { useToast } from '../context/ToastContext';

interface CodeSnippet {
  id: string;
  name: string;
  language: string;
  description: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'hook',
    name: 'useDebouncedSearch.ts',
    language: 'TypeScript',
    description: 'Custom generic debounce hook with abort controller for zero race conditions in search queries.',
    code: `import { useState, useEffect, useRef } from 'react';

export function useDebouncedSearch<T>(
  query: string,
  fetcher: (q: string, signal: AbortSignal) => Promise<T>,
  delay = 300
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setData(null);
      return;
    }

    setLoading(true);
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timer = setTimeout(async () => {
      try {
        const res = await fetcher(query, controller.signal);
        setData(res);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') console.error(err);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, delay, fetcher]);

  return { data, loading };
}`,
  },
  {
    id: 'rate-limit',
    name: 'rateLimiter.ts',
    language: 'TypeScript',
    description: 'Sliding window token bucket rate limiter for scalable high-throughput backend API endpoints.',
    code: `interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

export class SlidingWindowRateLimiter {
  private buckets = new Map<string, TokenBucket>();

  constructor(
    private capacity: number,
    private refillRatePerSec: number
  ) {}

  public isAllowed(key: string): boolean {
    const now = Date.now();
    const bucket = this.buckets.get(key) || {
      tokens: this.capacity,
      lastRefill: now,
    };

    const deltaSec = (now - bucket.lastRefill) / 1000;
    bucket.tokens = Math.min(
      this.capacity,
      bucket.tokens + deltaSec * this.refillRatePerSec
    );
    bucket.lastRefill = now;

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      this.buckets.set(key, bucket);
      return true;
    }

    return false;
  }
}`,
  },
];

export const CodeShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);
  const { copyToClipboard } = useToast();

  const currentSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  const handleCopy = () => {
    copyToClipboard(currentSnippet.code, `Copied ${currentSnippet.name}!`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="showcase" className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono uppercase tracking-wider theme-text-faint flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          Clean Architecture & Code Craft
        </h2>
        <span className="text-[11px] font-mono theme-text-faint">TypeScript • Production Patterns</span>
      </div>

      <SpotlightCard className="p-0 border theme-border overflow-hidden">
        {/* Code Tabs Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--subtle-bg)] border-b theme-border flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {SNIPPETS.map((snippet) => (
              <button
                key={snippet.id}
                onClick={() => {
                  setActiveTab(snippet.id);
                }}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                  activeTab === snippet.id
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'theme-subtle hover:theme-text-title'
                }`}
              >
                {snippet.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded theme-subtle text-xs font-mono transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Description */}
        <div className="px-4 py-2 bg-[var(--card-bg)] border-b theme-border text-xs theme-text-muted flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0" />
          <span className="leading-relaxed">{currentSnippet.description}</span>
        </div>

        {/* Code Body - Sleek Dark Dev Box with High-Contrast Tokens */}
        <div className="p-4 bg-zinc-950 dark:bg-black/90 overflow-x-auto custom-scrollbar font-mono text-xs leading-relaxed text-zinc-200 border-t theme-border select-text">
          <pre>
            <code>{currentSnippet.code}</code>
          </pre>
        </div>
      </SpotlightCard>
    </section>
  );
};
