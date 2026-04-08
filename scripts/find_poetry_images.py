#!/usr/bin/env python3
"""
为诗词搜索配图
使用 Unsplash API 或其他免费图库搜索意境图
"""

import json
import os
import time
import urllib.request
import urllib.parse
import re

# 数据路径
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
DATA_DIR = os.path.join(PROJECT_DIR, 'data', 'poetry')
OUTPUT_DIR = os.path.join(PROJECT_DIR, 'data', 'poetry')

# 关键词映射 - 根据诗词标题/标签映射到合适的图片关键词
KEYWORD_MAP = {
    # 自然景观
    '山': 'mountain landscape chinese painting',
    '水': 'water landscape chinese painting',
    '江': 'river sunset china',
    '河': 'river landscape',
    '湖': 'lake misty china',
    '海': 'ocean waves',
    '月': 'moon night sky',
    '日': 'sunrise sunset',
    '日出': 'sunrise mountains',
    '夕阳': 'sunset landscape',
    '春天': 'spring blossoms',
    '春': 'spring landscape',
    '夏': 'summer nature',
    '秋': 'autumn landscape',
    '冬': 'winter snow landscape',
    '雪': 'snow landscape',
    '雨': 'rain nature',
    '风': 'wind nature',
    '云': 'clouds sky',
    '花': 'flowers blossoms',
    '梅': 'plum blossoms winter',
    '兰': 'orchid flower',
    '竹': 'bamboo forest',
    '松': 'pine trees mountain',
    '柳': 'willow tree water',
    
    # 情感主题
    '思': 'melancholy thinking',
    '念': 'longing hope',
    '愁': 'sadness blue',
    '忧': 'worry concern',
    '恨': 'regret sorrow',
    '爱': 'love romance',
    '情': 'romance love',
    
    # 人物活动
    '酒': 'wine traditional china',
    '茶': 'tea ceremony china',
    '琴': 'guqin music',
    '棋': 'chess game',
    '书': 'writing calligraphy',
    '画': 'painting art',
    
    # 地标建筑
    '长安': 'ancient china city',
    '江南': 'jiangnan water town',
    '西湖': 'west lake hangzhou',
    '岳阳楼': 'pavilion lake china',
    '黄鹤楼': 'yellow crane tower',
    
    # 其他
    '战争': 'war ancient battle',
    '离别': 'farewell parting',
    '思乡': 'nostalgia homeland',
}

def get_image_keyword(poem):
    """根据诗词内容获取合适的图片关键词"""
    title = poem.get('title', '')
    tags = poem.get('tags', [])
    content = ' '.join(poem.get('content', []))
    
    # 合并所有文本
    all_text = f"{title} {' '.join(tags)} {content}"
    
    # 查找匹配的关键词
    for keyword, image_keyword in KEYWORD_MAP.items():
        if keyword in all_text:
            return image_keyword
    
    # 默认返回通用关键词
    return 'chinese landscape painting'

def generate_unsplash_url(keyword, width=800, height=600):
    """生成 Unsplash 图片 URL (使用源图片搜索)"""
    # 使用 Unsplash Source (无需 API key)
    # https://source.unsplash.com/featured/?{keyword}
    encoded_keyword = urllib.parse.quote(keyword)
    return f"https://source.unsplash.com/{width}x{height}/?{encoded_keyword}"

def generate_picsum_url(seed=None, width=800, height=600):
    """生成 Picsum 图片 URL (备用)"""
    if seed:
        return f"https://picsum.photos/seed/{seed}/{width}/{height}"
    return f"https://picsum.photos/{width}/{height}"

def main():
    print("=" * 50)
    print("诗词配图生成器")
    print("=" * 50)
    
    # 加载数据
    files_to_process = [
        ('tangshi300.json', '唐诗三百首'),
        ('songci300.json', '宋词三百首'),
        ('guwen.json', '古文观止'),
    ]
    
    for filename, display_name in files_to_process:
        filepath = os.path.join(DATA_DIR, filename)
        if not os.path.exists(filepath):
            print(f"文件不存在: {filename}")
            continue
        
        print(f"\n处理 {display_name} ({filename})...")
        
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # guwen.json 有不同的结构
        if filename == 'guwen.json':
            poems = data.get('pieces', [])
        elif isinstance(data, list):
            poems = data
        else:
            poems = []
        
        print(f"  共有 {len(poems)} 篇诗词")
        
        # 为每首诗词生成图片URL
        updated_count = 0
        for poem in poems:
            if not poem.get('imageUrl'):
                keyword = get_image_keyword(poem)
                image_url = generate_unsplash_url(keyword)
                poem['imageUrl'] = image_url
                updated_count += 1
        
        print(f"  更新了 {updated_count} 个图片URL")
        
        # 保存更新后的数据
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"  已保存到 {filepath}")
    
    print("\n" + "=" * 50)
    print("完成!")
    print("=" * 50)

if __name__ == '__main__':
    main()
