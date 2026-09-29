import { Skeleton } from '@/components/ui/skeleton';

const STAT_CARD_COUNT = 4;

const StatCardSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: STAT_CARD_COUNT }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="w-full">
              <Skeleton className="mt-2 h-4 w-20" />
              <Skeleton className="mt-2 h-4 w-5" />
              <Skeleton className="mt-2 h-4 w-35" />
            </div>
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl">
              <Skeleton className="size-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCardSkeleton;
