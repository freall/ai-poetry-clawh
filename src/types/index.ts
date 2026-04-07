// 诗词类型
export type PoetryCategory = 'shi' | 'ci' | 'qu' | 'wen';
export type SchoolLevel = 'primary' | 'middle' | 'high';

export interface Poetry {
  id: string;
  title: string;
  category: PoetryCategory;
  dynasty: string;
  author: Author;
  content: string[];        // 每句一行
  translation: string[];    // 对应每句翻译
  annotation: Annotation[];
  background: string;       // 创作背景
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags: string[];           // 主题标签
  imageUrl?: string;        // AI生成意境图
  relatedIds: string[];     // 相关诗词ID
  questions: Question[];    // 练习题
  schoolLevel?: SchoolLevel;
}

export interface Annotation {
  term: string;
  explanation: string;
}

export interface Author {
  id: string;
  name: string;
  nickname?: string;
  birthYear?: number;
  deathYear?: number;
  dynasty: string;
  bio: string;
  imageUrl?: string;
  representativeWorks: string[];
}

export interface Question {
  id: string;
  poetryId: string;
  type: 'choice' | 'multiple' | 'true-false';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserProgress {
  userId: string;
  learnedPoetryIds: string[];
  favoriteIds: string[];
  wrongQuestionIds: string[];
  exp: number;
  level: number;
  achievements: Achievement[];
  lastLearnDate: string;
  streakDays: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

// 等级系统
export interface Level {
  level: number;
  name: string;
  minExp: number;
  maxExp: number;
}

export const LEVELS: Level[] = [
  { level: 1, name: '诗童', minExp: 0, maxExp: 50 },
  { level: 2, name: '诗生', minExp: 51, maxExp: 200 },
  { level: 3, name: '诗才', minExp: 201, maxExp: 500 },
  { level: 4, name: '诗豪', minExp: 501, maxExp: 1000 },
  { level: 5, name: '诗魔', minExp: 1001, maxExp: 2000 },
  { level: 6, name: '诗鬼', minExp: 2001, maxExp: 5000 },
  { level: 7, name: '诗仙', minExp: 5001, maxExp: 10000 },
  { level: 8, name: '诗神', minExp: 10001, maxExp: Infinity },
];

// 成就列表
export const ACHIEVEMENTS: Omit<Achievement, 'unlockedAt'>[] = [
  { id: 'first-poem', name: '初出茅庐', description: '完成第一篇诗词', icon: '🔰' },
  { id: 'ten-poems', name: '诗海初探', description: '完成10篇诗词', icon: '📜' },
  { id: 'fifty-poems', name: '诗魂初铸', description: '完成50篇诗词', icon: '🎭' },
  { id: 'hundred-poems', name: '诗仙下凡', description: '完成100篇诗词', icon: '🌟' },
  { id: 'two-hundred-poems', name: '全知诗圣', description: '完成200篇诗词', icon: '👑' },
  { id: 'week-streak', name: '连续7日', description: '连续学习7天', icon: '📅' },
  { id: 'perfect-ten', name: '一字不差', description: '连续10次练习满分', icon: '🎯' },
];
