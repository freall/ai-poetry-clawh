import React from 'react';
import { Poetry } from '@/types';
import { cn } from '@/utils';

interface PoetryDisplayProps {
  poetry: Poetry;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

export const PoetryDisplay: React.FC<PoetryDisplayProps> = ({
  poetry,
  layout = 'horizontal',
  className,
}) => {
  const isVertical = layout === 'vertical';

  return (
    <div
      className={cn(
        'poetry-container',
        isVertical ? 'writing-mode-vertical' : '',
        className
      )}
    >
      <div
        className={cn(
          'poetry-text font-poetry text-[var(--ink-primary)]',
          isVertical 
            ? 'text-3xl md:text-4xl writing-mode-vertical inline-block py-8 px-4' 
            : 'text-2xl md:text-3xl leading-loose md:leading-loose space-y-2 md:space-y-4'
        )}
        style={isVertical ? { 
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          letterSpacing: '0.3em',
          lineHeight: '2'
        } : undefined}
      >
        {poetry.content.map((line, index) => (
          <span 
            key={index} 
            className={cn(
              'inline-block',
              !isVertical && 'block'
            )}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
};
