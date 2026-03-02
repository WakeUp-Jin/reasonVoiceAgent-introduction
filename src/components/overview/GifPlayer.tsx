import { useState } from 'react';
import { Loader2, Maximize2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/src/components/ui/dialog';

interface GifPlayerProps {
  gifUrl: string;
  title?: string;
  className?: string;
}

export const GifPlayer: React.FC<GifPlayerProps> = ({
  gifUrl,
  title = '演示动画',
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleClick = () => {
    if (!hasError && !isLoading) {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <div
        className={cn(
          'group relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-neutral-100 shadow-sm transition-all duration-200 hover:shadow-md',
          className
        )}
        onClick={handleClick}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="flex flex-col items-center justify-center gap-2 text-neutral-400">
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">加载失败</span>
          </div>
        )}

        {/* GIF Image */}
        {!hasError && (
          <>
            <img
              src={gifUrl}
              alt={title}
              className={cn(
                'h-full w-full object-cover transition-opacity duration-300',
                isLoading ? 'opacity-0' : 'opacity-100'
              )}
              onLoad={handleLoad}
              onError={handleError}
            />

            {/* Hover Overlay with Zoom Icon */}
            {!isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover:bg-black/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/0 shadow-lg transition-all duration-200 group-hover:bg-white/90">
                  <Maximize2 className="h-6 w-6 text-black opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[90vw] p-0">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={gifUrl}
              alt={title}
              className="h-full w-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
