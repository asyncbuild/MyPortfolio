import React from 'react';

interface IndexSidebarProps {
  activeSection: string;
}

export const IndexSidebar: React.FC<IndexSidebarProps> = ({ activeSection }) => {
  const indexItems = [
    { id: 'hero', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'opensource', label: 'Open Source' },
    { id: 'skills', label: 'Skills' },
    { id: 'blog', label: 'Blog' },
    { id: 'highlights', label: 'Highlights' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 40;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside className="hidden lg:block fixed right-6 xl:left-[calc(50%+25rem)] 2xl:left-[calc(50%+29rem)] top-1/2 -translate-y-1/2 z-30 w-36 xl:w-40 shrink-0 select-none">
      <div className="py-2">
        <h4 className="text-[11px] font-mono font-semibold tracking-widest theme-text-faint uppercase mb-4 pl-1 opacity-70">
          INDEX
        </h4>

        <nav className="relative flex flex-col space-y-2.5">
          {indexItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group flex items-center gap-2 text-xs font-mono text-left transition-all duration-200 select-none cursor-pointer pl-1 ${
                  isActive
                    ? 'theme-text-title font-semibold translate-x-1'
                    : 'theme-text-faint hover:theme-text-title hover:translate-x-0.5'
                }`}
              >
                {isActive ? (
                  <span className="theme-text-title font-bold select-none">—</span>
                ) : (
                  <span className="w-2 opacity-0 group-hover:opacity-50 transition-opacity">—</span>
                )}
                <span className="tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

