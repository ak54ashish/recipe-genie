const SkeletonCard = () => (
  <div className="bg-card rounded-lg overflow-hidden shadow-card">
    <div className="aspect-[4/3] bg-muted animate-shimmer bg-gradient-to-r from-muted via-secondary to-muted bg-[length:200%_100%]" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-muted rounded w-3/4 animate-shimmer bg-gradient-to-r from-muted via-secondary to-muted bg-[length:200%_100%]" />
      <div className="flex gap-3">
        <div className="h-4 bg-muted rounded w-16 animate-shimmer bg-gradient-to-r from-muted via-secondary to-muted bg-[length:200%_100%]" />
        <div className="h-4 bg-muted rounded w-16 animate-shimmer bg-gradient-to-r from-muted via-secondary to-muted bg-[length:200%_100%]" />
      </div>
      <div className="h-3 bg-muted rounded w-full animate-shimmer bg-gradient-to-r from-muted via-secondary to-muted bg-[length:200%_100%]" />
    </div>
  </div>
);

interface LoadingGridProps {
  count?: number;
}

const LoadingGrid = ({ count = 6 }: LoadingGridProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default LoadingGrid;
