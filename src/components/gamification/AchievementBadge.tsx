import React from 'react';
import { Achievement } from '@/types';
import { cn } from '@/utils';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = 'md',
  showName = true,
  className,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
  };

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div
        className={cn(
          'rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] flex items-center justify-center shadow-lg',
          'ring-4 ring-[var(--gold)]/20',
          sizeClasses[size]
        )}
      >
        <span role="img" aria-label={achievement.name}>
          {achievement.icon}
        </span>
      </div>
      {showName && (
        <div className="text-center">
          <div className="font-medium text-[var(--ink-primary)]">{achievement.name}</div>
          <div className="text-xs text-[var(--text-secondary)]">{achievement.description}</div>
        </div>
      )}
    </div>
  );
};

interface LockedAchievementProps {
  name: string;
  description: string;
  icon: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LockedAchievementBadge: React.FC<LockedAchievementProps> = ({
  name,
  description,
  icon,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
  };

  return (
    <div className={cn('flex flex-col items-center gap-2 opacity-50', className)}>
      <div
        className={cn(
          'rounded-full bg-[var(--bg-warm)] flex items-center justify-center',
          'ring-4 ring-[var(--ink-light)]/10 grayscale',
          sizeClasses[size]
        )}
      >
        <span role="img" aria-label={name}>
          {icon}
        </span>
      </div>
      <div className="text-center">
        <div className="font-medium text-[var(--ink-light)]">{name}</div>
        <div className="text-xs text-[var(--text-light)]">{description}</div>
      </div>
    </div>
  );
};
