import React, { useState } from 'react';
import { ChevronDown, MapPin, ExternalLink } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { SpotlightCard } from './ui/SpotlightCard';

// Clean Minimal Org Logo Badges with Subtle Brand Colors
const OrgLogo: React.FC<{ company: string }> = ({ company }) => {
  const c = company.toLowerCase();
  let label = company.substring(0, 2).toUpperCase();
  let colorClass = "bg-zinc-800 text-zinc-200 border-zinc-700";

  if (c.includes('ey')) {
    label = 'EY';
    colorClass = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  } else if (c.includes('freelance')) {
    label = 'FL';
    colorClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  } else if (c.includes('liberalty')) {
    label = 'LC';
    colorClass = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
  }

  return (
    <div className={`w-10 h-10 rounded-md border flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs select-none ${colorClass}`}>
      {label}
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
            <SpotlightCard
              key={exp.id}
              spotlightColor="rgba(99, 102, 241, 0.12)"
              className={`border transition-all duration-200 ${
                isExpanded
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
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
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
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 theme-text-title' : ''
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
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};

