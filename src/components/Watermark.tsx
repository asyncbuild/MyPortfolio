import React from 'react';

interface WatermarkProps {
  theme: 'dark' | 'light';
}

export const Watermark: React.FC<WatermarkProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 flex items-center justify-center">
      
      {/* Aesthetic High-Fashion Typographic "D R" Watermark */}
      <div
        className="w-full max-w-5xl flex items-center justify-center transition-opacity duration-500 select-none px-4"
        style={{
          opacity: isDark ? 0.045 : 0.035,
        }}
      >
        <div
          className="flex items-center justify-center gap-6 sm:gap-14 md:gap-20 lg:gap-28 text-[110px] sm:text-[220px] md:text-[320px] lg:text-[420px] font-bold leading-none select-none tracking-normal"
          style={{
            fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Instrument Serif', Georgia, serif",
            color: isDark ? '#ffffff' : '#000000',
            letterSpacing: '0.02em',
          }}
        >
          <span className="select-none">D</span>
          <span className="select-none">R</span>
        </div>
      </div>

      {/* Subtle Vertical Signature along Left Margin */}
      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 opacity-20 hover:opacity-60 transition-opacity duration-300">
        <span
          className="text-[9px] tracking-[0.35em] uppercase [writing-mode:vertical-lr] rotate-180 theme-text-faint font-semibold"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          DEEPESH REDDY
        </span>
        <div className="w-[1px] h-10 bg-neutral-600 dark:bg-neutral-700" />
      </div>

    </div>
  );
};
