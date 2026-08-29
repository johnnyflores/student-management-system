import PageLayout from '@/components/PageLayout';
import DashboardRecentStudents from '@/pages/dashboard/DashboardRecentStudents';

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
        <div className="w-full flex flex-col gap-4 mt-8">
          <DashboardRecentStudents />
        </div>
      </PageLayout>
    </div>
  );
};

export default Dashboard;
