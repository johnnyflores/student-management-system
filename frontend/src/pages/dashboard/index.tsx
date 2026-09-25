import PageLayout from '@/components/PageLayout';
import DashboardQuickActions from '@/features/dashboard/components/DashboardQuickActions';
import DashboardRecentStudents from '@/features/dashboard/components/DashboardRecentStudents';
import DashboardChart from '@/features/dashboard/components/DashboardChart';
import DashboardStats from '@/features/dashboard/components/DashboardStats';

const Dashboard = () => {
  return (
    <div className="w-full px-5 lg:px-0">
      <PageLayout showHeader={false} addMarginTop={false}>
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-600">
            Welcome to the Student Management System Dashboard.
          </p>
        </div>
        <section
          className="mt-6 w-full"
          aria-labelledby="dashboard-stats-heading"
        >
          <h2 id="dashboard-stats-heading" className="sr-only">
            Dashboard statistics
          </h2>
          <DashboardStats />
        </section>
        <section
          className="mt-6 w-full"
          aria-labelledby="dashboard-chart-heading"
        >
          <h2 id="dashboard-chart-heading" className="sr-only">
            Dashboard chart
          </h2>
          <DashboardChart />
        </section>
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 mt-8">
          <DashboardRecentStudents />
          <DashboardQuickActions />
        </div>
      </PageLayout>
    </div>
  );
};

export default Dashboard;
