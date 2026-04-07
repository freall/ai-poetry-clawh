import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

interface ExpGainToastProps {
  amount: number;
  onClose: () => void;
  duration?: number;
}

export const ExpGainToast: React.FC<ExpGainToastProps> = ({
  amount,
  onClose,
  duration = 2000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold)] text-[var(--ink-primary)] px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="text-lg font-bold">+{amount} 经验</span>
            <button
              onClick={() => {
                setIsVisible(false);
                onClose();
              }}
              className="ml-2 p-1 hover:bg-[var(--gold-dark)]/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
