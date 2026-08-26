import React, { useState } from 'react';
import { ChevronDown, MapPin, ExternalLink } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

// Icons / Logos for Experience Cards
const OrgLogo: React.FC<{ company: string }> = ({ company }) => {
  if (company.includes('EY')) {
    return (
      <div className="w-10 h-10 rounded-md bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-black text-sm tracking-wider flex-shrink-0 shadow-sm">
        EY
      </div>
    );
  }
  if (company.includes('Liberalty')) {
    return (
      <div className="w-10 h-10 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs flex-shrink-0 shadow-sm">
        LC
      </div>
    );
  }
  if (company.includes('Linux')) {
    return (
      <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-cyan-950 to-blue-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-base flex-shrink-0">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19 8v8l-7 3.5L5 16V8l7-3.2z" />
        </svg>
      </div>
    );
  }
  if (company.includes('Google') || company.includes('Summer')) {
    return (
      <div className="w-10 h-10 rounded-md bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-base flex-shrink-0">
        <svg className="w-6 h-6 fill-current text-amber-400" viewBox="0 0 24 24">
          <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2z" />
        </svg>
      </div>
    );
  }
  if (company.includes('Vercel')) {
    return (
      <div className="w-10 h-10 rounded-md bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white font-bold flex-shrink-0">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 1L24 22H0L12 1z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-md bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 font-bold flex-shrink-0">
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    </div>
  );
};

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>("exp-1");

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="py-2 relative">
      {/* Section Header */}
      <h2 className="text-2xl font-bold theme-text-title tracking-tight mb-5">
        Experience
      </h2>

      {/* Experience List Container */}
      <div className="space-y-3">
        {EXPERIENCES.map((exp) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div
              key={exp.id}
              className={`rounded-lg border transition-all duration-200 ${isExpanded
                  ? 'theme-card-solid border-neutral-400 dark:border-[#3f3f46] shadow-sm'
                  : 'theme-card'
                }`}
            >
              {/* Card Main Row */}
              <div
                onClick={() => toggleExpand(exp.id)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-3.5">
                  <OrgLogo company={exp.company} />
                  <div>
                    <h3 className="text-base font-bold theme-text-title tracking-tight flex items-center gap-2">
                      {exp.company}
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="theme-text-faint hover:theme-text-title transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm theme-text-muted font-medium mt-0.5">
                      {exp.role}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-xs theme-text-faint font-mono">
                      <span>{exp.period}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#71717a]" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="p-1 theme-text-faint hover:theme-text-title transition-colors mt-1 cursor-pointer">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 theme-text-title' : ''
                      }`}
                  />
                </button>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-3 border-t theme-border space-y-4 animate-in fade-in duration-150">

                  {/* Metric Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {exp.metricBadges.map((badge, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md theme-subtle text-[11px] font-mono"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 text-xs sm:text-sm theme-text-muted">
                    {exp.bulletPoints.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="theme-text-faint select-none mt-0.5">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md theme-subtle text-[11px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
