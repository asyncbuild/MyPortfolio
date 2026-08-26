import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Hammer, Lock, Sparkles } from 'lucide-react';
import { PROJECTS, ALL_PROJECTS_COUNT } from '../data/portfolioData';

// SVG Tech Icons matching screenshot 3
const TechIcon: React.FC<{ name: string }> = ({ name }) => {
  const n = name.toLowerCase();
  if (n.includes('next')) {
    return (
      <span className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-white" title="Next.js">
        N
      </span>
    );
  }
  if (n.includes('react')) {
    return (
      <span className="w-5 h-5 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 font-bold" title="React">
        ⚛
      </span>
    );
  }
  if (n.includes('ts') || n.includes('typescript')) {
    return (
      <span className="w-5 h-5 rounded bg-blue-950 border border-blue-500/30 flex items-center justify-center text-[9px] text-blue-400 font-bold font-mono" title="TypeScript">
        TS
      </span>
    );
  }
  if (n.includes('tailwind')) {
    return (
      <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-500/30 flex items-center justify-center text-[10px] text-sky-400" title="Tailwind CSS">
        ≈
      </span>
    );
  }
  if (n.includes('motion') || n.includes('framer')) {
    return (
      <span className="w-5 h-5 rounded bg-purple-950 border border-purple-500/30 flex items-center justify-center text-[10px] text-purple-400 font-bold" title="Framer Motion">
        ▲
      </span>
    );
  }
  if (n.includes('python')) {
    return (
      <span className="w-5 h-5 rounded bg-amber-950 border border-amber-500/30 flex items-center justify-center text-[10px] text-amber-400 font-bold" title="Python">
        🐍
      </span>
    );
  }
  return (
    <span className="w-5 h-5 rounded bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[9px] text-neutral-300 font-mono" title={name}>
      {name.substring(0, 2).toUpperCase()}
    </span>
  );
};

export const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4);

  return (
    <section id="projects" className="py-2 relative">
      {/* Section Title */}
      <h2 className="text-2xl font-bold theme-text-title tracking-tight mb-5">
        Projects
      </h2>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedProjects.map((project) => {
          const isLive = project.status === 'Live';

          return (
            <div
              key={project.id}
              className={`rounded-lg theme-card p-5 flex flex-col justify-between transition-all duration-200 group relative ${!isLive ? 'border-dashed opacity-90' : ''
                }`}
            >
              <div>
                {/* Media Preview Box (Blurred when Building / In Progress) */}
                <div className="relative w-full h-44 sm:h-48 rounded-md bg-black theme-border border overflow-hidden mb-4 group-hover:border-neutral-500 transition-colors">

                  {/* Preview Image with conditional Blur */}
                  <img
                    src={project.previewImage}
                    alt={project.title}
                    className={`w-full h-full object-cover object-center transition-all duration-500 ${isLive
                      ? 'group-hover:scale-105 opacity-90 group-hover:opacity-100'
                      : 'filter blur-[7px] scale-110 opacity-40 select-none'
                      }`}
                  />

                  {/* Subtle Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 pointer-events-none" />

                  {/* "In Progress / Building" Frosted Glass Overlay Badge */}
                  {!isLive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] z-10 select-none">
                      <div className="px-3 py-1.5 rounded-md bg-neutral-900/90 dark:bg-black/80 border border-amber-500/40 text-amber-300 text-xs font-mono flex items-center gap-2 shadow-2xl animate-in zoom-in duration-300">
                        <Hammer className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                        <span className="font-semibold tracking-tight">Building in Progress</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 mt-1.5 drop-shadow-md">
                        Reveals once hosted & live
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Status Pill */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-bold theme-text-title transition-colors flex items-center gap-2">
                    {project.title}
                    {!isLive && (
                      <span title="Building in progress">
                        <Lock className="w-3.5 h-3.5 theme-text-faint inline" />
                      </span>
                    )}
                  </h3>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${isLive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'
                        }`}
                    />
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs theme-text-muted leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Footer Row: Tech Icons & View Project Link */}
              <div className="pt-3 border-t theme-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {project.tags.slice(0, 5).map((tech) => (
                    <TechIcon key={tech} name={tech} />
                  ))}
                </div>

                {isLive ? (
                  <a
                    href={project.demoUrl || project.githubUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono theme-text-muted hover:theme-text-title flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                  >
                    View Project
                    <ExternalLink className="w-3 h-3 theme-text-faint" />
                  </a>
                ) : (
                  <div
                    className="text-xs font-mono theme-text-faint flex items-center gap-1 cursor-not-allowed select-none opacity-80"
                    title="This project is currently being built"
                  >
                    <span>Launching Soon</span>
                    <Sparkles className="w-3 h-3 text-amber-500/80" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom "View All" Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-2 rounded-md theme-subtle text-xs font-mono font-medium transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
        >
          {showAll ? 'Show Less' : `View All (${ALL_PROJECTS_COUNT} more)`}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </section>
  );
};
