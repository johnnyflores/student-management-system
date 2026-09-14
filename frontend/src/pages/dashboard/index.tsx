import PageLayout from '@/components/PageLayout';
import DashboardRecentStudents from '@/pages/dashboard/DashboardRecentStudents';
import DashboardQuickActions from '@/pages/dashboard/DashboardQuickActions';

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col">
      <PageLayout showHeader={false} addMarginTop={false}>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-600">
              Welcome to the Student Management System Dashboard.
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <DashboardRecentStudents />
          <DashboardQuickActions />
        </div>
      </PageLayout>
    </div>
  );
};

export default Dashboard;
