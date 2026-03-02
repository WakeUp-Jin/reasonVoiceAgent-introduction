import { cn } from '@/src/lib/utils';

interface ComparisonCardProps {
  variant: 'traditional' | 'ai';
  title: string;
  description: string;
  tags?: string[];
  className?: string;
}

export function ComparisonCard({
  variant,
  title,
  description,
  tags = [],
  className,
}: ComparisonCardProps) {
  const isTraditional = variant === 'traditional';

  return (
    <div
      className={cn(
        'rounded-lg bg-neutral-100 p-5 transition-all duration-200 hover:shadow-sm sm:p-6',
        className
      )}
    >
      {/* Title */}
      <h3 className="text-base font-medium sm:text-lg">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-neutral-400 sm:mt-3">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                'rounded bg-neutral-200 px-2 py-0.5 text-xs text-neutral-500 sm:px-2.5 sm:py-1',
                isTraditional
                  ? 'bg-neutral-200 text-neutral-500'
                  : 'bg-neutral-800 text-neutral-300'
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
