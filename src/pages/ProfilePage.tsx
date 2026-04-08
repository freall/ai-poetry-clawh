import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, Trophy, BookOpen, Heart, Clock, 
  Zap, ChevronRight, Award
} from 'lucide-react';
import { usePoetryStore } from '@/stores/poetryStore';
import { ProgressRing } from '@/components/gamification/ProgressRing';
import { AchievementBadge, LockedAchievementBadge } from '@/components/gamification/AchievementBadge';
import { ACHIEVEMENTS, LEVELS } from '@/types';
import { cn } from '@/utils';
import { poems as allPoems } from '@/data/poetry/index';

export const ProfilePage: React.FC = () => {
  const {
    exp,
    level,
    levelName,
    levelProgress,
    learnedPoetryIds,
    favoriteIds,
    streakDays,
    achievements,
    wrongQuestionIds,
  } = usePoetryStore();

  const learnedPoems = allPoems.filter(p => learnedPoetryIds.includes(p.id));
  const favoritePoems = allPoems.filter(p => favoriteIds.includes(p.id));
  const wrongPoems = allPoems.filter(p => 
    p.questions?.some(q => wrongQuestionIds.includes(q.id))
  );

  const totalPoems = allPoems.length;

  return (
    <div className="min-h-screen bg-[var(--bg-paper)] pb-8">
      {/* Profile Header */}
      <section className="bg-gradient-to-r from-[var(--cinnabar)] to-[var(--cinnabar-dark)] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold">
                {levelName}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center text-sm font-bold">
                Lv.{level}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">诗童 {levelName}</h1>
              <p className="text-white/80 text-sm">
                已学习 {learnedPoetryIds.length} / {totalPoems} 首诗词
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {exp} 经验
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  连续{streakDays}天
                </span>
              </div>
            </div>

            {/* Level Progress */}
            <ProgressRing 
              progress={levelProgress} 
              size={70} 
              strokeWidth={5}
              label="升级"
            />
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="max-w-4xl mx-auto px-4 -mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-[var(--jade)] mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">已学</span>
            </div>
            <div className="text-2xl font-bold text-[var(--ink-primary)]">
              {learnedPoetryIds.length}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-[var(--cinnabar)] mb-1">
              <Heart className="w-4 h-4" />
              <span className="text-sm">收藏</span>
            </div>
            <div className="text-2xl font-bold text-[var(--ink-primary)]">
              {favoriteIds.length}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-[var(--gold)] mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-sm">成就</span>
            </div>
            <div className="text-2xl font-bold text-[var(--ink-primary)]">
              {achievements.length}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-[var(--ink-light)] mb-1">
              <Star className="w-4 h-4" />
              <span className="text-sm">错题</span>
            </div>
            <div className="text-2xl font-bold text-[var(--ink-primary)]">
              {wrongQuestionIds.length}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-title text-lg font-semibold flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--gold)]" />
            成就徽章
          </h2>
          <span className="text-sm text-[var(--text-secondary)]">
            {achievements.length} / {ACHIEVEMENTS.length}
          </span>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = achievements.find(a => a.id === achievement.id);
            if (unlocked) {
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <AchievementBadge achievement={unlocked} size="sm" showName />
                </motion.div>
              );
            }
            return (
              <div key={achievement.id} className="flex flex-col items-center opacity-50">
                <LockedAchievementBadge
                  name={achievement.name}
                  description={achievement.description}
                  icon={achievement.icon}
                  size="sm"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Learned Poems */}
      {learnedPoems.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            to="/poetry?filter=learned"
            className="flex items-center justify-between mb-4 group"
          >
            <h2 className="font-title text-lg font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--jade)]" />
              最近学习
            </h2>
            <span className="text-sm text-[var(--cinnabar)] flex items-center gap-1">
              查看全部
              <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
          
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {learnedPoems.slice(0, 6).map((poem) => (
              <Link
                key={poem.id}
                to={`/poetry/${poem.id}`}
                className="shrink-0 w-32 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-full aspect-[4/3] rounded-lg bg-gradient-to-br from-[var(--bg-warm)] to-[var(--bg-cream)] flex items-center justify-center text-2xl font-poetry text-[var(--cinnabar)] mb-2">
                  {poem.title.charAt(0)}
                </div>
                <div className="font-medium text-sm truncate">{poem.title}</div>
                <div className="text-xs text-[var(--text-secondary)]">{poem.author.name}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Favorite Poems */}
      {favoritePoems.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            to="/poetry?filter=favorite"
            className="flex items-center justify-between mb-4 group"
          >
            <h2 className="font-title text-lg font-semibold flex items-center gap-2">
              <Heart className="w-5 h-5 text-[var(--cinnabar)]" />
              我的收藏
            </h2>
            <span className="text-sm text-[var(--cinnabar)] flex items-center gap-1">
              查看全部
              <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
          
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {favoritePoems.slice(0, 6).map((poem) => (
              <Link
                key={poem.id}
                to={`/poetry/${poem.id}`}
                className="shrink-0 w-32 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-full aspect-[4/3] rounded-lg bg-gradient-to-br from-[var(--cinnabar-bg)] to-[var(--bg-warm)] flex items-center justify-center text-2xl font-poetry text-[var(--cinnabar)] mb-2">
                  {poem.title.charAt(0)}
                </div>
                <div className="font-medium text-sm truncate">{poem.title}</div>
                <div className="text-xs text-[var(--text-secondary)]">{poem.author.name}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Wrong Questions */}
      {wrongPoems.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-title text-lg font-semibold flex items-center gap-2">
              <Star className="w-5 h-5 text-[var(--ink-light)]" />
              错题本
            </h2>
            <span className="text-sm text-[var(--text-secondary)]">
              {wrongPoems.length} 篇待复习
            </span>
          </div>
          
          <div className="space-y-2">
            {wrongPoems.slice(0, 5).map((poem) => (
              <Link
                key={poem.id}
                to={`/poetry/${poem.id}`}
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--cinnabar-bg)] to-[var(--bg-warm)] flex items-center justify-center text-xl font-poetry text-[var(--cinnabar)]">
                  {poem.title.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{poem.title}</div>
                  <div className="text-sm text-[var(--text-secondary)]">{poem.author.name}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-[var(--text-light)]" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Level System */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="font-title text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[var(--gold)]" />
          等级系统
        </h2>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="space-y-3">
            {LEVELS.map((lvl) => (
              <div
                key={lvl.level}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg',
                  level === lvl.level ? 'bg-[var(--gold)]/10' : ''
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                  level >= lvl.level 
                    ? 'bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] text-white'
                    : 'bg-[var(--bg-warm)] text-[var(--text-secondary)]'
                )}>
                  {lvl.level}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{lvl.name}</div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {lvl.minExp} - {lvl.maxExp === Infinity ? '+' : lvl.maxExp} 经验
                  </div>
                </div>
                {level >= lvl.level && (
                  <span className="text-[var(--gold)] text-sm">已达成</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
