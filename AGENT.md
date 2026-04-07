# AGENT.md - AI协同开发规范

本文档定义了"诗词雅集"项目的开发原则，确保多个AI代理能够有效协同，保持代码质量和一致性。

---

## 1. 项目概述

**项目名称**: 诗词雅集 (Chinese Classical Poetry Learning Platform)
**项目路径**: `/home/chenqiurui/.openclaw/workspace/chinese-poetry-learning/`
**开发周期**: 长期项目，分阶段迭代

---

## 2. 开发原则

### 2.1 代码规范

#### TypeScript规范
- 所有组件使用 **TypeScript**
- 禁止使用 `any` 类型，必须指定具体类型
- 组件必须定义 Props 接口
- 使用 `interface` 而非 `type` 定义对象类型

```typescript
// ✅ 正确示例
interface PoetryCardProps {
  poetry: Poetry;
  isLearned?: boolean;
  onClick?: () => void;
}

// ❌ 错误示例
interface Props {
  data: any;
}
```

#### 文件命名
- 组件文件: `PascalCase.tsx` (如 `PoetryCard.tsx`)
- 工具文件: `camelCase.ts` (如 `formatDate.ts`)
- 类型定义: `types.ts`
- 常量文件: `constants.ts`

#### 代码风格
- 使用 **ESLint + Prettier**
- 缩进: 2空格
- 引号: 单引号
- 分号: 必须
- 最大行长: 100字符

### 2.2 组件规范

#### 组件结构
```typescript
// 1. 导入
import React from 'react';
import { cn } from '@/utils/cn';

// 2. 类型定义
interface ComponentNameProps {
  // ...
}

// 3. 组件定义
export const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  // 4. Hooks
  const [state, setState] = useState('');
  
  // 5. 事件处理
  const handleClick = () => {
    // ...
  };
  
  // 6. 渲染
  return (
    <div className="...">
      {/* ... */}
    </div>
  );
};

// 7. 导出
export default ComponentName;
```

#### 组件设计原则
- **单一职责**: 每个组件只做一件事
- **可复用性**: 优先提取公共组件
- **可测试性**: 组件逻辑与UI分离
- **无副作用**: 组件不直接修改外部状态

### 2.3 状态管理

#### Zustand Store规范
```typescript
// stores/poetryStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PoetryState {
  learnedIds: string[];
  favoriteIds: string[];
  addLearned: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const usePoetryStore = create<PoetryState>()(
  persist(
    (set) => ({
      learnedIds: [],
      favoriteIds: [],
      addLearned: (id) => set((state) => ({
        learnedIds: [...state.learnedIds, id]
      })),
      toggleFavorite: (id) => set((state) => ({
        favoriteIds: state.favoriteIds.includes(id)
          ? state.favoriteIds.filter(i => i !== id)
          : [...state.favoriteIds, id]
      })),
    }),
    { name: 'poetry-storage' }
  )
);
```

### 2.4 样式规范

#### Tailwind CSS
- 使用 Tailwind 进行样式开发
- 禁止使用内联 style，除非动态值
- 使用 CSS Variables 定义主题色
- 响应式设计使用 Tailwind 断点

```typescript
// ✅ 正确
<div className="flex items-center justify-between px-4 py-2">

// ❌ 错误
<div style={{ display: 'flex', padding: '16px' }}>
```

#### 主题变量使用
```typescript
// 所有颜色必须使用CSS变量
className="text-[var(--cinnabar)]"
className="bg-[var(--bg-paper)]"
```

### 2.5 Git提交规范

#### 提交信息格式
```
<type>(<scope>): <subject>

[type]: feat | fix | docs | style | refactor | test | chore
[scope]: 组件/功能区域
[subject]: 简短描述
```

#### 示例
```
feat(poetry-detail): 添加诗词详情页意境图展示
fix(search): 修复搜索结果排序问题
docs(readme): 更新项目说明文档
style(card): 优化卡片悬停动效
refactor(store): 重构用户进度状态管理
```

### 2.6 安全检查

#### 提交前检查清单
- [ ] 代码无 `console.log` 调试语句
- [ ] 无硬编码敏感信息
- [ ] API密钥使用环境变量
- [ ] 用户输入已做校验
- [ ] 无暴露内部路径的日志
- [ ] 第三方依赖已审核

#### 路径安全
- 所有文件路径使用相对路径
- 禁止在代码中暴露服务器路径
- 用户上传文件必须验证类型和大小

### 2.7 测试规范

#### 测试要求
- 新功能必须附带测试用例
- 修复Bug必须附带回归测试
- 测试覆盖率目标: >70%

#### 测试文件命名
```
PoetryCard.test.tsx
useSearch.test.ts
formatDate.test.ts
```

---

## 3. 协作流程

### 3.1 任务分配原则

1. **大型任务拆分为小任务**: 每个任务不超过2小时
2. **单一任务单一职责**: 一个任务只改一个文件/功能
3. **任务标记状态**: TODO | IN_PROGRESS | DONE

### 3.2 代码审查

- 提交前自我审查代码
- 确保符合本规范
- 确保测试通过

### 3.3 文档更新

- 新增组件需更新文档
- API变更需更新文档
- 设计变更需更新 DESIGN.md

---

## 4. 目录结构规范

```
src/
├── components/          # 组件目录
│   ├── ui/             # 基础UI组件 (Button, Input, Card等)
│   ├── layout/         # 布局组件 (Header, Footer, Sidebar等)
│   ├── poetry/         # 诗词相关组件
│   ├── practice/       # 练习相关组件
│   └── gamification/   # 游戏化组件
├── pages/              # 页面组件
├── hooks/              # 自定义Hooks
├── stores/             # Zustand状态库
├── data/               # 静态数据
│   ├── poetry/         # 诗词JSON
│   └── questions/      # 练习题JSON
├── utils/              # 工具函数
├── types/              # TypeScript类型定义
└── styles/             # 全局样式
```

---

## 5. 性能要求

- 首屏加载 < 3秒
- 路由切换 < 100ms
- 图片懒加载
- 组件按需加载 (React.lazy)
- 列表虚拟化 (100+条数据时)

---

## 6. 可访问性

- 所有图片必须有 alt 属性
- 键盘导航支持
- 颜色对比度符合 WCAG 2.1 AA标准
- 表单标签关联
- 错误提示语义化

---

## 7. 错误处理

```typescript
// API请求错误处理
try {
  const data = await fetchPoetry(id);
  setPoetry(data);
} catch (error) {
  console.error('Failed to fetch poetry:', error);
  toast.error('加载失败，请重试');
}

// 组件错误边界
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // 上报错误
    logError(error, errorInfo);
  }
}
```

---

*Last Updated: 2026-04-07*
*Version: 1.0.0*
