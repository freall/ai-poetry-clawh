#!/usr/bin/env node
/**
 * 为诗词生成配图 URL
 * 使用免费图库 API
 */

const fs = require('fs');
const path = require('path');

// 路径
const DATA_DIR = path.join(__dirname, '..', 'data', 'poetry');

// 关键词映射
const KEYWORD_MAP = {
  '山': 'mountain+landscape+chinese+painting',
  '水': 'water+landscape+china',
  '江': 'river+sunset+china',
  '河': 'river+landscape',
  '湖': 'lake+misty+china',
  '海': 'ocean+waves',
  '月': 'moon+night+sky',
  '日': 'sunrise+sunset',
  '日出': 'sunrise+mountains',
  '夕阳': 'sunset+landscape',
  '春': 'spring+blossoms',
  '夏': 'summer+nature',
  '秋': 'autumn+landscape',
  '冬': 'winter+snow',
  '雪': 'snow+landscape',
  '雨': 'rain+nature',
  '风': 'wind+nature',
  '云': 'clouds+sky',
  '花': 'flowers+blossoms',
  '梅': 'plum+blossoms+winter',
  '兰': 'orchid+flower',
  '竹': 'bamboo+forest',
  '松': 'pine+trees+mountain',
  '柳': 'willow+tree+water',
  '思': 'melancholy',
  '念': 'longing',
  '愁': 'sadness',
  '爱': 'love+romance',
  '情': 'romance+love',
  '酒': 'wine+traditional+china',
  '茶': 'tea+ceremony+china',
  '琴': 'guqin+music',
  '书': 'writing+calligraphy',
  '画': 'painting+art',
  '长安': 'ancient+china+city',
  '江南': 'jiangnan+water+town',
  '西湖': 'west+lake+hangzhou',
  '战争': 'war',
  '离别': 'farewell',
  '思乡': 'nostalgia',
};

function getImageKeyword(poem) {
  const title = poem.title || '';
  const tags = poem.tags || [];
  const content = (poem.content || []).join(' ');
  const allText = `${title} ${tags.join(' ')} ${content}`;
  
  for (const [keyword, imgKeyword] of Object.entries(KEYWORD_MAP)) {
    if (allText.includes(keyword)) {
      return imgKeyword;
    }
  }
  return 'chinese+landscape+painting';
}

function generateUnsplashUrl(keyword, width = 800, height = 600) {
  return `https://source.unsplash.com/${width}x${height}/?${keyword}`;
}

function processFile(filename) {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`文件不存在: ${filename}`);
    return;
  }
  
  let data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  let poems = data;
  
  // guwen.json 有不同的结构
  if (filename === 'guwen.json') {
    poems = data.pieces || [];
  }
  
  if (!Array.isArray(poems)) {
    console.log(`${filename}: 无法解析数据`);
    return;
  }
  
  console.log(`处理 ${filename}: ${poems.length} 篇诗词`);
  
  let updated = 0;
  for (const poem of poems) {
    if (!poem.imageUrl) {
      const keyword = getImageKeyword(poem);
      poem.imageUrl = generateUnsplashUrl(keyword);
      updated++;
    }
  }
  
  console.log(`  更新了 ${updated} 个图片URL`);
  
  // 保存
  if (filename === 'guwen.json') {
    data.pieces = poems;
  }
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  已保存`);
}

console.log('='.repeat(50));
console.log('诗词配图生成器');
console.log('='.repeat(50));

processFile('tangshi300.json');
processFile('songci300.json');
processFile('guwen.json');

console.log('\n完成!');
