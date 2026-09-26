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
import { colorStyles, type ColorName } from '@/constants/colorStyles';

interface AddTeacherDrawerProps {
  showIcon?: boolean;
  color?: ColorName;
}

const AddTeacherDrawer = ({
  showIcon = false,
  color = 'green',
}: AddTeacherDrawerProps) => {
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
          aria-label="Add teacher"
        >
          {!showIcon ? (
            <>
              <PlusIcon
                className={`size-4 ${styles.icon}`}
                aria-hidden="true"
              />
              <span className={styles.icon}>Add Teacher</span>
            </>
          ) : (
            <UserRoundPlus
              className={`size-4 ${styles.icon}`}
              aria-hidden="true"
            />
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
