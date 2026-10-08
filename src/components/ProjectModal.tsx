import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Share2,
  Layers,
  BookOpen,
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { ProjectItem } from '../types/portfolio';
import { useToast } from '../context/ToastContext';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { copyToClipboard } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'casestudy' | 'stack'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setActiveTab('overview');
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleShare = () => {
    const url = project.demoUrl || project.githubUrl || window.location.href;
    copyToClipboard(url, `Copied link to ${project.title}!`);
  };

  const hasCaseStudy = !!project.architecture;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-3xl lg:max-w-4xl max-h-[92vh] overflow-y-auto theme-card-solid rounded-2xl border theme-border shadow-2xl z-10 custom-scrollbar flex flex-col"
        >
          {/* Header Media (Automatically Responsive Browser Embed or Preview Image) */}
          {project.embedUrl || project.mediaType === 'iframe' ? (
            <div className="relative w-full bg-zinc-950 overflow-hidden border-b theme-border shrink-0 flex flex-col">
              {/* Clean Browser Toolbar */}
              <div className="h-9 sm:h-10 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-3 sm:px-4 shrink-0 z-20">
                {/* Traffic lights + URL */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{project.embedUrl || project.demoUrl}</span>
                  </div>
                </div>

                {/* Open in New Tab + Close */}
                <div className="flex items-center gap-2">
                  <a
                    href={project.embedUrl || project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
                  >
                    <span>Open Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Automatically Responsive Live Iframe Viewport */}
              <div className="w-full h-[360px] sm:h-[420px] md:h-[480px] relative bg-white overflow-hidden">
                <iframe
                  src={project.embedUrl || project.demoUrl}
                  title={project.title}
                  className="w-full h-full border-0 bg-white"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          ) : project.previewImage ? (
            <div className="relative w-full h-44 sm:h-56 bg-zinc-950 overflow-hidden border-b theme-border shrink-0">
              <img
                src={project.previewImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-zinc-900/90 backdrop-blur-md text-zinc-200 border border-zinc-700/70 flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/90" />
                  {project.status}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : null}

          {/* Modal Header & Navigation Bar */}
          <div className="p-5 sm:p-7 pb-3 border-b theme-border space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold theme-text-title tracking-tight flex items-center gap-2">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm theme-text-muted mt-0.5 font-medium">{project.tagline}</p>
                {project.metrics && (
                  <p className="text-xs font-mono text-zinc-300 dark:text-zinc-300 mt-2 flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    {project.metrics}
                  </p>
                )}
              </div>

              <button
                onClick={handleShare}
                className="p-2 rounded-md theme-subtle text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                title="Share Project"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-1.5 pt-1 border-t theme-border font-mono text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Overview
              </button>
              {hasCaseStudy && (
                <button
                  onClick={() => setActiveTab('casestudy')}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'casestudy'
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Case Study</span>
                </button>
              )}
              <button
                onClick={() => setActiveTab('stack')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'stack'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Tech Stack
              </button>
            </div>
          </div>

          {/* Modal Body Tabs */}
          <div className="p-5 sm:p-7 space-y-6 flex-1">
            {/* ================= TAB 1: OVERVIEW ================= */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider theme-text-faint">About the Project</h3>
                  <p className="text-xs sm:text-sm theme-text-body leading-relaxed">{project.description}</p>
                </div>

                {/* Highlights List */}
                <div className="space-y-2.5 p-4 rounded-lg bg-[var(--subtle-bg)] border theme-border">
                  <h4 className="text-xs font-semibold theme-text-title">Key Highlights</h4>
                  <ul className="space-y-1.5 text-xs theme-text-muted">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">Production-ready distributed architecture engineered for high concurrency.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">Optimized bundle performance, zero layout shift (CLS), and sub-50ms latency.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">Integrated dark / light mode theming, fluid typography, and clean micro-interactions.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* ================= TAB 2: CASE STUDY ================= */}
            {activeTab === 'casestudy' && project.architecture && (
              <div className="space-y-4">
                {/* Metric Badge if available */}
                {project.architecture.keyMetric && (
                  <div className="flex items-center justify-between pb-2 border-b theme-border font-mono text-xs">
                    <span className="theme-text-faint">Case Study Highlight</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      ⚡ {project.architecture.keyMetric}
                    </span>
                  </div>
                )}

                {/* 1. The Pain Point */}
                <div className="p-4 rounded-xl bg-zinc-900/40 border theme-border space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>The Problem &amp; Pain Point</span>
                  </div>
                  <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                    {project.architecture.painPoint}
                  </p>
                </div>

                {/* 2. What We Solved */}
                <div className="p-4 rounded-xl bg-zinc-900/40 border theme-border space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>What We Solved</span>
                  </div>
                  <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                    {project.architecture.whatWeSolved}
                  </p>
                </div>

                {/* 3. How We Solved It */}
                <div className="p-4 rounded-xl bg-zinc-900/40 border theme-border space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>How We Solved It (Technical Architecture)</span>
                  </div>
                  <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                    {project.architecture.howWeSolved}
                  </p>
                </div>
              </div>
            )}

            {/* ================= TAB 3: TECH STACK ================= */}
            {activeTab === 'stack' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider theme-text-faint flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-zinc-400" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-mono theme-subtle font-medium text-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-zinc-900/40 border theme-border text-xs theme-text-muted space-y-2 leading-relaxed">
                  <p>
                    Engineered with modern frontend components, high-efficiency build pipelines, and production-grade state management for snappy and seamless user interactions.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t theme-border">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] px-4 py-2.5 rounded-lg theme-btn-primary font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] px-4 py-2.5 rounded-lg theme-subtle font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
