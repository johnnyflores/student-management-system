import { XIcon } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import useEnrolledStudentDrawer from '@/features/course/hooks/useEnrolledStudentDrawer';
import EnrolledStudentForm from '@/features/course/components/CourseForm/EnrolledStudentForm';

const EnrolledStudentDrawer = () => {
  const { open, id: courseId, onCloseDrawer } = useEnrolledStudentDrawer();

  return (
    <Drawer open={open} onOpenChange={onCloseDrawer} direction="right">
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            Enrolled Students
          </DrawerTitle>
          <DrawerDescription className="text-sm text-muted-foreground">
            View the list of students enrolled in the selected course.
          </DrawerDescription>
          <DrawerClose className="absolute right-4 top-4">
            <XIcon className="h-5 w-5 cursor-pointer!" />
          </DrawerClose>
        </DrawerHeader>
        <EnrolledStudentForm courseId={courseId} />
      </DrawerContent>
    </Drawer>
  );
};

export default EnrolledStudentDrawer;
