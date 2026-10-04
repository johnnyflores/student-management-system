import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/features/dashboard/services/dashboardApi';

export default function useDashboardStats() {
  const dashboardStatsQuery = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => getDashboardStats(),
    refetchInterval: 60000, // Refetch every 60 seconds
  });

  return {
    data: dashboardStatsQuery.data ?? null,
    isLoading: dashboardStatsQuery.isLoading,
    isError: dashboardStatsQuery.isError,
    error: dashboardStatsQuery.error,
  };
}
