import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Hammer, Lock, Sparkles, Database } from 'lucide-react';
import { PROJECTS, ALL_PROJECTS_COUNT } from '../data/portfolioData';
import { SpotlightCard } from './ui/SpotlightCard';
import type { ProjectItem } from '../types/portfolio';

interface ProjectsProps {
  onSelectProject?: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4);

  return (
    <section id="projects" className="py-2 relative space-y-4">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold theme-text-title tracking-tight flex items-center gap-2">
          <span>Projects</span>
          <span className="text-xs font-mono font-normal px-2 py-0.5 rounded theme-subtle">
            {PROJECTS.length} Featured
          </span>
        </h2>
        <span className="text-xs font-mono theme-text-faint hidden sm:inline">
          Click card for deep dive
        </span>
      </div>

      {/* Clean Streamlined Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedProjects.map((project) => {
          const isLive = project.status === 'Live';

          return (
            <SpotlightCard
              key={project.id}
              onClick={() => {
                if (!isLive) return;
                if (onSelectProject) {
                  onSelectProject(project);
                }
              }}
              className={`p-4 sm:p-5 flex flex-col justify-between group rounded-xl border theme-border transition-all duration-200 ${
                isLive
                  ? 'cursor-pointer hover:border-neutral-400 dark:hover:border-zinc-700'
                  : 'cursor-default border-dashed opacity-90 select-none'
              }`}
              spotlightColor={isLive ? "rgba(99, 102, 241, 0.08)" : "transparent"}
            >
              <div className="space-y-3.5">
                {/* Clean Media Preview Area */}
                <div className="relative w-full h-40 sm:h-44 rounded-lg bg-zinc-950/80 border theme-border overflow-hidden flex items-center justify-center">
                  {project.id === 'proj-whispr' ? (
                    /* Clean WhisprLive Brand Showcase */
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950/40 relative overflow-hidden">
                      {/* Subtle Ambient Radial Glow */}
                      <div className="absolute inset-0 bg-radial from-blue-600/10 via-transparent to-transparent pointer-events-none" />

                      <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
                        <img
                          src="/whisprlive-logo.png"
                          alt="WhisprLive Logo"
                          className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-[0_6px_14px_rgba(37,99,235,0.3)] transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1">
                          Whispr<span className="text-blue-400">Live</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          Sub-50ms Real-Time Platform
                        </span>
                      </div>
                    </div>
                  ) : project.id === 'proj-pulse' ? (
                     /* Clean GitHub Pulse Data Pipeline Brand Card */
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 relative overflow-hidden">
                      <div className="absolute inset-0 bg-radial from-emerald-600/10 via-transparent to-transparent pointer-events-none" />

                      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md transition-transform duration-300 group-hover:scale-110">
                          <Database className="w-5 h-5" />
                        </div>
                        <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 font-mono">
                          GitHub <span className="text-emerald-400 font-sans">Pulse</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-300/90">
                          <span>Airflow</span>
                          <span>•</span>
                          <span>PySpark</span>
                          <span>•</span>
                          <span>pgvector RAG</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Standard High-Quality Screenshot for Other Projects */
                    <div className="w-full h-full relative overflow-hidden bg-zinc-950">
                      <img
                        src={project.previewImage}
                        alt={project.title}
                        className={`w-full h-full object-cover object-center transition-all duration-500 ${
                          isLive
                            ? 'group-hover:scale-105 opacity-90 group-hover:opacity-100'
                            : 'filter blur-[7px] scale-110 opacity-30 select-none'
                        }`}
                      />
                    </div>
                  )}

                  {/* "In Progress / Building" Frosted Glass Overlay Badge */}
                  {!isLive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 bg-black/40 backdrop-blur-[2px] z-10 select-none">
                      <div className="px-3 py-1 rounded-md bg-neutral-900/90 border border-amber-500/40 text-amber-300 text-xs font-mono flex items-center gap-1.5 shadow-xl">
                        <Hammer className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                        <span className="font-semibold">Building in Progress</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title & Status Row */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold theme-text-title group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                      <span>{project.title}</span>
                      {!isLive && (
                        <Lock className="w-3.5 h-3.5 theme-text-faint inline" />
                      )}
                    </h3>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${
                        isLive
                          ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isLive ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      {project.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs theme-text-muted leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Clean Footer Row: Tech Tags & Details Link */}
              <div className="mt-4 pt-3 border-t theme-border flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1">
                  {project.tags.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded theme-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] font-mono theme-text-faint px-1">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {isLive ? (
                  <span className="text-xs font-mono theme-text-faint group-hover:theme-text-title font-medium flex items-center gap-0.5 transition-colors">
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                ) : (
                  <div className="text-xs font-mono theme-text-faint flex items-center gap-1 select-none opacity-80">
                    <span>Coming Soon</span>
                    <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                  </div>
                )}
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Bottom "View All" Button */}
      {ALL_PROJECTS_COUNT > 4 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 rounded-lg theme-subtle text-xs font-mono font-medium transition-all duration-150 flex items-center gap-2 shadow-xs cursor-pointer active:scale-[0.98]"
          >
            {showAll ? 'Show Less' : `View All (${ALL_PROJECTS_COUNT})`}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </section>
  );
};
