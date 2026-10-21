import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Mail,
  CheckCircle2,
  Sparkles,
  Zap,
  Bot,
  Database,
  Clock,
  Layers,
  ShieldCheck,
  ChevronDown,
  Code2,
  Copy,
  Check,
  Sun,
  Moon,
} from 'lucide-react';
import { PRICING_PLANS, FREELANCE_FAQS, PERSONAL_INFO } from '../data/portfolioData';
import type { PricingPlan } from '../types/portfolio';
import { useToast } from '../context/ToastContext';

interface PricingViewProps {
  onBack: () => void;
  onOpenCalModal: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  onBack,
  onOpenCalModal,
  theme = 'dark',
  onToggleTheme,
}) => {
  const { showToast } = useToast();
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [activeFilter, setActiveFilter] = useState<'all' | 'sprint' | 'retainer'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scope Estimator state
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    'frontend',
    'auth_db',
  ]);
  const [copiedQuote, setCopiedQuote] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Freelance Services & Transparent Pricing • Deepesh Reddy';
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.title = originalTitle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onBack]);

  const scopeOptions = [
    { id: 'frontend', name: 'Modern Responsive Frontend (React / Next.js / Tailwind)', priceUsd: 650, priceInr: 55000, days: 5 },
    { id: 'auth_db', name: 'Database Schema, Auth & REST/GraphQL API', priceUsd: 550, priceInr: 45000, days: 4 },
    { id: 'ai_llm', name: 'Custom AI Agent / LLM Integration / RAG Search', priceUsd: 850, priceInr: 72000, days: 6 },
    { id: 'data_pipeline', name: 'Automated Scraping / ETL Data Ingestion Pipeline', priceUsd: 750, priceInr: 62000, days: 5 },
    { id: 'payment', name: 'Stripe / Payment Processing Integration', priceUsd: 350, priceInr: 30000, days: 2 },
    { id: 'priority_rush', name: 'Priority Sprint Delivery (Expedited Turnaround)', priceUsd: 500, priceInr: 40000, days: -3 },
  ];

  const toggleScope = (id: string) => {
    setSelectedScopes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculatedEstimate = selectedScopes.reduce(
    (acc, id) => {
      const opt = scopeOptions.find((o) => o.id === id);
      if (opt) {
        acc.usd += opt.priceUsd;
        acc.inr += opt.priceInr;
        acc.days += opt.days;
      }
      return acc;
    },
    { usd: 0, inr: 0, days: 2 }
  );

  const estimatedDays = Math.max(5, calculatedEstimate.days);

  const handleCopyScopeSummary = () => {
    const selectedNames = selectedScopes
      .map((id) => scopeOptions.find((o) => o.id === id)?.name)
      .filter(Boolean);

    const summary = `Hi Deepesh,

I explored your pricing scope calculator on your portfolio and would like to discuss a project with this scope:
- Selected Modules:
${selectedNames.map((n) => `  • ${n}`).join('\n')}

- Estimated Scope: $${calculatedEstimate.usd.toLocaleString()} (~${estimatedDays} days)
- Best way to reach me: [Your Name & Contact]

Looking forward to your thoughts!`;

    navigator.clipboard.writeText(summary);
    setCopiedQuote(true);
    showToast('Quote proposal copied to clipboard!');
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  const handleEmailPlan = (plan: PricingPlan) => {
    const priceText =
      currency === 'USD'
        ? `$${plan.priceUsd.toLocaleString()}`
        : `₹${plan.priceInr.toLocaleString()}`;
    const body = encodeURIComponent(
      `Hi Deepesh,\n\nI'm interested in working together on the "${plan.name}" plan (${priceText} ${plan.period || ''}).\n\nProject details:\n- What I'm looking to build: \n- Target launch timeline: ${plan.timeline}\n- Additional requirements or questions: \n\nThanks!\n[Your Name]`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      plan.emailSubject
    )}&body=${body}`;
  };

  const filteredPlans = PRICING_PLANS.filter((plan) => {
    if (activeFilter === 'sprint') return plan.id !== 'dedicated-retainer';
    if (activeFilter === 'retainer') return plan.id === 'dedicated-retainer';
    return true;
  });

  const getTierIcon = (id: string) => {
    switch (id) {
      case 'mvp-sprint':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'ai-workflows':
        return <Bot className="w-5 h-5 text-indigo-400" />;
      case 'data-pipelines':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'dedicated-retainer':
        return <Layers className="w-5 h-5 text-amber-400" />;
      default:
        return <Code2 className="w-5 h-5 text-zinc-400" />;
    }
  };

  const getBadgeClasses = (variant?: string) => {
    switch (variant) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'indigo':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'cyan':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'amber':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30';
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Top Floating Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b theme-border">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg theme-subtle text-xs font-mono font-medium transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            title="Return to Home Portfolio (Esc)"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </button>

          <span className="text-xs theme-text-faint font-mono hidden sm:inline">
            / pricing
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Availability Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">2 Sprint Slots Open</span>
          </div>

          {/* Theme Toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg theme-subtle text-xs transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Freelance Engineering & Consulting Sprints</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight theme-text-title">
          Transparent, Fixed-Price Software Engineering
        </h1>

        <p className="text-sm sm:text-base theme-text-muted leading-relaxed">
          From rapid production MVPs and intelligent AI integrations to enterprise data pipelines.
          Zero agency overhead, no middle management, and 100% direct developer collaboration.
        </p>

        {/* Filters and Currency Toggle Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Filter Segment */}
          <div className="p-1 rounded-lg theme-subtle flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'theme-btn-primary shadow-xs'
                  : 'theme-text-muted hover:theme-text-title'
              }`}
            >
              All Offerings ({PRICING_PLANS.length})
            </button>
            <button
              onClick={() => setActiveFilter('sprint')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeFilter === 'sprint'
                  ? 'theme-btn-primary shadow-xs'
                  : 'theme-text-muted hover:theme-text-title'
              }`}
            >
              Fixed Sprints (3)
            </button>
            <button
              onClick={() => setActiveFilter('retainer')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeFilter === 'retainer'
                  ? 'theme-btn-primary shadow-xs'
                  : 'theme-text-muted hover:theme-text-title'
              }`}
            >
              Monthly Retainer (1)
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="p-1 rounded-lg theme-subtle flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'theme-text-muted hover:theme-text-title'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                currency === 'INR'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'theme-text-muted hover:theme-text-title'
              }`}
            >
              INR (₹)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 items-stretch">
        {filteredPlans.map((plan) => {
          const isPopular = plan.popular;
          const displayPrice =
            currency === 'USD'
              ? `$${plan.priceUsd.toLocaleString()}`
              : `₹${(plan.priceInr / 100000).toFixed(2)}L`;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                isPopular
                  ? 'theme-card ring-2 ring-indigo-500/50 shadow-xl lg:-translate-y-1'
                  : 'theme-card'
              }`}
            >
              {/* Popular Glow Indicator */}
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-[10px] font-mono font-semibold tracking-wider uppercase text-white shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{plan.badge || 'Most Popular'}</span>
                </div>
              )}

              {/* Card Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="p-2 rounded-xl theme-subtle">
                    {getTierIcon(plan.id)}
                  </div>
                  {!isPopular && plan.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${getBadgeClasses(
                        plan.badgeVariant
                      )}`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold theme-text-title tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-xs theme-text-muted mt-1 leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 border-t theme-border space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold tracking-tight theme-text-title font-mono">
                      {displayPrice}
                    </span>
                    <span className="text-xs theme-text-faint font-mono">
                      / {plan.period || 'project'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono theme-text-faint">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span>Timeline: {plan.timeline}</span>
                  </div>
                </div>

                {/* Ideal For Note */}
                <div className="p-2.5 rounded-lg theme-subtle text-[11px] leading-relaxed text-zinc-300 font-sans">
                  <span className="font-semibold text-zinc-100">Ideal for: </span>
                  <span className="theme-text-muted">{plan.idealFor}</span>
                </div>

                {/* Deliverables List */}
                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider theme-text-faint font-semibold">
                    What's included:
                  </p>
                  <ul className="space-y-2 text-xs theme-text-muted">
                    {plan.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer & CTAs */}
              <div className="pt-6 space-y-2 mt-4 border-t theme-border">
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {plan.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded theme-subtle theme-text-faint"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleEmailPlan(plan)}
                  className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-sm ${
                    isPopular
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-indigo-500/20 shadow-md'
                      : 'theme-btn-primary'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{plan.ctaText}</span>
                </button>

                <button
                  onClick={onOpenCalModal}
                  className="w-full py-2 px-3 rounded-lg theme-subtle text-[11px] font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer hover:theme-text-title"
                >
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>Book 20-min Intro Call</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Scope & Custom Estimate Calculator */}
      <div className="rounded-2xl theme-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b theme-border">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive Estimator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold theme-text-title tracking-tight">
              Build a Custom Scope
            </h2>
            <p className="text-xs sm:text-sm theme-text-muted mt-0.5">
              Select the building blocks you need to calculate an instant ballpark estimate.
            </p>
          </div>

          {/* Calculated Output Badge */}
          <div className="p-3 sm:p-4 rounded-xl theme-subtle flex items-center gap-4 shrink-0">
            <div>
              <p className="text-[10px] font-mono uppercase theme-text-faint">
                Estimated Investment
              </p>
              <p className="text-xl sm:text-2xl font-bold font-mono text-indigo-400">
                {currency === 'USD'
                  ? `$${calculatedEstimate.usd.toLocaleString()}`
                  : `₹${calculatedEstimate.inr.toLocaleString()}`}
              </p>
            </div>
            <div className="border-l theme-border pl-4">
              <p className="text-[10px] font-mono uppercase theme-text-faint">
                Estimated Turnaround
              </p>
              <p className="text-sm sm:text-base font-bold font-mono theme-text-title">
                ~{estimatedDays} Days
              </p>
            </div>
          </div>
        </div>

        {/* Checkbox Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scopeOptions.map((opt) => {
            const isSelected = selectedScopes.includes(opt.id);
            const priceLabel =
              currency === 'USD'
                ? `+$${opt.priceUsd}`
                : `+₹${opt.priceInr.toLocaleString()}`;

            return (
              <div
                key={opt.id}
                onClick={() => toggleScope(opt.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-indigo-500/50 bg-indigo-500/10'
                    : 'theme-border theme-subtle hover:theme-border-hover'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-zinc-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isSelected ? 'theme-text-title' : 'theme-text-muted'
                    }`}
                  >
                    {opt.name}
                  </span>
                </div>

                <span className="text-xs font-mono font-semibold text-indigo-400 shrink-0">
                  {priceLabel}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Button for Calculator */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs theme-text-faint font-mono">
            *Estimates are directional. Actual quote confirmed after scoping call.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopyScopeSummary}
              className="w-full sm:w-auto px-4 py-2 rounded-xl theme-subtle text-xs font-medium flex items-center justify-center gap-2 cursor-pointer hover:theme-text-title"
            >
              {copiedQuote ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Proposal Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Scope Draft</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenCalModal}
              className="w-full sm:w-auto px-4 py-2 rounded-xl theme-btn-primary font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Discuss Scope with Deepesh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Why Hire An Independent Engineer Section */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold theme-text-title tracking-tight">
            Why Work Directly With Me?
          </h2>
          <p className="text-xs sm:text-sm theme-text-muted">
            The speed of an individual senior contributor with enterprise standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl theme-card space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold theme-text-title">Zero Middlemen</h4>
            <p className="text-xs theme-text-muted leading-relaxed">
              No junior bait-and-switch. You communicate directly with the engineer architecting and writing every single line of code.
            </p>
          </div>

          <div className="p-5 rounded-xl theme-card space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold theme-text-title">AI & Data Depth</h4>
            <p className="text-xs theme-text-muted leading-relaxed">
              Backed by professional Data & AI engineering at EY GDS. Production vector search, LLM tool-calling, and scalable pipelines.
            </p>
          </div>

          <div className="p-5 rounded-xl theme-card space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold theme-text-title">Sprint Velocity</h4>
            <p className="text-xs theme-text-muted leading-relaxed">
              Ship MVPs in 10-14 days instead of waiting 4 months for agency bureaucracy. Daily commits, staging previews, and rapid feedback.
            </p>
          </div>

          <div className="p-5 rounded-xl theme-card space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold theme-text-title">100% IP Ownership</h4>
            <p className="text-xs theme-text-muted leading-relaxed">
              Zero vendor lock-in. Full GitHub repositories, environment configs, and clean documentation transferred to you upon completion.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold theme-text-title tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm theme-text-muted">
            Everything you need to know about starting a project.
          </p>
        </div>

        <div className="space-y-3">
          {FREELANCE_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl theme-card overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <span className="text-sm font-semibold theme-text-title">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 theme-text-faint transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm theme-text-muted leading-relaxed border-t theme-border animate-in fade-in duration-150">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Final CTA Banner */}
      <div className="rounded-2xl theme-card p-6 sm:p-10 text-center space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-emerald-500/10 pointer-events-none" />

        <div className="max-w-xl mx-auto space-y-3 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold theme-text-title tracking-tight">
            Ready to Build Your Project?
          </h3>
          <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
            Let's jump on a quick, zero-commitment 20-minute call to discuss your roadmap, or drop me an email with your specs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
          <button
            onClick={onOpenCalModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl theme-btn-primary font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a 20-Min Intro Call</span>
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Freelance%20Project%20Inquiry`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl theme-subtle font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:theme-text-title"
          >
            <Mail className="w-4 h-4" />
            <span>Email Me Directly</span>
          </a>
        </div>
      </div>
    </div>
  );
};
