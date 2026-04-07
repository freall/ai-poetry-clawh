import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Poetry } from '@/types';
import { usePoetryStore } from '@/stores/poetryStore';
import { cn } from '@/utils';

interface PoetryCardProps {
  poetry: Poetry;
  showLearnedBadge?: boolean;
}

export const PoetryCard: React.FC<PoetryCardProps> = ({ poetry, showLearnedBadge = true }) => {
  const { isFavorite, toggleFavorite, isLearned } = usePoetryStore();
  const favorite = isFavorite(poetry.id);
  const learned = isLearned(poetry.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(poetry.id);
  };

  const renderStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-3 h-3',
          i < difficulty ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-[var(--text-light)]'
        )}
      />
    ));
  };

  const categoryLabel: Record<string, string> = {
    shi: '诗',
    ci: '词',
    qu: '曲',
    wen: '文',
  };

  return (
    <Link to={`/poetry/${poetry.id}`} className="block group">
      <article className="card overflow-hidden group-hover:-translate-y-1">
        {/* Image Area */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3">
          {poetry.imageUrl ? (
            <img
              src={poetry.imageUrl}
              alt={poetry.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--bg-warm)] to-[var(--bg-cream)] flex items-center justify-center">
              <span className="text-4xl font-poetry text-[var(--ink-light)] opacity-50">
                {poetry.title.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Learned Badge */}
          {showLearnedBadge && learned && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-[var(--jade)] text-white text-xs font-medium rounded-full">
              已学
            </div>
          )}
          
          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className={cn(
              'absolute top-2 right-2 p-1.5 rounded-full transition-all',
              favorite 
                ? 'bg-[var(--cinnabar)] text-white' 
                : 'bg-white/80 text-[var(--text-secondary)] hover:text-[var(--cinnabar)]'
            )}
            aria-label={favorite ? '取消收藏' : '收藏'}
          >
            <Heart className={cn('w-4 h-4', favorite && 'fill-current')} />
          </button>
          
          {/* Category Badge */}
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-[var(--ink-primary)]/70 text-white text-xs font-medium rounded">
            {categoryLabel[poetry.category] || poetry.category}
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-2">
          <h3 className="font-title text-lg font-semibold text-ink-primary group-hover:text-[var(--cinnabar)] transition-colors line-clamp-1">
            {poetry.title}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <span>{poetry.author.name}</span>
            <span>·</span>
            <span>{poetry.dynasty}</span>
          </div>
          
          <div className="flex items-center justify-between">
            {/* Difficulty Stars */}
            <div className="flex items-center gap-0.5">
              {renderStars(poetry.difficulty)}
            </div>
            
            {/* School Level Tag */}
            {poetry.schoolLevel && (
              <span className={cn(
                'text-xs px-2 py-0.5 rounded',
                poetry.schoolLevel === 'primary' && 'bg-blue-100 text-blue-700',
                poetry.schoolLevel === 'middle' && 'bg-purple-100 text-purple-700',
                poetry.schoolLevel === 'high' && 'bg-orange-100 text-orange-700'
              )}>
                {poetry.schoolLevel === 'primary' && '小学'}
                {poetry.schoolLevel === 'middle' && '初中'}
                {poetry.schoolLevel === 'high' && '高中'}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};
