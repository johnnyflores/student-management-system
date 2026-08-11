import PageLayout from '@/components/PageLayout';
import StudentList from '@/features/student/components/StudentList';

const Students = () => {
  return (
    <div className="w-full flex flex-col">
      <PageLayout showHeader={false} addMarginTop={false}>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Students</h1>
            <p className="text-sm text-gray-600">
              Manage all students in the system.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mt-8">
          <StudentList />
        </div>
      </PageLayout>
    </div>
  );
};

export default Students;
