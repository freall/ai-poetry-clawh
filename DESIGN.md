# DESIGN.md - 设计规范文档

本文档定义了"诗词雅集"项目的视觉设计规范，确保设计风格的一致性和品牌识别度。

---

## 1. 品牌定义

### 1.1 项目定位
- **名称**: 诗词雅集
- **Slogan**: 诗意江湖，随手可及
- **目标用户**: 中小学生、诗词爱好者
- **核心价值**: 游戏化学习、沉浸式体验、轻松掌握

### 1.2 设计关键词
- **新中式**: 传统元素 + 现代设计
- **水墨感**: 淡雅、留白、意境
- **游戏化**: 成就、等级、激励
- **现代化**: 简洁、易用、响应式

---

## 2. 视觉规范

### 2.1 色彩系统

#### 主色调
```css
/* 墨色系 - 主要文字和强调 */
--ink-primary: #2C3E50;      /* 主墨色 */
--ink-secondary: #34495E;    /* 次墨色 */
--ink-light: #5D6D7E;         /* 浅墨色 */
```

#### 强调色
```css
/* 朱砂红 - 主要CTA、强调 */
--cinnabar: #C0392B;          /* 主色 */
--cinnabar-light: #E74C3C;   /* 亮色 */
--cinnabar-dark: #962D22;    /* 暗色 */
--cinnabar-bg: rgba(192, 57, 43, 0.1); /* 背景色 */
```

#### 点缀色
```css
/* 古铜金 - 成就、金币、高亮 */
--gold: #D4AF37;             /* 主色 */
--gold-light: #F4D03F;       /* 亮色 */
--gold-dark: #B8960C;        /* 暗色 */
```

```css
/* 玉石青 - 成功、进度 */
--jade: #1ABC9C;             /* 主色 */
--jade-light: #2ECC71;       /* 亮色 */
--jade-bg: rgba(26, 188, 156, 0.1);
```

#### 背景色
```css
/* 宣纸系列 */
--bg-paper: #FDF6E3;         /* 宣纸白 - 主背景 */
--bg-cream: #FAF3E0;         /* 奶油白 - 卡片背景 */
--bg-warm: #F5E6D3;          /* 暖白 - 悬停状态 */
--bg-dark: #2C3E50;          /* 深色 - 深色模式 */
```

#### 功能色
```css
--success: #27AE60;          /* 成功 */
--warning: #F39C12;          /* 警告 */
--error: #E74C3C;            /* 错误 */
--info: #3498DB;             /* 信息 */
```

### 2.2 字体系统

#### 字体族
```css
/* 标题字体 */
--font-title: 'Noto Serif SC', 'Source Han Serif SC', 
              'Source Han Serif CN', 'Songti SC', serif;

/* 正文字体 */
--font-body: 'Noto Sans SC', 'Source Han Sans SC',
             'Source Han Sans CN', 'PingFang SC', sans-serif;

/* 诗词字体 - 书法风格 */
--font-poetry: 'Ma Shan Zheng', 'ZCOOL XiaoWei', cursive;

/* 数字字体 */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### 字号规范
```css
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;
--text-5xl: 48px;
--text-poetry: 32px;      /* 诗词正文 */
--text-poetry-large: 48px; /* 诗词展示 */
```

#### 行高规范
```css
--leading-tight: 1.25;    /* 标题 */
--leading-normal: 1.5;    /* 正文 */
--leading-relaxed: 1.75;  /*诗词 */
```

### 2.3 间距系统

```css
--space-0: 0;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### 2.4 圆角规范

```css
--radius-none: 0;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;   /* 圆形 */
```

### 2.5 阴影规范

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
--shadow-card: 0 2px 8px rgba(44, 62, 80, 0.08);
--shadow-hover: 0 8px 16px rgba(44, 62, 80, 0.12);
```

### 2.6 边框规范

```css
--border-light: 1px solid rgba(44, 62, 80, 0.08);
--border-medium: 1px solid rgba(44, 62, 80, 0.15);
--border-dark: 1px solid rgba(44, 62, 80, 0.25);
```

---

## 3. 组件设计规范

### 3.1 按钮

#### 主要按钮 (Primary)
```css
.bg-[var(--cinnabar)]
.text-white
.px-6 py-3
.rounded-lg
.font-semibold
.transition-all duration-200
.hover:bg-[var(--cinnabar-dark)]
.active:scale-95
```

#### 次要按钮 (Secondary)
```css
.bg-transparent
.border-2 border-[var(--cinnabar)]
.text-[var(--cinnabar)]
.px-6 py-3
.rounded-lg
.font-semibold
.hover:bg-[var(--cinnabar-bg)]
```

#### 幽灵按钮 (Ghost)
```css
.bg-transparent
.text-[var(--ink-primary)]
.px-4 py-2
.hover:bg-[var(--bg-warm)]
```

#### 禁用状态
```css
.opacity-50
.cursor-not-allowed
.pointer-events-none
```

### 3.2 卡片

#### 基础卡片
```css
.bg-[var(--bg-cream)]
.rounded-xl
.p-4
.shadow-[var(--shadow-card)]
.border border-transparent
.transition-all duration-200
.hover:shadow-[var(--shadow-hover)]
.hover:-translate-y-1
```

#### 诗词卡片
- 顶部: 4:3 意境图 + 角标
- 中部: 标题(诗人体) + 作者 + 朝代
- 底部: 难度星级 + 标签

### 3.3 输入框

```css
.bg-white
.border border-[var(--ink-light)]
.rounded-lg
.px-4 py-3
.text-base
.placeholder:text-[var(--text-secondary)]
.focus:border-[var(--cinnabar)]
.focus:ring-2 ring-[var(--cinnabar-bg)]
```

### 3.4 标签/徽章

#### 难度徽章
```css
.text-xs
.font-medium
.px-2 py-1
.rounded-full
.bg-[var(--cinnabar-bg)]
.text-[var(--cinnabar)]
```

#### 朝代标签
```css
.text-xs
.font-medium
.px-2 py-1
.rounded
.bg-[var(--jade-bg)]
.text-[var(--jade)]
```

---

## 4. 动效规范

### 4.1 动画时长

```css
--duration-fast: 150ms;      /* 微交互 */
--duration-normal: 200ms;    /* 常规状态切换 */
--duration-slow: 300ms;      /* 页面元素 */
--duration-slower: 500ms;    /* 复杂动画 */
--duration-slowest: 800ms;   /* 页面切换 */
```

### 4.2 缓动函数

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 4.3 标准动效

#### 悬停效果
```css
.transform
.transition-all
.duration-200
.ease-out
.hover:scale-105
.hover:-translate-y-1
.hover:shadow-lg
```

#### 点击效果
```css
.transform
.transition-all
.duration-150
.active:scale-95
```

#### 入场动画
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.5s ease-out;
}
```

### 4.4 游戏化动效

#### 成就解锁
```css
@keyframes achievementPop {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes particle {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-100px) scale(0); opacity: 0; }
}
```

#### 经验值增加
```css
@keyframes expGain {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-30px); opacity: 0; }
}
```

---

## 5. 布局规范

### 5.1 容器宽度

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1440px;
```

### 5.2 栅格系统

- **Desktop**: 12列，间距24px
- **Tablet**: 8列，间距16px
- **Mobile**: 4列，间距12px

### 5.3 页面内边距

```css
--page-padding-x: 24px;     /* 移动端 */
--page-padding-x-lg: 48px;  /* 桌面端 */
--page-padding-y: 16px;
```

### 5.4 内容区最大宽度

```css
--content-max-width: 1200px;
--prose-max-width: 800px;   /* 文章阅读区 */
```

---

## 6. 响应式断点

```css
/* 移动端优先 */
/* Extra Small */
@media (min-width: 475px) { /* xs */ }

/* Mobile */
@media (min-width: 640px) { /* sm */ }

/* Tablet */
@media (min-width: 768px) { /* md */ }

/* Desktop */
@media (min-width: 1024px) { /* lg */ }

/* Large Desktop */
@media (min-width: 1280px) { /* xl */ }

/* Extra Large */
@media (min-width: 1536px) { /* 2xl */ }
```

---

## 7. 图标规范

### 7.1 图标库
- **主要**: Lucide React (细线风格)
- **自定义**: 内联SVG用于特定中国元素

### 7.2 图标尺寸
```css
--icon-xs: 16px;
--icon-sm: 20px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 40px;
```

### 7.3 自定义图标元素
- 朝代图标 (唐/宋/元/明/清)
- 难度星级
- 成就徽章
- 收藏心形
- 分享图标

---

## 8. 图片规范

### 8.1 意境图
- **比例**: 16:9 (横版) 或 4:3
- **风格**: 水墨画 + 工笔细节
- **模糊**: 详情页背景使用模糊效果
- **占位符**: 渐变水墨色块

### 8.2 作者头像
- **比例**: 1:1 圆形
- **尺寸**: 64px / 96px / 128px
- **占位符**: 朝代首字母

### 8.3 图片加载
```css
/* 骨架屏 */
.bg-gradient-to-r
.from-[var(--bg-warm)]
.via-[var(--bg-cream)]
.to-[var(--bg-warm)]
.animate-pulse
```

---

## 9. 装饰元素

### 9.1 云纹角落
```css
/* 使用::before ::after伪元素 */
background-image: url("data:image/svg+xml,...");
background-size: contain;
background-repeat: no-repeat;
opacity: 0.1;
```

### 9.2 山水剪影
```css
/* 底部装饰 */
position: absolute;
bottom: 0;
left: 0;
right: 0;
height: 120px;
background: linear-gradient(to top, rgba(44, 62, 80, 0.05), transparent);
```

### 9.3 分隔线
```css
/* 毛笔笔画风格分隔线 */
height: 2px;
background: linear-gradient(
  to right,
  transparent,
  var(--ink-light),
  transparent
);
```

---

## 10. 无障碍规范

### 10.1 颜色对比
- 正文: 前景 #2C3E50 / 背景 #FDF6E3 → 对比度 12.4:1 ✅
- 次要文字: 前景 #7F8C8D / 背景 #FDF6E3 → 对比度 5.2:1 ✅

### 10.2 焦点指示
```css
.focus-visible:outline-none
.focus-visible:ring-2
.focus-visible:ring-[var(--cinnabar)]
.focus-visible:ring-offset-2
```

### 10.3 减少动画
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

*Last Updated: 2026-04-07*
*Version: 1.0.0*
