import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  enrollStudent,
  getCourseEnrollments,
  unenrollStudent,
} from '@/features/enrollment/services/enrollmentApi';

export default function useEnrollments(courseId: number) {
  const queryClient = useQueryClient();

  const enrollmentsQuery = useQuery({
    queryKey: ['course-enrollments', courseId],
    queryFn: () => getCourseEnrollments(courseId),
    enabled: courseId > 0,
  });

  const enrollMutation = useMutation({
    mutationFn: (studentId: number) => enrollStudent(courseId, studentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course-enrollments', courseId],
      });
    },
  });

  const unenrollMutation = useMutation({
    mutationFn: (studentId: number) => unenrollStudent(courseId, studentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course-enrollments', courseId],
      });
    },
  });

  return {
    enrollments: enrollmentsQuery.data ?? [],
    isLoading: enrollmentsQuery.isLoading,
    isError: enrollmentsQuery.isError,
    error: enrollmentsQuery.error,

    enrollStudent: enrollMutation.mutateAsync,
    isEnrolling: enrollMutation.isPending,
    enrollError: enrollMutation.error,

    unenrollStudent: unenrollMutation.mutateAsync,
    isUnenrolling: unenrollMutation.isPending,
    unenrollError: unenrollMutation.error,
  };
}
