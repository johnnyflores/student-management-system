'use client';

import { useState } from 'react';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Enrollment } from '@/features/enrollment/types/enrollment';

interface ActionsProps {
  enrollment: Enrollment;
  onUnenroll: (studentId: number) => Promise<unknown>;
  isUnenrolling: boolean;
}

const Actions = ({ enrollment, onUnenroll, isUnenrolling }: ActionsProps) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemove = async () => {
    try {
      setIsDeleting(true);
      await onUnenroll(enrollment.studentId);
      setOpen(false);
      toast.success(
        `Student #${enrollment.studentId} has been successfully unenrolled.`
      );
    } catch (error) {
      console.error('Failed to unenroll student:', error);
      toast.error(`Failed to unenroll student #${enrollment.studentId}.`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="destructive"
          onClick={() => setOpen(true)}
          disabled={isUnenrolling}
        >
          Unenroll
        </Button>
      </div>
      <AlertDialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!isUnenrolling) {
            setOpen(nextOpen);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove enrolled student?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove student{' '}
              <strong>#{enrollment.studentId}</strong> from this course? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUnenrolling}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              variant="destructive"
              disabled={isUnenrolling}
            >
              {isUnenrolling && isDeleting && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isUnenrolling && isDeleting ? 'Removing...' : 'Remove'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Actions;
