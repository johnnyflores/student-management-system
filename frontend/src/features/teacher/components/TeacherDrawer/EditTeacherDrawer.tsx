import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { XIcon } from 'lucide-react';
import TeacherForm from '@/features/teacher/components/TeacherForm/TeacherForm';
import useEditTeacherDrawer from '@/features/teacher/hooks/useEditTeacherDrawer';

const EditTeacherDrawer = () => {
  const { open, id: teacherId, onCloseDrawer } = useEditTeacherDrawer();
  return (
    <Drawer open={open} onOpenChange={onCloseDrawer} direction="right">
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader className="relative">
          <div>
            <DrawerTitle className="text-xl font-semibold">
              Edit Teacher
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Fill in the details below to edit the teacher's information.
            </DrawerDescription>
          </div>
          <DrawerClose className="absolute right-4 top-4">
            <XIcon className="h-5 w-5 cursor-pointer!" />
          </DrawerClose>
        </DrawerHeader>
        <TeacherForm
          isEdit
          teacherId={teacherId}
          onCloseDrawer={onCloseDrawer}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default EditTeacherDrawer;
