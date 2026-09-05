import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { XIcon } from 'lucide-react';
import useEditStudentDrawer from '@/features/student/hooks/useEditStudentDrawer';
import StudentForm from '@/features/student/components/StudentForm/StudentForm';

const EditStudentDrawer = () => {
  const { open, id: studentId, onCloseDrawer } = useEditStudentDrawer();
  return (
    <Drawer open={open} onOpenChange={onCloseDrawer} direction="right">
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader>
          <div>
            <DrawerTitle className="text-xl font-semibold">
              Edit Student
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Use the form below to edit the student details.
            </DrawerDescription>
          </div>
          <DrawerClose className="absolute right-4 top-4">
            <XIcon className="h-5 w-5 cursor-pointer!" />
          </DrawerClose>
        </DrawerHeader>
        <StudentForm
          isEdit
          studentId={studentId}
          onCloseDrawer={onCloseDrawer}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default EditStudentDrawer;
