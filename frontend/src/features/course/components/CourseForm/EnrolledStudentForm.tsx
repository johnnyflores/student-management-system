import { Button } from '@/components/ui/button';
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
import useEnrollments from '@/features/enrollment/hooks/useEnrollments';
import useStudents from '@/features/student/hooks/useStudents';

type EnrolledStudentFormProps = {
  courseId?: string;
  courseName?: string;
  teacher?: string;
  onCloseDrawer?: () => void;
};

const EnrolledStudentForm = ({ courseId }: EnrolledStudentFormProps) => {
  const courseIdNumber = courseId ? Number(courseId) : 0;

  const {
    enrollments,
    unenrollStudent,
    isUnenrolling,
    isLoading: isLoadingEnrollments,
  } = useEnrollments(courseIdNumber);

  const { students: allStudents, isLoading: isLoadingStudents } = useStudents();

  const [studentToRemove, setStudentToRemove] = useState<number | null>(null);

  const enrolledStudentIds = new Set(
    enrollments.map((enrollment) => enrollment.studentId)
  );

  const enrolledStudents = allStudents.filter((student) =>
    enrolledStudentIds.has(student.id)
  );

  const student = enrolledStudents.find(
    (student) => student.id === studentToRemove
  );

  const isLoading = isLoadingEnrollments || isLoadingStudents;

  const handleRemove = async () => {
    if (studentToRemove === null) return;

    try {
      await unenrollStudent(studentToRemove);
      setStudentToRemove(null);
    } catch (error) {
      console.error('Failed to unenroll student:', error);
    }
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
          <div key={student.id} className="flex items-end gap-3">
            <div className="flex-1 space-y-2">
              <label
                htmlFor={`student-${student.id}`}
                className="text-sm font-medium"
              >
                Student Name
              </label>
              <Input
                id={`student-${student.id}`}
                value={`${student.firstName ?? ''} ${student.lastName ?? ''}`}
                disabled
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setStudentToRemove(student.id)}
              disabled={isUnenrolling}
            >
              Remove
            </Button>
          </div>
        ))}
        <AlertDialog
          open={studentToRemove !== null}
          onOpenChange={(open) => {
            if (!open && !isUnenrolling) {
              setStudentToRemove(null);
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove enrolled student?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove{' '}
                <strong>
                  {student?.firstName} {student?.lastName ?? 'this student'}
                </strong>{' '}
                from this course? This action cannot be undone.
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
                {isUnenrolling && (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isUnenrolling ? 'Removing...' : 'Remove'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default EnrolledStudentForm;
