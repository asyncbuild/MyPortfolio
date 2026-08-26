import React, { useState, Component } from 'react';
import type { ReactNode } from 'react';
import { GitPullRequest, GitMerge, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import { GithubIcon } from './SocialIcons';
import { OPEN_SOURCE_PRS, PERSONAL_INFO } from '../data/portfolioData';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackYear: number;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CalendarErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.fallbackYear !== this.props.fallbackYear && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-8 text-center text-[#71717a] font-mono text-xs flex flex-col items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <span>No contribution data recorded for {this.props.fallbackYear}.</span>
        </div>
      );
    }
    return this.props.children;
  }
}

export const GithubActivity: React.FC = () => {
  const [prFilter, setPrFilter] = useState<'All' | 'Merged' | 'Open'>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'last'>('last');

  const filteredPRs = OPEN_SOURCE_PRS.filter((pr) => {
    if (prFilter === 'Merged') return pr.status === 'merged';
    if (prFilter === 'Open') return pr.status === 'open';
    return true;
  });

  // Custom theme matching GitHub's dark theme colors
  const githubDarkTheme = {
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  };

  const currentYear = new Date().getFullYear();
  const availableYears: (number | 'last')[] = ['last', currentYear, currentYear - 1];

  return (
    <section id="opensource" className="py-2 relative space-y-6">
      
      {/* 1. Contribution Graph Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md theme-subtle shadow-inner">
            <GithubIcon className="w-5 h-5 theme-text-title" />
          </div>
          <div>
            <h2 className="text-2xl font-bold theme-text-title tracking-tight flex items-center gap-2">
              GitHub Contributions
              <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
            </h2>
            <p className="text-xs theme-text-faint font-mono">
              Live activity for{' '}
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-500 hover:underline font-semibold"
              >
                @asyncbuild
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Year selector pills */}
          <div className="flex items-center gap-1 p-0.5 theme-subtle rounded-md">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-2.5 py-1 rounded-sm text-xs font-mono font-medium transition-all cursor-pointer ${
                  selectedYear === year
                    ? 'bg-neutral-800 text-white dark:bg-[#27272a] shadow-sm font-semibold'
                    : 'theme-text-faint hover:theme-text-title'
                }`}
              >
                {year === 'last' ? 'Recent' : year}
              </button>
            ))}
          </div>

          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-md theme-subtle text-xs font-mono transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 2. Interactive GitHub Contribution Calendar Card */}
      <div className="p-4 sm:p-6 rounded-lg theme-card shadow-sm backdrop-blur-sm relative overflow-hidden group">
        <div className="w-full flex justify-start sm:justify-center text-xs theme-text-muted overflow-x-auto py-1 max-w-full">
          <CalendarErrorBoundary fallbackYear={typeof selectedYear === 'number' ? selectedYear : currentYear}>
            <GitHubCalendar
              username="asyncbuild"
              year={selectedYear}
              colorScheme="dark"
              theme={githubDarkTheme}
              blockSize={12}
              blockMargin={3.5}
              fontSize={12}
              showWeekdayLabels
              throwOnError={false}
              transformData={(data) => data.slice(-245)}
              labels={{
                totalCount: '{{count}} contributions in recent months',
              }}
            />
          </CalendarErrorBoundary>
        </div>
      </div>

      {/* 3. Open Source PRs Sub-Section Header */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <h3 className="text-lg font-bold theme-text-title tracking-tight">
          Featured Pull Requests
        </h3>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-0.5 theme-subtle rounded-md">
          {(['All', 'Merged', 'Open'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setPrFilter(filter)}
              className={`px-2.5 py-1 rounded-sm text-xs font-mono font-medium transition-all cursor-pointer ${
                prFilter === filter
                  ? 'bg-neutral-800 text-white dark:bg-[#27272a] shadow-sm font-semibold'
                  : 'theme-text-faint hover:theme-text-title'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 4. PR List View */}
      <div className="space-y-2.5">
        {filteredPRs.map((pr) => (
          <a
            key={pr.id}
            href={pr.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg theme-card transition-all duration-200 gap-3 select-none"
          >
            <div className="flex items-start gap-3">
              <div className="pt-0.5">
                {pr.status === 'merged' ? (
                  <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30" title="Merged">
                    <GitMerge className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" title="Open">
                    <GitPullRequest className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md theme-subtle text-[10px] font-mono theme-text-title font-semibold">
                    {pr.repo}
                  </span>
                  <span className="text-xs font-mono theme-text-faint">#{pr.prNumber}</span>
                  <span className="text-xs theme-text-faint font-mono">• {pr.mergedDate}</span>
                </div>

                <h4 className="text-sm font-semibold theme-text-title transition-colors mt-1">
                  {pr.title}
                </h4>

                <p className="text-xs theme-text-muted mt-0.5 line-clamp-1">
                  {pr.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-emerald-500 font-medium">+{pr.additions}</span>
                <span className="text-rose-500 font-medium">-{pr.deletions}</span>
              </div>

              <ExternalLink className="w-3.5 h-3.5 theme-text-faint group-hover:theme-text-title transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

