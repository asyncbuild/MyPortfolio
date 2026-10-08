import { useState, useEffect } from 'react';
import { CommandPalette } from './components/CommandPalette';
import { CalModal } from './components/CalModal';
import { Hero } from './components/Hero';
import { Currently } from './components/Currently';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { CodeShowcase } from './components/CodeShowcase';
import { GithubActivity } from './components/GithubActivity';
import { IndexSidebar } from './components/IndexSidebar';
import { Footer } from './components/Footer';
import { ResumeView } from './components/ResumeView';
import { Watermark } from './components/Watermark';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { TerminalModal } from './components/TerminalModal';
import { ProjectModal } from './components/ProjectModal';
import { ToastProvider } from './context/ToastContext';
import type { ProjectItem } from './types/portfolio';

export function App() {
  const [sessionStartTime] = useState(() => Date.now());
  const [currentView, setCurrentView] = useState<'home' | 'resume'>('home');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [calModalOpen, setCalModalOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // Scroll Spy to activate current index section
  useEffect(() => {
    if (currentView !== 'home') return;
    const handleScroll = () => {
      const sectionIds = ['hero', 'currently', 'experience', 'skills', 'projects', 'showcase', 'opensource'];
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Global Keyboard Listener for ⌘K (Command Palette) and ⌘T (Terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is actively typing in an input or textarea
      const target = e.target as HTMLElement;
      const isInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;
      if (isInput) return;

      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && (e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToastProvider>
      <div className="font-sans antialiased min-h-screen selection:bg-white/20 selection:text-white bg-grid-dots relative overflow-x-hidden w-full max-w-full">
        {/* Top Reading Scroll Progress Bar */}
        <ScrollProgress />

        {/* Ambient Interactive "DR" Watermark */}
        <Watermark theme={theme} />

        {/* Soft Ambient Radial Glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent" />

        {currentView === 'resume' ? (
          <ResumeView
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            theme={theme}
            onToggleTheme={toggleTheme}
            sessionStartTime={sessionStartTime}
          />
        ) : (
          /* Centered Page Layout */
          <div className="w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto px-4 sm:px-6 xl:px-8 py-6 sm:py-12 relative">
            {/* Central Main Content Column */}
            <main className="w-full min-w-0 space-y-12 sm:space-y-16">
              <Hero
                onOpenCalModal={() => setCalModalOpen(true)}
                onOpenCommandPalette={() => setCommandPaletteOpen(true)}
                onOpenResume={() => {
                  setCurrentView('resume');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenTerminal={() => setTerminalOpen(true)}
                theme={theme}
                onToggleTheme={toggleTheme}
              />
              <Currently />
              <Experience />
              <Skills />
              <Projects onSelectProject={(project) => setSelectedProject(project)} />
              <CodeShowcase />
              <GithubActivity theme={theme} />
              <Footer />
            </main>

            {/* Right Floating Index Sidebar Navigation */}
            <IndexSidebar activeSection={activeSection} />
          </div>
        )}

        {/* Modals & Overlays */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenCalModal={() => setCalModalOpen(true)}
          onOpenResume={() => {
            setCurrentView('resume');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        <CalModal
          isOpen={calModalOpen}
          onClose={() => setCalModalOpen(false)}
        />

        <TerminalModal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onToggleTheme={toggleTheme}
        />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </ToastProvider>
  );
}

export default App;
