import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/utils';

interface SceneImageProps {
  imageUrl?: string;
  title: string;
  className?: string;
  onRegenerate?: () => void;
}

export const SceneImage: React.FC<SceneImageProps> = ({
  imageUrl,
  title,
  className,
  onRegenerate,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className={cn('relative overflow-hidden rounded-xl', className)}>
      {/* Image or Placeholder */}
      {imageUrl && !error ? (
        <>
          {/* Main Image */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onLoad={handleLoad}
            onError={handleError}
          />
          
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-[var(--bg-warm)] animate-pulse flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-[var(--gold)] mx-auto mb-2 animate-pulse" />
                <span className="text-sm text-[var(--text-secondary)]">正在生成意境图...</span>
              </div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-primary)]/40 via-transparent to-transparent" />
        </>
      ) : (
        /* Placeholder */
        <div className="w-full h-full bg-gradient-to-br from-[var(--bg-warm)] via-[var(--bg-cream)] to-[var(--bg-paper)] flex flex-col items-center justify-center min-h-[200px]">
          {/* Ink wash decoration */}
          <svg className="w-32 h-32 text-[var(--ink-light)] opacity-20 mb-4" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 10 Q 60 50 50 90 Q 40 50 50 10" fill="currentColor" opacity="0.3" />
          </svg>
          <span className="text-xl font-poetry text-[var(--ink-light)] opacity-50">
            {title}
          </span>
          <span className="text-sm text-[var(--text-secondary)] mt-2">
            意境图待生成
          </span>
        </div>
      )}

      {/* Regenerate Button */}
      {onRegenerate && imageUrl && (
        <button
          onClick={onRegenerate}
          className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-sm text-[var(--ink-secondary)] hover:bg-white transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          重新生成
        </button>
      )}
    </div>
  );
};
