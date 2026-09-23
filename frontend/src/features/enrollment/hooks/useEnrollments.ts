import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  enrollStudent,
  getCourseEnrollments,
  unenrollStudent,
} from '@/features/enrollment/services/enrollmentApi';
import { useState } from 'react';

export default function useEnrollments(
  courseId: number,
  initialLimit: number = 10
) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const enrollmentsQuery = useQuery({
    queryKey: ['course-enrollments', courseId, page, limit],
    queryFn: () => getCourseEnrollments(courseId, page, limit),
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
    enrollments: enrollmentsQuery.data?.items ?? [],
    isLoading: enrollmentsQuery.isLoading,
    isError: enrollmentsQuery.isError,
    error: enrollmentsQuery.error,

    enrollStudent: enrollMutation.mutateAsync,
    isEnrolling: enrollMutation.isPending,
    enrollError: enrollMutation.error,

    unenrollStudent: unenrollMutation.mutateAsync,
    isUnenrolling: unenrollMutation.isPending,
    unenrollError: unenrollMutation.error,

    page,
    limit,
    total: enrollmentsQuery.data?.total ?? 0,
    totalPages: enrollmentsQuery.data?.totalPages ?? 0,
    setPage,
    setLimit,
  };
}
