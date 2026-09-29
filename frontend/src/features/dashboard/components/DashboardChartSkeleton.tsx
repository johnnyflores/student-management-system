import { Skeleton } from '@/components/ui/skeleton';

const STAT_CHART_COUNT = 4;

const DashboardChartSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-4  gap-4">
      {Array.from({ length: STAT_CHART_COUNT }).map((_, index) => (
        <div key={index}>
          <div className="w-full gap-4 flex flex-col items-center">
            <Skeleton className="mt-2 h-75 w-20 sm:w-40 lg:w-60" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardChartSkeleton;
