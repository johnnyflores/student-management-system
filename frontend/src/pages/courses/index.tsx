import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import CourseTable from '@/features/course/components/course-table';
import AddCourseDrawer from '@/features/course/components/course-drawer/add-course-drawer';

const Courses = () => {
  return (
    <PageLayout
      title="All Courses"
      subtitle="View and manage all courses"
      addMarginTop
      rightAction={
        <div className="flex items-center gap-2">
          <AddCourseDrawer />
        </div>
      }
    >
      <Card className="border-0 shadow-none">
        <CardContent>
          <CourseTable />
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Courses;
