import { School, UserRound, BookOpen, Users } from 'lucide-react';
import type { StatCard as StatCardType } from '@/features/dashboard/types/dashboard';
import StatCard from '@/features/dashboard/components/StatCard';
import useDashboardStats from '@/features/dashboard/hooks/useDashboardStats';
import StatCardSkeleton from '@/features/dashboard/components/StatCardSkeleton';
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast';

const DashboardStats = () => {
  const { data, isLoading, error } = useDashboardStats();

  useQueryErrorToast(error);

  if (isLoading) {
    return <StatCardSkeleton />;
  }

  const stats: StatCardType[] = [
    {
      title: 'Students',
      value: data?.students ?? 0,
      description: 'Total registered students',
      icon: School,
      color: 'blue',
    },
    {
      title: 'Teachers',
      value: data?.teachers ?? 0,
      description: 'Active teachers',
      icon: UserRound,
      color: 'green',
    },
    {
      title: 'Courses',
      value: data?.courses ?? 0,
      description: 'Available courses',
      icon: BookOpen,
      color: 'orange',
    },
    {
      title: 'Enrollments',
      value: data?.enrollments ?? 0,
      description: 'Total course enrollments',
      icon: Users,
      color: 'purple',
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
