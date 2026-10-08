import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles, Copy } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'copy';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info' | 'copy') => void;
  copyToClipboard: (text: string, label?: string) => Promise<void>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'copy' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev.slice(-2), { id, message, type }]); // Keep max 3

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const copyToClipboard = useCallback(
    async (text: string, label: string = 'Copied to clipboard!') => {
      try {
        await navigator.clipboard.writeText(text);
        showToast(label, 'copy');
      } catch {
        showToast('Failed to copy', 'info');
      }
    },
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, copyToClipboard }}>
      {children}
      {/* Dynamic Island Floating Toasts Container */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/90 dark:bg-zinc-900/95 text-white border border-white/15 dark:border-zinc-700/80 shadow-2xl backdrop-blur-xl text-xs sm:text-sm font-medium tracking-tight"
            >
              {toast.type === 'copy' ? (
                <Copy className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
              ) : toast.type === 'success' ? (
                <CheckCircle className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
              )}
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
