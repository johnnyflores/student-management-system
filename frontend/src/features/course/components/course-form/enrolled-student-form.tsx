import { Button } from '@/components/ui/button';
import useCourseStudents from '@/features/course/hooks/useCourseStudents';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
import { useState } from 'react';
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

type EnrolledStudentFormProps = {
  courseId?: string;
  courseName?: string;
  teacher?: string;
  onCloseDrawer?: () => void;
};

const EnrolledStudentForm = ({ courseId }: EnrolledStudentFormProps) => {
  const courseIdNumber = courseId ? Number(courseId) : 0;

  const {
    students: enrolledStudents,
    removeStudent,
    isRemoving,
    isLoading,
  } = useCourseStudents(courseIdNumber);

  const [studentToRemove, setStudentToRemove] = useState<number | null>(null);

  const student = enrolledStudents.find(
    (student) => student.ID === studentToRemove
  );

  const handleRemove = () => {
    if (studentToRemove === null) return;

    removeStudent(studentToRemove);
    setStudentToRemove(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (enrolledStudents.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No students are currently enrolled in this course.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 px-6 pb-10 pt-5">
        {enrolledStudents.map((student) => (
          <div key={student.ID} className="flex items-end gap-3">
            <div className="flex-1 space-y-2">
              <label
                htmlFor={`student-${student.ID}`}
                className="text-sm font-medium"
              >
                Student Name
              </label>
              <Input
                id={`student-${student.ID}`}
                value={student.Name ?? ''}
                disabled
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setStudentToRemove(student.ID)}
              disabled={isRemoving}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <AlertDialog
        open={studentToRemove !== null}
        onOpenChange={(open) => {
          if (!open && !isRemoving) {
            setStudentToRemove(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove enrolled student?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{' '}
              <strong>{student?.Name ?? 'this student'}</strong> from this
              course? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              variant="destructive"
              disabled={isRemoving}
            >
              {isRemoving && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {isRemoving ? 'Removing...' : 'Remove'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EnrolledStudentForm;
