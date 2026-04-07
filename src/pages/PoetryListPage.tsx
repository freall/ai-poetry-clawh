import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { poems as allPoems } from '@/data/poetry/sample';
import { PoetryCard } from '@/components/poetry/PoetryCard';
import { cn } from '@/utils';

const categories = [
  { id: 'all', name: '全部', count: allPoems.length },
  { id: 'shi', name: '诗', count: allPoems.filter(p => p.category === 'shi').length },
  { id: 'ci', name: '词', count: allPoems.filter(p => p.category === 'ci').length },
  { id: 'wen', name: '文', count: allPoems.filter(p => p.category === 'wen').length },
];

const dynasties = ['全部', '唐', '宋', '元', '明', '清'];

const schoolLevels = [
  { id: 'all', name: '全部' },
  { id: 'primary', name: '小学' },
  { id: 'middle', name: '初中' },
  { id: 'high', name: '高中' },
];

export const PoetryListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedDynasty, setSelectedDynasty] = useState('全部');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState<'default' | 'difficulty' | 'title'>('default');

  const filteredPoems = useMemo(() => {
    let result = [...allPoems];

    // 分类筛选
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 朝代筛选
    if (selectedDynasty !== '全部') {
      result = result.filter(p => p.dynasty === selectedDynasty);
    }

    // 学段筛选
    if (selectedLevel !== 'all') {
      result = result.filter(p => p.schoolLevel === selectedLevel);
    }

    // 搜索筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.author.name.toLowerCase().includes(query) ||
        p.content.some(line => line.includes(query))
      );
    }

    // 排序
    if (sortBy === 'difficulty') {
      result.sort((a, b) => b.difficulty - a.difficulty);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title, 'zh'));
    }

    return result;
  }, [selectedCategory, selectedDynasty, selectedLevel, searchQuery, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-paper)]">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-[var(--bg-paper)]/95 backdrop-blur-sm border-b border-[var(--ink-light)]/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索诗词、作者、内容..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-[var(--ink-light)]/20 focus:border-[var(--cinnabar)] focus:ring-2 focus:ring-[var(--cinnabar-bg)] outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--ink-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  selectedCategory === cat.id
                    ? 'bg-[var(--cinnabar)] text-white'
                    : 'bg-[var(--bg-warm)] text-[var(--ink-secondary)] hover:bg-[var(--bg-cream)]'
                )}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1',
                showFilters || selectedDynasty !== '全部' || selectedLevel !== 'all'
                  ? 'bg-[var(--jade)] text-white'
                  : 'bg-[var(--bg-warm)] text-[var(--ink-secondary)]'
              )}
            >
              <Filter className="w-4 h-4" />
              筛选
            </button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-4">
                  {/* Dynasty Filter */}
                  <div>
                    <div className="text-sm text-[var(--text-secondary)] mb-2">朝代</div>
                    <div className="flex flex-wrap gap-2">
                      {dynasties.map((dynasty) => (
                        <button
                          key={dynasty}
                          onClick={() => setSelectedDynasty(dynasty)}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-sm transition-all',
                            selectedDynasty === dynasty
                              ? 'bg-[var(--ink-primary)] text-white'
                              : 'bg-[var(--bg-cream)] text-[var(--ink-secondary)]'
                          )}
                        >
                          {dynasty}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* School Level Filter */}
                  <div>
                    <div className="text-sm text-[var(--text-secondary)] mb-2">学段</div>
                    <div className="flex flex-wrap gap-2">
                      {schoolLevels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => setSelectedLevel(level.id)}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-sm transition-all',
                            selectedLevel === level.id
                              ? 'bg-[var(--jade)] text-white'
                              : 'bg-[var(--bg-cream)] text-[var(--ink-secondary)]'
                          )}
                        >
                          {level.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <div className="text-sm text-[var(--text-secondary)] mb-2">排序</div>
                    <div className="flex gap-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="px-3 py-1.5 rounded-lg text-sm bg-white border border-[var(--ink-light)]/20"
                      >
                        <option value="default">默认</option>
                        <option value="difficulty">按难度</option>
                        <option value="title">按标题</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[var(--text-secondary)]">
            共 {filteredPoems.length} 篇
          </span>
        </div>

        {filteredPoems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-[var(--ink-primary)] mb-2">
              没有找到匹配的诗词
            </h3>
            <p className="text-[var(--text-secondary)]">
              试试调整筛选条件或搜索关键词
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredPoems.map((poem) => (
                <motion.div
                  key={poem.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <PoetryCard poetry={poem} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
