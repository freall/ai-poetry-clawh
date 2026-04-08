// 诗词数据加载器
// 从 JSON 文件加载完整诗词数据

import { Poetry, Author } from '@/types';

// 导入各分类诗词数据
import tangshiData from '../../../data/poetry/tangshi300.json';
import songciData from '../../../data/poetry/songci300.json';
import yuanquData from '../../../data/poetry/yuanqu.json';
import lunyuData from '../../../data/poetry/lunyu.json';
import guwenData from '../../../data/poetry/guwen.json';
import schoolData from '../../../data/poetry/school_required.json';

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

// 合并所有诗词数据
function loadAllPoetry(): Poetry[] {
  const poems: Poetry[] = [];

  // 加载唐诗三百首
  if (Array.isArray(tangshiData)) {
    tangshiData.forEach(p => poems.push(convertToPoetry(p)));
  }

  // 加载宋词三百首
  if (Array.isArray(songciData)) {
    songciData.forEach(p => poems.push(convertToPoetry(p)));
  }

  // 加载元曲
  if (Array.isArray(yuanquData)) {
    yuanquData.forEach(p => poems.push(convertToPoetry(p)));
  }

  // 加载论语 (lunyu.json 是包含单个对象的数组)
  if (Array.isArray(lunyuData) && lunyuData.length > 0) {
    const lunyuItem = lunyuData[0];
    poems.push(convertToPoetry({
      ...lunyuItem,
      category: 'wen',
    }));
  }

  // 加载古文观止
  if (guwenData && guwenData.pieces && Array.isArray(guwenData.pieces)) {
    guwenData.pieces.forEach((p: any) => {
      poems.push(convertToPoetry({
        ...p,
        category: 'wen',
        author: { name: p.author || '' },
      }));
    });
  }

  // 加载中小学必背
  if (Array.isArray(schoolData)) {
    schoolData.forEach(p => poems.push(convertToPoetry(p)));
  }

  return poems;
}

// 导出所有诗词
export const poems: Poetry[] = loadAllPoetry();

// 按分类统计
export const categoryStats = {
  all: poems.length,
  shi: poems.filter(p => p.category === 'shi').length,
  ci: poems.filter(p => p.category === 'ci').length,
  qu: poems.filter(p => p.category === 'qu').length,
  wen: poems.filter(p => p.category === 'wen').length,
};

// 获取所有诗词
export const getAllPoems = (): Poetry[] => poems;

// 根据ID获取诗词
export const getPoemById = (id: string): Poetry | undefined =>
  poems.find(p => p.id === id);

// 根据分类获取诗词
export const getPoemsByCategory = (category: string): Poetry[] =>
  category === 'all' ? poems : poems.filter(p => p.category === category);

// 根据朝代获取诗词
export const getPoemsByDynasty = (dynasty: string): Poetry[] =>
  poems.filter(p => p.dynasty === dynasty);

// 根据学段获取诗词
export const getPoemsBySchoolLevel = (level: string): Poetry[] =>
  level === 'all' ? poems : poems.filter(p => p.schoolLevel === level);

// 获取随机诗词
export const getRandomPoem = (): Poetry => {
  const randomIndex = Math.floor(Math.random() * poems.length);
  return poems[randomIndex];
};

// 搜索诗词
export const searchPoems = (query: string): Poetry[] => {
  const q = query.toLowerCase();
  return poems.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.author.name.toLowerCase().includes(q) ||
    p.content.some(line => line.toLowerCase().includes(q))
  );
};

// 获取诗词数量
export const getPoetryCount = () => poems.length;

// 导出 authors (从诗词数据提取)
export const authors: Author[] = [];
