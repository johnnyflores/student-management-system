import { XIcon } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import useAssignStudentDrawer from '@/features/course/hooks/useAssignStudentDrawer';
import AssignStudentForm from '@/features/course/components/CourseForm/AssignStudentForm';
import useCourses from '@/features/course/hooks/useCourses';

const AssignCourseDrawer = () => {
  const { open, courseId, onCloseDrawer } = useAssignStudentDrawer();
  const { courses } = useCourses();

  if (!courseId) {
    return null;
  }

  const course = courses.find((course) => course.ID === parseInt(courseId));

  if (!course) {
    return null;
  }

  return (
    <Drawer open={open} onOpenChange={onCloseDrawer} direction="right">
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            Assign Student to Course
          </DrawerTitle>
          <DrawerDescription className="text-sm text-muted-foreground">
            Use the form below to assign a student to the selected course.
          </DrawerDescription>
          <DrawerClose className="absolute right-4 top-4">
            <XIcon className="h-5 w-5 cursor-pointer!" />
          </DrawerClose>
        </DrawerHeader>
        <AssignStudentForm
          courseId={courseId}
          courseName={course.Name}
          teacher={course.Teacher}
          onCloseDrawer={onCloseDrawer}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default AssignCourseDrawer;
