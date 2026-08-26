import React, { useState, useEffect } from 'react';
import { Command, Menu, X, Circle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Index', href: '#hero' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Open Source', href: '#github' },
    { name: 'Skills', href: '#skills' },
    { name: 'Blog', href: '#blog' },
    { name: 'Highlights', href: '#highlights' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(l => l.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo / Name Badge */}
        <a
          href="#hero"
          className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-header border border-[#27272a] text-white hover:border-indigo-500/50 transition-all duration-300 group shadow-lg"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-[11px] font-bold text-black group-hover:scale-105 transition-transform">
            AS
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#f4f4f5] group-hover:text-white">
            {PERSONAL_INFO.name.split(' ')[0]}
          </span>
          <span className="text-xs text-[#a1a1aa] font-mono hidden sm:inline">.dev</span>
        </a>

        {/* Desktop Navigation Pill */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full glass-header border border-[#27272a] shadow-xl">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#27272a] text-white shadow-inner font-semibold'
                    : 'text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#18181c]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          
          {/* Live Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full glass-header border border-[#27272a] text-xs font-medium text-[#a1a1aa]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[#f4f4f5] text-[12px]">{PERSONAL_INFO.statusText}</span>
          </div>

          {/* Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-2 rounded-full glass-header border border-[#27272a] text-xs font-medium text-[#a1a1aa] hover:text-white hover:border-indigo-500/50 hover:bg-[#18181c] transition-all shadow-lg group"
            title="Open Command Palette (Ctrl+K or ⌘K)"
          >
            <Command className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline font-mono text-[11px] bg-[#27272a] text-[#f4f4f5] px-1.5 py-0.5 rounded border border-[#3f3f46]">
              ⌘K
            </span>
          </button>

          {/* Mobile Menu Toggler */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full glass-header border border-[#27272a] text-[#f4f4f5] hover:bg-[#18181c] transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 max-w-6xl mx-auto rounded-2xl glass-modal border border-[#27272a] p-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#a1a1aa] hover:text-white hover:bg-[#18181c] transition-colors flex items-center justify-between"
              >
                {link.name}
                <span className="text-xs text-[#71717a] font-mono">→</span>
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-[#27272a] flex items-center justify-between px-4 text-xs">
              <span className="text-[#a1a1aa] flex items-center gap-2">
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
                {PERSONAL_INFO.statusText}
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="text-indigo-400 font-mono flex items-center gap-1 font-medium"
              >
                <Command className="w-3 h-3" /> ⌘K Search
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
