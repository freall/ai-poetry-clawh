import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw, ArrowRight, Star } from 'lucide-react';
import { cn } from '@/utils';

interface QuizResultProps {
  correctCount: number;
  totalCount: number;
  expGained: number;
  onRetry: () => void;
  onNext?: () => void;
  isPerfect: boolean;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  correctCount,
  totalCount,
  expGained,
  onRetry,
  onNext,
  isPerfect,
}) => {
  const percentage = Math.round((correctCount / totalCount) * 100);
  const isPass = percentage >= 60;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-[var(--bg-cream)] rounded-2xl p-8 text-center space-y-6"
    >
      {/* Trophy/Result Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="relative inline-block"
      >
        <div
          className={cn(
            'w-24 h-24 rounded-full flex items-center justify-center mx-auto',
            isPerfect
              ? 'bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)]'
              : isPass
              ? 'bg-gradient-to-br from-[var(--jade-light)] to-[var(--jade)]'
              : 'bg-gradient-to-br from-[var(--text-light)] to-[var(--ink-light)]'
          )}
        >
          {isPerfect ? (
            <Trophy className="w-12 h-12 text-white" />
          ) : isPass ? (
            <Star className="w-12 h-12 text-white" />
          ) : (
            <span className="text-5xl">📚</span>
          )}
        </div>
        
        {/* Particle effects for perfect score */}
        {isPerfect && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: Math.cos((i * 45 * Math.PI) / 180) * 60,
                  y: Math.sin((i * 45 * Math.PI) / 180) * 60,
                }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-[var(--gold-light)] rounded-full"
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Result Text */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-ink-primary">
          {isPerfect ? '🎉 完美通关！' : isPass ? '✨ 练习完成！' : '💪 继续加油！'}
        </h2>
        <p className="text-[var(--text-secondary)]">
          正确率 {correctCount}/{totalCount} ({percentage}%)
        </p>
      </div>

      {/* Exp Gained */}
      <div className="bg-[var(--gold)]/10 rounded-xl py-4 px-6 inline-flex items-center gap-3">
        <Star className="w-6 h-6 text-[var(--gold)]" />
        <span className="text-lg font-bold text-[var(--gold-dark)]">
          获得 +{expGained} 经验
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={onRetry}
          className="btn btn-secondary flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          再来一次
        </button>
        
        {onNext && (
          <button
            onClick={onNext}
            className="btn btn-primary flex items-center gap-2"
          >
            下一首
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
