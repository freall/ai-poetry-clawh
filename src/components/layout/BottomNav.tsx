import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, PenTool, User } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/poetry', icon: BookOpen, label: '诗词' },
  { path: '/search', icon: PenTool, label: '练习' },
  { path: '/profile', icon: User, label: '我的' },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--ink-light)]/10 z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center gap-1 py-2 px-4 transition-colors ${
              isActive(path)
                ? 'text-[var(--cinnabar)]'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive(path) ? 'scale-110' : ''} transition-transform`} />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
