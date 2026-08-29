import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import AddStudentDrawer from '@/features/student/components/AddStudentDrawer';
import StudentTable from '@/features/student/components/StudentTable';

const Students = () => {
  return (
    <PageLayout
      title="All Students"
      subtitle="View and manage all students"
      addMarginTop
      rightAction={
        <div className="flex items-center gap-2">
          <AddStudentDrawer />
        </div>
      }
    >
      <Card className="border-0 shadow-none">
        <CardContent>
          <StudentTable />
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Students;
