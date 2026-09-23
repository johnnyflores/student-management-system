import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/features/dashboard/services/dashboardApi';

export default function useDashboardStats() {
  const dashboardStatsQuery = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => getDashboardStats(),
  });

  return {
    data: dashboardStatsQuery.data ?? null,
    isLoading: dashboardStatsQuery.isLoading,
    isError: dashboardStatsQuery.isError,
    error: dashboardStatsQuery.error,
  };
}
