import { clsx, type ClassValue } from 'clsx';

// 合并className
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// 格式化日期
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// 计算等级
export function calculateLevel(exp: number): { level: number; name: string; progress: number } {
  const levels = [
    { level: 1, name: '诗童', min: 0, max: 50 },
    { level: 2, name: '诗生', min: 51, max: 200 },
    { level: 3, name: '诗才', min: 201, max: 500 },
    { level: 4, name: '诗豪', min: 501, max: 1000 },
    { level: 5, name: '诗魔', min: 1001, max: 2000 },
    { level: 6, name: '诗鬼', min: 2001, max: 5000 },
    { level: 7, name: '诗仙', min: 5001, max: 10000 },
    { level: 8, name: '诗神', min: 10001, max: Infinity },
  ];

  for (const l of levels) {
    if (exp >= l.min && exp <= l.max) {
      const progress = l.max === Infinity ? 100 :
        Math.round(((exp - l.min) / (l.max - l.min)) * 100);
      return { level: l.level, name: l.name, progress };
    }
  }

  return { level: 1, name: '诗童', progress: 0 };
}

// 生成唯一ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// 洗牌算法 (随机排列)
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 经验值常量
export const EXP_GAINS = {
  READ_COMPLETE: 2,      // 阅读完整篇诗词
  PRACTICE_PERFECT: 10,   // 完成练习且全对
  FAVORITE: 1,           // 收藏诗词
  STREAK_3_DAYS: 20,      // 连续3天学习
} as const;

// 朝代名称映射
export const DYNASTY_NAMES: Record<string, string> = {
  tang: '唐',
  song: '宋',
  yuan: '元',
  ming: '明',
  qing: '清',
};

// 类别名称映射
export const CATEGORY_NAMES: Record<string, string> = {
  shi: '诗',
  ci: '词',
  qu: '曲',
  wen: '文',
};
