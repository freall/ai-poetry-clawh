import React from 'react';
import { Question } from '@/types';
import { cn } from '@/utils';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedIndex: number | null;
  isAnswered: boolean;
  onSelect: (index: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedIndex,
  isAnswered,
  onSelect,
}) => {
  const getOptionClass = (index: number) => {
    const baseClass = 'w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3';
    
    if (!isAnswered) {
      return cn(
        baseClass,
        selectedIndex === index
          ? 'border-[var(--cinnabar)] bg-[var(--cinnabar-bg)]'
          : 'border-[var(--ink-light)]/30 bg-white hover:border-[var(--ink-light)]/50 hover:bg-[var(--bg-warm)]'
      );
    }
    
    if (index === question.correctIndex) {
      return cn(baseClass, 'border-[var(--jade)] bg-[var(--jade-bg)]');
    }
    
    if (selectedIndex === index && index !== question.correctIndex) {
      return cn(baseClass, 'border-[var(--cinnabar)] bg-[var(--cinnabar-bg)]');
    }
    
    return cn(baseClass, 'border-[var(--ink-light)]/30 bg-[var(--bg-warm)] opacity-50');
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          第 {questionNumber}/{totalQuestions} 题
        </span>
        <div className="flex-1 h-2 bg-[var(--bg-warm)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--cinnabar)] transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-[var(--bg-cream)] rounded-xl p-6 space-y-4">
        <p className="text-lg font-medium text-ink-primary leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isAnswered && onSelect(index)}
            disabled={isAnswered}
            className={getOptionClass(index)}
          >
            <span
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                !isAnswered && selectedIndex === index && 'bg-[var(--cinnabar)] text-white',
                isAnswered && index === question.correctIndex && 'bg-[var(--jade)] text-white',
                isAnswered && selectedIndex === index && index !== question.correctIndex && 'bg-[var(--cinnabar)] text-white',
                !isAnswered && selectedIndex !== index && 'bg-[var(--bg-warm)] text-[var(--ink-secondary)]'
              )}
            >
              {optionLabels[index]}
            </span>
            <span className="text-base">{option}</span>
          </button>
        ))}
      </div>

      {/* Explanation (shown after answering) */}
      {isAnswered && (
        <div className="mt-6 p-4 bg-[var(--gold)]/10 rounded-xl border border-[var(--gold)]/20">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <div className="font-medium text-[var(--ink-primary)] mb-1">答案解析</div>
              <p className="text-sm text-[var(--text-secondary)]">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
