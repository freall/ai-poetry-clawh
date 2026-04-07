#!/usr/bin/env python3
"""
转换古诗词数据为应用所需的格式
"""

import json
import os
import random

# 数据源路径 - 使用绝对路径
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
SOURCE_DIR = os.path.join(PROJECT_DIR, 'data', 'backup', 'chinese-poetry')
OUTPUT_DIR = os.path.join(PROJECT_DIR, 'data', 'poetry')

def convert_tangshi():
    """转换唐诗三百首"""
    with open(f'{SOURCE_DIR}/全唐诗/唐诗三百首.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    poems = []
    for item in data:
        poem = {
            'id': item.get('id', f"tang-{len(poems)}"),
            'title': item.get('title', ''),
            'category': 'shi',
            'dynasty': '唐',
            'author': {
                'name': item.get('author', ''),
            },
            'content': item.get('paragraphs', []),
            'translation': [],  # 待补充
            'annotation': [],
            'background': '',
            'difficulty': random.randint(1, 5),  # 随机难度
            'tags': item.get('tags', []),
            'imageUrl': '',
            'relatedIds': [],
            'questions': [],
            'schoolLevel': None
        }
        poems.append(poem)
    
    return poems

def convert_songci():
    """转换宋词三百首"""
    with open(f'{SOURCE_DIR}/宋词/宋词三百首.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    poems = []
    for i, item in enumerate(data):
        poem = {
            'id': f"ci-song-{i}",
            'title': item.get('rhythmic', item.get('title', '')),
            'category': 'ci',
            'dynasty': '宋',
            'author': {
                'name': item.get('author', ''),
            },
            'content': item.get('paragraphs', []),
            'translation': [],
            'annotation': [],
            'background': '',
            'difficulty': random.randint(1, 5),
            'tags': item.get('tags', []),
            'imageUrl': '',
            'relatedIds': [],
            'questions': [],
            'schoolLevel': None
        }
        poems.append(poem)
    
    return poems

def convert_yuanqu():
    """转换元曲"""
    with open(f'{SOURCE_DIR}/元曲/yuanqu.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 元曲数据可能是嵌套的
    if isinstance(data, dict):
        data = data.get('items', data.get('yuanqu', []))
    
    poems = []
    if isinstance(data, list):
        for i, item in enumerate(data):
            if isinstance(item, dict):
                poem = {
                    'id': f"qu-yuan-{i}",
                    'title': item.get('title', item.get('name', '')),
                    'category': 'qu',
                    'dynasty': '元',
                    'author': {
                        'name': item.get('author', item.get('dynasty', '元')),
                    },
                    'content': item.get('paragraphs', item.get('content', [])),
                    'translation': [],
                    'annotation': [],
                    'background': '',
                    'difficulty': random.randint(2, 5),
                    'tags': item.get('tags', []),
                    'imageUrl': '',
                    'relatedIds': [],
                    'questions': [],
                    'schoolLevel': None
                }
                poems.append(poem)
    
    return poems

def convert_lunyu():
    """转换论语"""
    with open(f'{SOURCE_DIR}/论语/lunyu.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 论语格式可能是章节形式的
    texts = []
    if isinstance(data, dict):
        for chapter in data.get(' chapters ', []):
            if isinstance(chapter, dict):
                texts.extend(chapter.get('paragraphs', []))
    elif isinstance(data, list):
        for item in data:
            if isinstance(item, dict):
                texts.extend(item.get('paragraphs', []))
    
    return [{
        'id': 'lunyu-1',
        'title': '论语',
        'category': 'wen',
        'dynasty': '春秋',
        'author': {'name': '孔子及其弟子'},
        'content': texts[:50],  # 取前50段
        'translation': [],
        'annotation': [],
        'background': '《论语》是儒家学派的经典著作之一，由孔子的弟子及其再传弟子编撰而成。',
        'difficulty': 3,
        'tags': ['论语', '儒家', '经典'],
        'imageUrl': '',
        'relatedIds': [],
        'questions': [],
        'schoolLevel': 'middle'
    }]

def save_json(data, filename):
    """保存JSON文件"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'Saved: {filepath} ({len(data)} items)')

def main():
    print('开始转换数据...')
    
    # 转换各类型数据
    tangshi = convert_tangshi()
    print(f'唐诗: {len(tangshi)} 首')
    
    songci = convert_songci()
    print(f'宋词: {len(songci)} 首')
    
    yuanqu = convert_yuanqu()
    print(f'元曲: {len(yuanqu)} 首')
    
    lunyu = convert_lunyu()
    print(f'论语: {len(lunyu)} 篇')
    
    # 保存数据
    save_json(tangshi, 'tangshi300.json')
    save_json(songci, 'songci300.json')
    save_json(yuanqu, 'yuanqu.json')
    save_json(lunyu, 'lunyu.json')
    
    # 保存所有数据合并
    all_poetry = tangshi + songci + yuanqu + lunyu
    save_json(all_poetry, 'all_poetry.json')
    
    print(f'\n总计: {len(all_poetry)} 篇')
    print('数据转换完成!')

if __name__ == '__main__':
    main()
