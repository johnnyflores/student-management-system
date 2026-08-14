import { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { PlusIcon, XIcon } from 'lucide-react';
import StudentForm from '@/features/student/components/student-form';

const AddStudentDrawer = () => {
  const [open, setOpen] = useState(false);

  const onCloseDrawer = () => {
    setOpen(false);
  };
  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="cursor-pointer! text-white!">
          <PlusIcon className="h-4 w-4" />
          Add Student
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader className="relative">
          <div className="p-4">
            <DrawerTitle className="text-lg font-semibold">
              Add Student
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Fill in the details below to add a new student to the system.
            </DrawerDescription>
          </div>
          <DrawerClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="h-5 w-5 cursor-pointer!" />
          </DrawerClose>
        </DrawerHeader>
        <StudentForm onCloseDrawer={onCloseDrawer} />
      </DrawerContent>
    </Drawer>
  );
};

export default AddStudentDrawer;
