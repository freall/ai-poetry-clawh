import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, ArrowRight, Shuffle } from 'lucide-react';
import { poems as allPoems } from '@/data/poetry/sample';
import { PoetryCard } from '@/components/poetry/PoetryCard';
import { ProgressRing } from '@/components/gamification/ProgressRing';
import { usePoetryStore } from '@/stores/poetryStore';
import { shuffle, calculateLevel } from '@/utils';

const categoryList = [
  { id: 'tangshi', name: '唐诗三百首', icon: '📜', count: 366, color: '#C0392B' },
  { id: 'songci', name: '宋词三百首', icon: '🎋', count: 280, color: '#1ABC9C' },
  { id: 'guwen', name: '古文观止', icon: '📚', count: 122, color: '#D4AF37' },
  { id: 'yuanqu', name: '元曲', icon: '🎭', count: 300, color: '#9B59B6' },
  { id: 'primary', name: '小学必背', icon: '🌱', count: 75, color: '#27AE60' },
  { id: 'middle', name: '初中必背', icon: '🌿', count: 50, color: '#3498DB' },
  { id: 'high', name: '高中必背', icon: '🌳', count: 40, color: '#E67E22' },
];

export const HomePage: React.FC = () => {
  const { learnedPoetryIds, exp, streakDays } = usePoetryStore();
  const { progress, name: levelName } = calculateLevel(exp);
  const [dailyPoem, setDailyPoem] = useState(allPoems[0]);
  const [randomPoems, setRandomPoems] = useState<typeof allPoems>([]);

  useEffect(() => {
    // 随机选择一首诗作为今日推荐
    const random = Math.floor(Math.random() * allPoems.length);
    setDailyPoem(allPoems[random]);
    
    // 随机选择几首诗展示
    setRandomPoems(shuffle([...allPoems]).slice(0, 4));
  }, []);

  const handleRandomClick = () => {
    const random = Math.floor(Math.random() * allPoems.length);
    window.location.href = `/poetry/${allPoems[random].id}`;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-paper)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-paper py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-title text-4xl md:text-5xl font-bold text-[var(--ink-primary)] mb-4">
              诗意江湖，随手可及
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              游戏化学习唐诗宋词古文，轻松掌握中华文化瑰宝
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 text-center shadow-sm"
            >
              <div className="text-2xl font-bold text-[var(--cinnabar)]">{learnedPoetryIds.length}</div>
              <div className="text-sm text-[var(--text-secondary)]">已学习</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 text-center shadow-sm"
            >
              <div className="text-2xl font-bold text-[var(--gold)]">{exp}</div>
              <div className="text-sm text-[var(--text-secondary)]">经验值</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-4 text-center shadow-sm"
            >
              <div className="text-2xl font-bold text-[var(--jade)]">{streakDays}</div>
              <div className="text-sm text-[var(--text-secondary)]">连续天数</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-4 text-center shadow-sm"
            >
              <ProgressRing progress={progress} size={50} strokeWidth={4} showLabel={false} />
              <div className="text-sm text-[var(--text-secondary)] mt-1">{levelName}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Daily Poem Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[var(--gold)]" />
            <h2 className="font-title text-xl font-semibold">今日推荐</h2>
          </div>
          <Link to={`/poetry/${dailyPoem.id}`}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--cinnabar)] to-[var(--cinnabar-dark)] text-white p-6 md:p-8 cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="currentColor" />
                </svg>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
                    {dailyPoem.dynasty}
                  </span>
                  <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
                    {dailyPoem.author.name}
                  </span>
                </div>
                <h3 className="font-title text-2xl md:text-3xl font-bold mb-4">
                  {dailyPoem.title}
                </h3>
                <p className="font-poetry text-lg opacity-90 leading-relaxed">
                  {dailyPoem.content.slice(0, 2).join('')}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm opacity-80">
                  <span>点击阅读全文</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-8 px-4 bg-[var(--bg-cream)]/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[var(--cinnabar)]" />
            <h2 className="font-title text-xl font-semibold">诗词分类</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryList.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/poetry?category=${cat.id}`}>
                  <div
                    className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                    style={{ borderTop: `3px solid ${cat.color}` }}
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <div className="font-medium text-[var(--ink-primary)]">{cat.name}</div>
                    <div className="text-sm text-[var(--text-secondary)]">{cat.count}篇</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Random Poem */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shuffle className="w-5 h-5 text-[var(--jade)]" />
              <h2 className="font-title text-xl font-semibold">随机一篇</h2>
            </div>
            <button
              onClick={handleRandomClick}
              className="text-sm text-[var(--cinnabar)] hover:underline flex items-center gap-1"
            >
              <Shuffle className="w-4 h-4" />
              换一首
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {randomPoems.map((poem) => (
              <PoetryCard key={poem.id} poetry={poem} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
