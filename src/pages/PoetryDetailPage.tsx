import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Heart, Share2, ChevronLeft, ChevronRight, 
  BookOpen, User, Clock, Star, Zap, RotateCcw
} from 'lucide-react';
import { poems as allPoems, getPoemById } from '@/data/poetry/index';
import { PoetryCard } from '@/components/poetry/PoetryCard';
import { SceneImage } from '@/components/poetry/PoetryScapeImage';
import { usePoetryStore } from '@/stores/poetryStore';
import { cn } from '@/utils';
import { Poetry } from '@/types';

export const PoetryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [poetry, setPoetry] = useState<Poetry | undefined>(undefined);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');

  const { isFavorite, toggleFavorite, isLearned, markAsLearned } = usePoetryStore();
  
  const favorite = poetry ? isFavorite(poetry.id) : false;
  const learned = poetry ? isLearned(poetry.id) : false;

  // 找到上一篇和下一篇
  const currentIndex = allPoems.findIndex(p => p.id === id);
  const prevPoem = currentIndex > 0 ? allPoems[currentIndex - 1] : null;
  const nextPoem = currentIndex < allPoems.length - 1 ? allPoems[currentIndex + 1] : null;

  useEffect(() => {
    if (id) {
      getPoemById(id).then(poem => {
        setPoetry(poem);
        window.scrollTo(0, 0);
      });
    }
  }, [id]);

  if (!poetry) {
    return (
      <div className="min-h-screen bg-[var(--bg-paper)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📜</div>
          <h2 className="text-xl font-medium mb-2">诗词不存在</h2>
          <Link to="/poetry" className="text-[var(--cinnabar)] hover:underline">
            返回诗词列表
          </Link>
        </div>
      </div>
    );
  }

  const handleMarkAsLearned = () => {
    markAsLearned(poetry.id);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${poetry.title} - ${poetry.author.name}`,
          text: poetry.content.slice(0, 2).join(''),
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    }
  };

  const categoryName = { shi: '诗', ci: '词', qu: '曲', wen: '文' }[poetry.category] || poetry.category;

  return (
    <div className="min-h-screen bg-[var(--bg-paper)]">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-[var(--bg-paper)]/95 backdrop-blur-sm border-b border-[var(--ink-light)]/10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link 
            to="/poetry" 
            className="flex items-center gap-2 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">返回</span>
          </Link>

          <div className="flex items-center gap-2">
            {prevPoem && (
              <Link 
                to={`/poetry/${prevPoem.id}`}
                className="p-2 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                title="上一篇"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            )}
            <span className="text-sm text-[var(--text-secondary)]">
              {currentIndex + 1} / {allPoems.length}
            </span>
            {nextPoem && (
              <Link 
                to={`/poetry/${nextPoem.id}`}
                className="p-2 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                title="下一篇"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(poetry.id)}
              className={cn(
                'p-2 rounded-full transition-all',
                favorite 
                  ? 'text-[var(--cinnabar)] bg-[var(--cinnabar-bg)]' 
                  : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-warm)]'
              )}
            >
              <Heart className={cn('w-5 h-5', favorite && 'fill-current')} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-[var(--ink-secondary)] hover:bg-[var(--bg-warm)]"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <SceneImage 
            imageUrl={poetry.imageUrl}
            title={poetry.title}
            className="w-full h-48 md:h-64"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-primary)]/60 via-transparent to-transparent" />
          
          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
              <span>{categoryName}</span>
              <span>·</span>
              <span>{poetry.dynasty}</span>
              <span>·</span>
              <span>{poetry.author.name}</span>
            </div>
            <h1 className="font-title text-3xl md:text-4xl font-bold text-white">
              {poetry.title}
            </h1>
          </div>
        </motion.div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < poetry.difficulty ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-[var(--text-light)]'
                )}
              />
            ))}
            <span className="ml-1 text-[var(--text-secondary)]">难度</span>
          </div>
          
          {poetry.schoolLevel && (
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-medium',
              poetry.schoolLevel === 'primary' && 'bg-blue-100 text-blue-700',
              poetry.schoolLevel === 'middle' && 'bg-purple-100 text-purple-700',
              poetry.schoolLevel === 'high' && 'bg-orange-100 text-orange-700'
            )}>
              {poetry.schoolLevel === 'primary' && '小学必背'}
              {poetry.schoolLevel === 'middle' && '初中必背'}
              {poetry.schoolLevel === 'high' && '高中必背'}
            </span>
          )}

          {learned && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--jade-bg)] text-[var(--jade)]">
              ✓ 已学习
            </span>
          )}
        </div>

        {/* Poetry Content */}
        <section className="bg-[var(--bg-cream)] rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-title text-lg font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--cinnabar)]" />
              原文
            </h2>
            <button
              onClick={() => setLayout(layout === 'horizontal' ? 'vertical' : 'horizontal')}
              className="text-sm text-[var(--cinnabar)] hover:underline"
            >
              切换{layout === 'horizontal' ? '竖排' : '横排'}
            </button>
          </div>
          
          <div className={layout === 'vertical' ? 'writing-mode-vertical' : ''}>
            <div 
              className={cn(
                'font-poetry text-center',
                layout === 'vertical' 
                  ? 'text-3xl md:text-4xl leading-loose space-y-4' 
                  : 'text-2xl md:text-3xl leading-loose space-y-2 md:space-y-4'
              )}
              style={layout === 'vertical' ? { 
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
                letterSpacing: '0.3em'
              } : undefined}
            >
              {poetry.content.map((line, index) => (
                <span 
                  key={index}
                  className={cn(layout !== 'vertical' && 'block')}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Translation */}
        {poetry.translation && poetry.translation.length > 0 && (
          <section className="bg-[var(--bg-cream)] rounded-2xl p-6 md:p-8">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="w-full flex items-center justify-between mb-4"
            >
              <h2 className="font-title text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--jade)]" />
                译文
              </h2>
              <span className="text-[var(--text-secondary)]">
                {showTranslation ? '收起' : '展开'}
              </span>
            </button>
            
            {showTranslation && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="space-y-3 text-[var(--ink-secondary)] leading-relaxed"
              >
                {poetry.translation.map((t, index) => (
                  <p key={index}>{t}</p>
                ))}
              </motion.div>
            )}
          </section>
        )}

        {/* Annotation */}
        {poetry.annotation && poetry.annotation.length > 0 && (
          <section className="bg-[var(--bg-cream)] rounded-2xl p-6 md:p-8">
            <button
              onClick={() => setShowAnnotation(!showAnnotation)}
              className="w-full flex items-center justify-between mb-4"
            >
              <h2 className="font-title text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[var(--gold)]" />
                注释
              </h2>
              <span className="text-[var(--text-secondary)]">
                {showAnnotation ? '收起' : '展开'}
              </span>
            </button>
            
            {showAnnotation && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="space-y-3"
              >
                {poetry.annotation.map((ann, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="font-medium text-[var(--cinnabar)]">{ann.term}</span>
                    <span className="text-[var(--ink-secondary)]">{ann.explanation}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </section>
        )}

        {/* Author Info */}
        <section className="bg-[var(--bg-cream)] rounded-2xl p-6 md:p-8">
          <h2 className="font-title text-lg font-semibold flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-[var(--ink-primary)]" />
            作者简介
          </h2>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--cinnabar)] to-[var(--cinnabar-dark)] flex items-center justify-center text-white text-2xl font-title shrink-0">
              {poetry.author.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-lg">{poetry.author.name}</span>
                {poetry.author.nickname && (
                  <span className="text-sm text-[var(--text-secondary)]">
                    ({poetry.author.nickname})
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                {poetry.author.dynasty}代
                {poetry.author.birthYear && ` · ${poetry.author.birthYear}-${poetry.author.deathYear || ''}`}
              </p>
              <p className="text-[var(--ink-secondary)] leading-relaxed">
                {poetry.author.bio}
              </p>
            </div>
          </div>
        </section>

        {/* Background */}
        {poetry.background && (
          <section className="bg-[var(--bg-cream)] rounded-2xl p-6 md:p-8">
            <h2 className="font-title text-lg font-semibold flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[var(--ink-primary)]" />
              创作背景
            </h2>
            <p className="text-[var(--ink-secondary)] leading-relaxed">
              {poetry.background}
            </p>
          </section>
        )}

        {/* Practice Section */}
        {poetry.questions && poetry.questions.length > 0 && (
          <section className="bg-gradient-to-r from-[var(--gold)]/10 to-[var(--gold)]/5 rounded-2xl p-6 md:p-8 border border-[var(--gold)]/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-title text-lg font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[var(--gold)]" />
                  马上练习
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  完成练习获得 +{poetry.questions.length * 5} 经验
                </p>
              </div>
              <button
                onClick={() => navigate(`/practice/${poetry.id}`)}
                className="btn btn-primary flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                开始练习
              </button>
            </div>
          </section>
        )}

        {/* Related Poems */}
        {poetry.relatedIds && poetry.relatedIds.length > 0 && (
          <section>
            <h2 className="font-title text-lg font-semibold mb-4">相关诗词</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {poetry.relatedIds
                .map(rid => allPoems.find(p => p.id === rid))
                .filter((p): p is Poetry => p !== undefined)
                .slice(0, 4)
                .map(p => <PoetryCard key={p.id} poetry={p} />)}
            </div>
          </section>
        )}

        {/* Mark as Learned */}
        {!learned && (
          <section className="text-center py-4">
            <button
              onClick={handleMarkAsLearned}
              className="btn btn-secondary"
            >
              已读完全文，标记为已学习
            </button>
          </section>
        )}
      </div>
    </div>
  );
};
