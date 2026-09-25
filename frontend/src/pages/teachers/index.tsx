import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import AddTeacherDrawer from '@/features/teacher/components/TeacherDrawer/AddTeacherDrawer';
import TeacherTable from '@/features/teacher/components/TeacherTable';

const Teachers = () => {
  return (
    <PageLayout
      title="All Teachers"
      subtitle="View and manage all teachers"
      addMarginTop
      rightAction={<AddTeacherDrawer />}
    >
      <div className="w-full px-5 lg:px-0">
        <Card className="border-0 shadow-none">
          <CardContent>
            <TeacherTable />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Teachers;
