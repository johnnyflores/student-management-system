import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AddCourseDrawer from '@/features/course/components/CourseDrawer/AddCourseDrawer';
import AddStudentDrawer from '@/features/student/components/StudentDrawer/AddStudentDrawer';
import AddTeacherDrawer from '@/features/teacher/components/TeacherDrawer/AddTeacherDrawer';
import ActionsItem from '@/components/ActionsItem';

const QuickActions = () => {
  return (
    <Card className="shadow-none! border border-gray-100 dark:border-border">
      <CardHeader className="pb-0!">
        <CardTitle className="text-xl">Quick Actions</CardTitle>
        <CardDescription>Common tasks</CardDescription>
        <Separator className="mt-3 bg-gray-100! dark:bg-gray-800!" />
      </CardHeader>
      <CardContent className="pt-0">
        <ActionsItem
          title="Add Student"
          description="Register a new student"
          btnAction={<AddStudentDrawer showIcon={true} color="blue" />}
        />
        <ActionsItem
          title="Add Teacher"
          description="Register a new teacher"
          btnAction={<AddTeacherDrawer showIcon={true} color="green" />}
        />
        <ActionsItem
          title="Add Course"
          description="Create a new course"
          btnAction={<AddCourseDrawer showIcon={true} color="orange" />}
        />
      </CardContent>
    </Card>
  );
};

export default QuickActions;
