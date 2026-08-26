import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, FolderGit2, Briefcase, Code, BookOpen, User, Calendar, Mail, FileText, ExternalLink, X } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalModal: () => void;
  onOpenResume: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenCalModal, onOpenResume }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Define commands
  const commands = [
    { id: 'sec-hero', category: 'Navigation', label: 'Go to Hero / Profile', icon: User, action: () => scrollToSection('hero') },
    { id: 'sec-exp', category: 'Navigation', label: 'Go to Work Experience', icon: Briefcase, action: () => scrollToSection('experience') },
    { id: 'sec-proj', category: 'Navigation', label: 'Go to Featured Projects', icon: FolderGit2, action: () => scrollToSection('projects') },
    { id: 'sec-gh', category: 'Navigation', label: 'Go to GitHub Activity', icon: Code, action: () => scrollToSection('github') },
    { id: 'sec-skills', category: 'Navigation', label: 'Go to Skills Matrix', icon: Code, action: () => scrollToSection('skills') },
    { id: 'sec-blog', category: 'Navigation', label: 'Go to Technical Articles', icon: BookOpen, action: () => scrollToSection('blog') },

    // Quick Actions
    { id: 'act-cal', category: 'Actions', label: 'Book an Intro Call (Cal.com)', icon: Calendar, action: () => { onClose(); onOpenCalModal(); } },
    { id: 'act-mail', category: 'Actions', label: `Send Email (${PERSONAL_INFO.email})`, icon: Mail, action: () => { window.location.href = `mailto:${PERSONAL_INFO.email}`; } },
    { id: 'act-resume', category: 'Actions', label: 'View & Download Resume', icon: FileText, action: () => { onClose(); onOpenResume(); } },

    // Projects
    ...PROJECTS.map(p => ({
      id: `proj-${p.id}`,
      category: 'Projects',
      label: `Project: ${p.title} — ${p.tagline}`,
      icon: ExternalLink,
      action: () => {
        if (p.demoUrl) window.open(p.demoUrl, '_blank');
        else scrollToSection('projects');
      }
    })),

    // Social Links
    { id: 'soc-gh', category: 'Social Links', label: 'GitHub Profile', icon: ExternalLink, action: () => window.open(PERSONAL_INFO.socials.github, '_blank') },
    { id: 'soc-tw', category: 'Social Links', label: 'Twitter / X Profile', icon: ExternalLink, action: () => window.open(PERSONAL_INFO.socials.twitter, '_blank') },
    { id: 'soc-li', category: 'Social Links', label: 'LinkedIn Profile', icon: ExternalLink, action: () => window.open(PERSONAL_INFO.socials.linkedin, '_blank') },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const scrollToSection = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-xl theme-card-solid shadow-2xl overflow-hidden flex flex-col max-h-[75vh] animate-in zoom-in-95 duration-150">

        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b theme-border bg-[var(--subtle-bg)]">
          <Search className="w-4 h-4 text-indigo-500 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent theme-text-title placeholder:theme-text-faint text-sm focus:outline-none font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 theme-text-faint hover:theme-text-title mr-2 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block font-mono text-[10px] theme-subtle px-2 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="overflow-y-auto p-2 divide-y theme-border">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-sm theme-text-faint">
              No commands found matching "{query}"
            </div>
          ) : (
            filteredCommands.reduce<React.ReactNode[]>((acc, cmd, index) => {
              const isSelected = index === selectedIndex;
              const Icon = cmd.icon;
              const prevCmd = filteredCommands[index - 1];
              const showCategoryHeader = !prevCmd || prevCmd.category !== cmd.category;

              if (showCategoryHeader) {
                acc.push(
                  <div key={`cat-${cmd.category}`} className="px-3 pt-3 pb-1 text-[11px] font-mono uppercase tracking-wider theme-text-faint">
                    {cmd.category}
                  </div>
                );
              }

              acc.push(
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium text-left transition-all cursor-pointer ${isSelected
                      ? 'bg-indigo-500/15 text-indigo-400 font-semibold border border-indigo-500/40 shadow-sm'
                      : 'theme-text-muted hover:bg-[var(--subtle-bg)] hover:theme-text-title'
                    }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-indigo-500' : 'theme-text-faint'}`} />
                    <span className="truncate">{cmd.label}</span>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-1 text-[10px] text-indigo-500 font-mono flex-shrink-0">
                      <span>Select</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );

              return acc;
            }, [])
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 border-t theme-border bg-[var(--bg-page)] flex items-center justify-between text-[11px] theme-text-faint">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 theme-subtle rounded font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 theme-subtle rounded font-mono">↓</kbd>
              <span className="ml-0.5">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 theme-subtle rounded font-mono">↵</kbd>
              <span className="ml-0.5">Open</span>
            </span>
          </div>
          <span className="font-mono text-indigo-500">Command Palette</span>
        </div>
      </div>
    </div>
  );
};
