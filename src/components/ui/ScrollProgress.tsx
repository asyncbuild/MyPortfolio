import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2.5px] pointer-events-none bg-transparent">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-400 shadow-sm"
        style={{ scaleX }}
      />
    </div>
  );
};
