import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import AddStudentDrawer from '@/features/student/components/StudentDrawer/AddStudentDrawer';
import StudentTable from '@/features/student/components/StudentTable';

const Students = () => {
  return (
    <PageLayout
      title="All Students"
      subtitle="View and manage all students"
      addMarginTop
      rightAction={<AddStudentDrawer />}
    >
      <div className="w-full px-5 lg:px-0">
        <Card className="border-0 shadow-none">
          <CardContent>
            <StudentTable />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Students;
