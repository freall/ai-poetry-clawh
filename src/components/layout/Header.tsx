import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { usePoetryStore } from '@/stores/poetryStore';
import { calculateLevel } from '@/utils';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { exp, levelName } = usePoetryStore();
  const { progress } = calculateLevel(exp);

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-paper)]/95 backdrop-blur-sm border-b border-ink-light/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-[var(--cinnabar)] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-white font-title font-bold text-lg">诗</span>
          </div>
          <span className="font-title text-xl font-semibold text-ink-primary hidden sm:block">
            诗词雅集
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-ink-primary hover:text-[var(--cinnabar)] transition-colors font-medium"
          >
            首页
          </Link>
          <Link 
            to="/poetry" 
            className="text-ink-primary hover:text-[var(--cinnabar)] transition-colors font-medium"
          >
            诗词
          </Link>
          <Link 
            to="/search" 
            className="text-ink-primary hover:text-[var(--cinnabar)] transition-colors font-medium"
          >
            搜索
          </Link>
          <Link 
            to="/profile" 
            className="text-ink-primary hover:text-[var(--cinnabar)] transition-colors font-medium"
          >
            我的
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button
            onClick={handleSearchClick}
            className="p-2 rounded-lg hover:bg-[var(--bg-warm)] transition-colors"
            aria-label="搜索"
          >
            <Search className="w-5 h-5 text-ink-secondary" />
          </button>

          {/* User Progress */}
          <Link 
            to="/profile"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--bg-warm)] transition-colors"
          >
            {/* Level Badge */}
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 transform -rotate-90">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-[var(--bg-warm)]"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${progress * 1.0} 100`}
                  className="text-[var(--gold)] transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-[var(--gold)]">
                  {levelName}
                </span>
              </div>
            </div>
            {/* Mobile hide */}
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium text-ink-primary">{levelName}</span>
              <span className="text-xs text-[var(--text-secondary)]">{exp} 经验</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
