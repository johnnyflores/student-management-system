import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { XIcon } from 'lucide-react';
import useEditCourseDrawer from '@/features/course/hooks/useEditCourseDrawer';
import CourseForm from '@/features/course/components/CourseForm/CourseForm';

const EditCourseDrawer = () => {
  const { open, id: courseId, onCloseDrawer } = useEditCourseDrawer();
  return (
    <Drawer open={open} onOpenChange={onCloseDrawer} direction="right">
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader>
          <div>
            <DrawerTitle className="text-xl font-semibold">
              Edit Course
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Edit the details of the course.
            </DrawerDescription>
          </div>
          <DrawerClose className="absolute right-4 top-4">
            <XIcon className="h-5 w-5 cursor-pointer!" />
          </DrawerClose>
        </DrawerHeader>
        <CourseForm isEdit courseId={courseId} onCloseDrawer={onCloseDrawer} />
      </DrawerContent>
    </Drawer>
  );
};

export default EditCourseDrawer;
