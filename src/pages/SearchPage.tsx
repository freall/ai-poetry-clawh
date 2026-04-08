import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { poems as allPoems } from '@/data/poetry/index';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // 热门搜索词
  const hotSearches = ['静夜思', '苏轼', '水调歌头', '春晓', '登鹳雀楼', '岳阳楼记'];

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    
    const q = query.toLowerCase();
    return allPoems.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.author.name.toLowerCase().includes(q) ||
      p.content.some(line => line.toLowerCase().includes(q)) ||
      p.tags.some(tag => tag.toLowerCase().includes(q))
    ).slice(0, 20);
  }, [query]);

  const handleSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setQuery(searchQuery);
    setShowResults(true);
    
    // 添加到最近搜索
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 10);
    });
  }, []);

  const handleClearSearch = () => {
    setQuery('');
    setShowResults(false);
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    handleSearch(searchTerm);
  };

  const handleHotSearchClick = (searchTerm: string) => {
    handleSearch(searchTerm);
  };

  const handleResultClick = (poetryId: string) => {
    navigate(`/poetry/${poetryId}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-paper)]">
      {/* Search Header */}
      <div className="sticky top-14 z-40 bg-[var(--bg-paper)] border-b border-[var(--ink-light)]/10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(e.target.value.length >= 2);
              }}
              onFocus={() => {
                if (query.length >= 2) setShowResults(true);
              }}
              placeholder="搜索诗词、作者、内容..."
              autoFocus
              className="w-full pl-12 pr-12 py-3 bg-[var(--bg-cream)] rounded-xl border border-[var(--ink-light)]/20 focus:border-[var(--cinnabar)] focus:ring-2 focus:ring-[var(--cinnabar-bg)] outline-none transition-all text-lg"
            />
            {query && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--ink-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {showResults && results.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[var(--text-secondary)]">
                  找到 {results.length} 条结果
                </span>
              </div>

              <div className="space-y-3">
                {results.map((poem) => (
                  <motion.div
                    key={poem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <button
                      onClick={() => handleResultClick(poem.id)}
                      className="w-full bg-white rounded-xl p-4 text-left hover:shadow-md transition-all flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--cinnabar-bg)] to-[var(--bg-warm)] flex items-center justify-center text-xl font-poetry text-[var(--cinnabar)]">
                        {poem.title.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[var(--ink-primary)]">{poem.title}</div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          {poem.author.name} · {poem.dynasty}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)] truncate mt-1">
                          {poem.content.slice(0, 2).join('')}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[var(--text-light)]" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : showResults && results.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-medium mb-2">没有找到匹配的诗词</h3>
              <p className="text-[var(--text-secondary)]">
                试试其他关键词，比如诗人名字或诗句内容
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-[var(--text-secondary)]" />
                    <span className="text-sm text-[var(--text-secondary)]">最近搜索</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className="px-3 py-1.5 bg-[var(--bg-cream)] rounded-full text-sm text-[var(--ink-secondary)] hover:bg-[var(--bg-warm)] transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Hot Searches */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[var(--cinnabar)]" />
                  <span className="text-sm text-[var(--text-secondary)]">热门搜索</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hotSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleHotSearchClick(search)}
                      className="px-3 py-1.5 bg-gradient-to-r from-[var(--cinnabar-bg)] to-[var(--bg-warm)] rounded-full text-sm text-[var(--cinnabar)] hover:from-[var(--cinnabar)] hover:to-[var(--cinnabar)] hover:text-white transition-all"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Authors */}
              <div className="mt-8">
                <h3 className="font-medium mb-4">热门诗人</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: '李白', desc: '诗仙', count: 30 },
                    { name: '杜甫', desc: '诗圣', count: 25 },
                    { name: '苏轼', desc: '东坡居士', count: 20 },
                    { name: '王维', desc: '诗佛', count: 18 },
                    { name: '白居易', desc: '诗魔', count: 15 },
                    { name: '李清照', desc: '易安居士', count: 12 },
                  ].map((author) => (
                    <button
                      key={author.name}
                      onClick={() => handleSearch(author.name)}
                      className="bg-white rounded-xl p-4 text-left hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-white font-bold mb-2">
                        {author.name.charAt(0)}
                      </div>
                      <div className="font-medium text-sm">{author.name}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{author.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
