import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import CourseTable from '@/features/course/components/CourseTable/CourseTable';
import AddCourseDrawer from '@/features/course/components/CourseDrawer/AddCourseDrawer';
import useTitle from '@/hooks/useTitle';
const Courses = () => {
  useTitle({ title: 'Courses' });
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
      <div className="w-full px-5 lg:px-0">
        <Card className="border-0 shadow-none">
          <CardContent>
            <CourseTable />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Courses;
