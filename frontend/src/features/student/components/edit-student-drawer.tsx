import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import useEditStudentDrawer from '@/features/student/hooks/useEditStudentDrawer';
import StudentForm from '@/features/student/components/student-form';

const EditStudentDrawer = () => {
  const { open, studentId, onCloseDrawer } = useEditStudentDrawer();
  return (
    <Drawer open={open} onOpenChange={onCloseDrawer} direction="right">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Student</DrawerTitle>
          <DrawerDescription>
            Use the form below to edit the student details.
          </DrawerDescription>
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
