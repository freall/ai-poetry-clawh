// 诗词数据加载器 - 动态按需加载
// 数据文件放在 public/data/poetry/ 目录，通过 fetch 动态加载

import { Poetry } from '@/types';

// 数据缓存
let poemsCache: Poetry[] | null = null;
let cachePromise: Promise<Poetry[]> | null = null;

// 加载单个 JSON 文件
async function loadJsonFile<T>(filename: string): Promise<T> {
  const response = await fetch(`/data/poetry/${filename}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${filename}`);
  }
  return response.json();
}

// 动态加载并缓存所有诗词
async function loadAllPoetry(): Promise<Poetry[]> {
  if (poemsCache) return poemsCache;
  if (cachePromise) return cachePromise;

  cachePromise = (async () => {
    try {
      const [tangshi, songci, guwen] = await Promise.all([
        loadJsonFile<any[]>('tangshi300.json'),
        loadJsonFile<any[]>('songci300.json'),
        loadJsonFile<any>('guwen.json'),
      ]);

      const poems: Poetry[] = [];

      // 转换唐诗
      if (Array.isArray(tangshi)) {
        tangshi.forEach(p => poems.push(convertToPoetry(p)));
      }

      // 转换宋词
      if (Array.isArray(songci)) {
        songci.forEach(p => poems.push(convertToPoetry(p)));
      }

      // 转换古文观止
      if (guwen && guwen.pieces && Array.isArray(guwen.pieces)) {
        guwen.pieces.forEach((p: any) => {
          poems.push(convertToPoetry({
            ...p,
            category: 'wen',
            author: { name: p.author || '' },
          }));
        });
      }

      poemsCache = poems;
      return poems;
    } catch (error) {
      console.error('Failed to load poetry data:', error);
      return [];
    }
  })();

  return cachePromise;
}

// 转换为 Poetry 类型
function convertToPoetry(data: any): Poetry {
  return {
    id: data.id || '',
    title: data.title || '',
    category: data.category || 'shi',
    dynasty: data.dynasty || '',
    author: data.author || { name: '' },
    content: data.content || [],
    translation: data.translation || [],
    annotation: data.annotation || [],
    background: data.background || '',
    difficulty: data.difficulty || 1,
    tags: data.tags || [],
    imageUrl: data.imageUrl || '',
    relatedIds: data.relatedIds || [],
    questions: data.questions || [],
    schoolLevel: data.schoolLevel || undefined,
  };
}

// 按分类统计 (静态信息，不需要加载全部数据)
export const categoryStats = {
  all: '?',
  shi: '?',
  ci: '?',
  qu: 0,
  wen: '?',
};

// 异步获取所有诗词
export const getAllPoems = (): Promise<Poetry[]> => loadAllPoetry();

// 异步根据ID获取诗词
export const getPoemById = async (id: string): Promise<Poetry | undefined> => {
  const poems = await loadAllPoetry();
  return poems.find(p => p.id === id);
};

// 异步根据分类获取诗词
export const getPoemsByCategory = async (category: string): Promise<Poetry[]> => {
  const poems = await loadAllPoetry();
  return category === 'all' ? poems : poems.filter(p => p.category === category);
};

// 异步搜索诗词
export const searchPoems = async (query: string): Promise<Poetry[]> => {
  const poems = await loadAllPoetry();
  const q = query.toLowerCase();
  return poems.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.author.name.toLowerCase().includes(q) ||
    p.content.some(line => line.toLowerCase().includes(q))
  );
};

// 获取随机诗词
export const getRandomPoem = async (): Promise<Poetry | null> => {
  const poems = await loadAllPoetry();
  if (poems.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * poems.length);
  return poems[randomIndex];
};

// 预加载数据（在应用启动时调用）
export const preloadPoetryData = (): Promise<Poetry[]> => loadAllPoetry();
