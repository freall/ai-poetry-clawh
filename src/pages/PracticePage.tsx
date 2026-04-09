import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X } from 'lucide-react';
import { getPoemById } from '@/data/poetry/index';
import { QuestionCard } from '@/components/practice/QuestionCard';
import { QuizResult } from '@/components/practice/QuizResult';
import { usePoetryStore } from '@/stores/poetryStore';
import { EXP_GAINS } from '@/utils';
import { Poetry } from '@/types';

export const PracticePage: React.FC = () => {
  const { poetryId } = useParams<{ poetryId: string }>();
  const navigate = useNavigate();
  const [poetry, setPoetry] = useState<Poetry | undefined>(undefined);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [expGained, setExpGained] = useState(0);
  
  const { addWrongQuestion, addExp, incrementPerfectStreak, resetPerfectStreak } = usePoetryStore();

  useEffect(() => {
    if (poetryId) {
      getPoemById(poetryId).then(setPoetry);
    }
  }, [poetryId]);

  if (!poetry || !poetry.questions || poetry.questions.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg-paper)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-xl font-medium mb-2">暂无练习题</h2>
          <Link to={`/poetry/${poetryId}`} className="text-[var(--cinnabar)] hover:underline">
            返回诗词页面
          </Link>
        </div>
      </div>
    );
  }

  const questions = poetry.questions;
  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctIndex;

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswered(true);
    
    if (selectedAnswer === currentQ.correctIndex) {
      setCorrectCount(prev => prev + 1);
      incrementPerfectStreak();
    } else {
      addWrongQuestion(currentQ.id);
      resetPerfectStreak();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz completed
      const isPerfect = correctCount === questions.length;
      const gainedExp = isPerfect ? EXP_GAINS.PRACTICE_PERFECT : Math.floor(EXP_GAINS.PRACTICE_PERFECT * (correctCount / questions.length));
      setExpGained(gainedExp);
      addExp(gainedExp);
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setShowResult(false);
    setExpGained(0);
  };

  const handleGoBack = () => {
    navigate(`/poetry/${poetryId}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-paper)]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--bg-paper)]/95 backdrop-blur-sm border-b border-[var(--ink-light)]/10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">返回</span>
          </button>
          <div className="font-medium text-[var(--ink-primary)]">
            {poetry.title} · 练习
          </div>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {showResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <QuizResult
                correctCount={correctCount}
                totalCount={questions.length}
                expGained={expGained}
                onRetry={handleRetry}
                onNext={() => {
                  // Find next poem with questions
                  navigate('/poetry');
                }}
                isPerfect={correctCount === questions.length}
              />
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <QuestionCard
                question={currentQ}
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
                selectedIndex={selectedAnswer}
                isAnswered={isAnswered}
                onSelect={handleSelectAnswer}
              />

              {/* Action Buttons */}
              <div className="mt-6">
                {!isAnswered ? (
                  <button
                    onClick={handleConfirmAnswer}
                    disabled={selectedAnswer === null}
                    className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    确认答案
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* Feedback */}
                    <div className={`
                      p-4 rounded-xl flex items-center gap-3
                      ${isCorrect 
                        ? 'bg-[var(--jade-bg)] text-[var(--jade)]' 
                        : 'bg-[var(--cinnabar-bg)] text-[var(--cinnabar)]'
                      }
                    `}>
                      {isCorrect ? (
                        <>
                          <Check className="w-6 h-6" />
                          <span className="font-medium">回答正确！+{5} 经验</span>
                        </>
                      ) : (
                        <>
                          <X className="w-6 h-6" />
                          <span className="font-medium">
                            回答错误，正确答案是 {['A', 'B', 'C', 'D'][currentQ.correctIndex]}
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      className="btn btn-primary w-full"
                    >
                      {currentQuestion < questions.length - 1 ? '下一题' : '查看结果'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
