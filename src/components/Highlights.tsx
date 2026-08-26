import React from 'react';
import { Award, Users, ShieldCheck } from 'lucide-react';
import { HIGHLIGHTS } from '../data/portfolioData';

export const Highlights: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mentorship': return <Users className="w-4 h-4 text-emerald-400" />;
      case 'Certification': return <ShieldCheck className="w-4 h-4 text-amber-400" />;
      default: return <Award className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <section id="highlights" className="py-2 relative">
      {/* Section Title */}
      <h2 className="text-2xl font-bold theme-text-title tracking-tight mb-5">
        Highlights & Awards
      </h2>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HIGHLIGHTS.map((item) => (
          <div
            key={item.id}
            className="rounded-lg theme-card p-5 flex flex-col justify-between transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md theme-subtle">
                    {getCategoryIcon(item.category)}
                  </div>
                  <span className="text-xs font-mono theme-text-faint">{item.category}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md theme-subtle text-[10px] font-mono">
                  {item.badgeText}
                </span>
              </div>

              <h3 className="text-base font-bold theme-text-title mb-1">
                {item.title}
              </h3>
              <div className="text-xs font-mono theme-text-muted mb-2">
                {item.organization} • <span className="theme-text-faint">{item.date}</span>
              </div>

              <p className="text-xs theme-text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
