import { Button } from '@/components/ui/button';
import TeacherForm from '@/features/teacher/components/TeacherForm/TeacherForm';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { PlusIcon, UserRoundPlus, XIcon } from 'lucide-react';
import { useState } from 'react';

interface AddTeacherDrawerProps {
  showIcon?: boolean;
}

const AddTeacherDrawer = ({ showIcon = false }: AddTeacherDrawerProps) => {
  const [open, setOpen] = useState(false);

  const onCloseDrawer = () => {
    setOpen(false);
  };
  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="cursor-pointer! text-white!"
          aria-label="Add teacher"
        >
          {!showIcon ? (
            <>
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
              Add Teacher
            </>
          ) : (
            <UserRoundPlus className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader className="relative">
          <div>
            <DrawerTitle className="text-xl font-semibold">
              Add Teacher
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Fill in the details below to add a new teacher to the system.
            </DrawerDescription>
          </div>
          <DrawerClose className="absolute right-4 top-4">
            <XIcon className="h-5 w-5 cursor-pointer!" />
          </DrawerClose>
        </DrawerHeader>
        <TeacherForm onCloseDrawer={onCloseDrawer} />
      </DrawerContent>
    </Drawer>
  );
};

export default AddTeacherDrawer;
