import { useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import CourseForm from '@/features/course/components/CourseForm/CourseForm';
import { colorStyles, type ColorName } from '@/constants/colorStyles';

interface AddCourseDrawerProps {
  showIcon?: boolean;
  color?: ColorName;
}

const AddCourseDrawer = ({
  showIcon = false,
  color = 'orange',
}: AddCourseDrawerProps) => {
  const [open, setOpen] = useState(false);
  const styles = colorStyles[color];

  const onCloseDrawer = () => {
    setOpen(false);
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className={`cursor-pointer! ${styles.background}`}
          aria-label="Add course"
        >
          <PlusIcon className={`size-4 ${styles.icon}`} aria-hidden="true" />
          {!showIcon && <span className={styles.icon}>Add Course</span>}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader className="relative">
          <div>
            <DrawerTitle className="text-xl font-semibold">
              Add Course
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Fill in the details below to add a new course to the system.
            </DrawerDescription>
          </div>
          <DrawerClose className="absolute right-4 top-4">
            <XIcon className="h-5 w-5 cursor-pointer!" />
          </DrawerClose>
        </DrawerHeader>
        <CourseForm onCloseDrawer={onCloseDrawer} />
      </DrawerContent>
    </Drawer>
  );
};

export default AddCourseDrawer;
