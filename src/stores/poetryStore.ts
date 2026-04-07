import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Achievement, ACHIEVEMENTS } from '@/types';
import { EXP_GAINS, calculateLevel } from '@/utils';

interface PoetryState {
  // 学习记录
  learnedPoetryIds: string[];
  learnedAt: Record<string, string>; // poetryId -> ISO date
  
  // 收藏
  favoriteIds: string[];
  
  // 错题
  wrongQuestionIds: string[];
  
  // 经验值
  exp: number;
  level: number;
  levelName: string;
  levelProgress: number;
  
  // 成就
  achievements: Achievement[];
  
  // 连续学习
  streakDays: number;
  lastLearnDate: string | null;
  perfectStreak: number; // 连续满分次数
  
  // 操作方法
  markAsLearned: (poetryId: string) => void;
  toggleFavorite: (poetryId: string) => void;
  addWrongQuestion: (questionId: string) => void;
  addExp: (amount: number) => void;
  updateStreak: () => void;
  incrementPerfectStreak: () => void;
  resetPerfectStreak: () => void;
  unlockAchievement: (achievementId: string) => void;
  isFavorite: (poetryId: string) => boolean;
  isLearned: (poetryId: string) => boolean;
  hasWrongQuestion: (questionId: string) => boolean;
}

export const usePoetryStore = create<PoetryState>()(
  persist(
    (set, get) => ({
      learnedPoetryIds: [],
      learnedAt: {},
      favoriteIds: [],
      wrongQuestionIds: [],
      exp: 0,
      level: 1,
      levelName: '诗童',
      levelProgress: 0,
      achievements: [],
      streakDays: 0,
      lastLearnDate: null,
      perfectStreak: 0,
      
      markAsLearned: (poetryId) => {
        const state = get();
        if (state.learnedPoetryIds.includes(poetryId)) return;
        
        const today = new Date().toISOString().split('T')[0];
        
        set((s) => ({
          learnedPoetryIds: [...s.learnedPoetryIds, poetryId],
          learnedAt: { ...s.learnedAt, [poetryId]: today },
        }));
        
        // 增加经验
        get().addExp(EXP_GAINS.READ_COMPLETE);
        
        // 检查成就
        const learnedCount = state.learnedPoetryIds.length + 1;
        if (learnedCount === 1) {
          get().unlockAchievement('first-poem');
        } else if (learnedCount === 10) {
          get().unlockAchievement('ten-poems');
        } else if (learnedCount === 50) {
          get().unlockAchievement('fifty-poems');
        } else if (learnedCount === 100) {
          get().unlockAchievement('hundred-poems');
        } else if (learnedCount === 200) {
          get().unlockAchievement('two-hundred-poems');
        }
        
        // 更新连续学习
        get().updateStreak();
      },
      
      toggleFavorite: (poetryId) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(poetryId)
            ? state.favoriteIds.filter((id) => id !== poetryId)
            : [...state.favoriteIds, poetryId],
        }));
        
        // 如果是新增收藏，增加经验
        if (!get().favoriteIds.includes(poetryId)) {
          // 会在执行后检查，但这里有点问题，先简单处理
        }
      },
      
      addWrongQuestion: (questionId) => {
        set((state) => ({
          wrongQuestionIds: [...new Set([...state.wrongQuestionIds, questionId])],
        }));
        get().resetPerfectStreak();
      },
      
      addExp: (amount) => {
        set((state) => {
          const newExp = state.exp + amount;
          const { level, name, progress } = calculateLevel(newExp);
          return {
            exp: newExp,
            level,
            levelName: name,
            levelProgress: progress,
          };
        });
      },
      
      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => {
          if (state.lastLearnDate === today) return state;
          
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          let newStreak = state.lastLearnDate === yesterdayStr 
            ? state.streakDays + 1 
            : 1;
          
          // 连续3天奖励
          if (newStreak === 3) {
            set((s) => ({ exp: s.exp + EXP_GAINS.STREAK_3_DAYS }));
            get().unlockAchievement('week-streak');
          }
          
          return {
            streakDays: newStreak,
            lastLearnDate: today,
          };
        });
      },
      
      incrementPerfectStreak: () => {
        set((state) => {
          const newStreak = state.perfectStreak + 1;
          if (newStreak === 10) {
            get().addExp(100);
            get().unlockAchievement('perfect-ten');
          }
          return { perfectStreak: newStreak };
        });
      },
      
      resetPerfectStreak: () => {
        set({ perfectStreak: 0 });
      },
      
      unlockAchievement: (achievementId) => {
        const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
        if (!achievement) return;
        
        set((state) => {
          if (state.achievements.some((a) => a.id === achievementId)) {
            return state;
          }
          return {
            achievements: [
              ...state.achievements,
              { ...achievement, unlockedAt: new Date().toISOString() },
            ],
          };
        });
      },
      
      isFavorite: (poetryId) => get().favoriteIds.includes(poetryId),
      
      isLearned: (poetryId) => get().learnedPoetryIds.includes(poetryId),
      
      hasWrongQuestion: (questionId) => get().wrongQuestionIds.includes(questionId),
    }),
    {
      name: 'poetry-learning-storage',
    }
  )
);
