import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  assignStudent,
  createCourse,
  getCourses,
  removeStudent,
} from '@/features/course/services/courseApi';

export default function useCourses(initialLimit = 10) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const coursesQuery = useQuery({
    queryKey: ['courses', page, limit],
    queryFn: () => getCourses(page, limit),
  });

  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['courses'],
      });
    },
  });

  const assignStudentMutation = useMutation({
    mutationFn: ({
      courseId,
      studentId,
    }: {
      courseId: number;
      studentId: number;
    }) => assignStudent(courseId, studentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['courses'],
      });
    },
  });

  const removeStudentMutation = useMutation({
    mutationFn: ({
      courseId,
      studentId,
    }: {
      courseId: number;
      studentId: number;
    }) => removeStudent(courseId, studentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['courses'],
      });
    },
  });

  return {
    courses: coursesQuery.data?.items ?? [],
    isLoading: coursesQuery.isLoading,
    isError: coursesQuery.isError,
    error: coursesQuery.error,

    createCourse: createCourseMutation.mutateAsync,
    isCreating: createCourseMutation.isPending,
    createError: createCourseMutation.error,

    assignStudent: assignStudentMutation.mutateAsync,
    isAssigning: assignStudentMutation.isPending,
    assignError: assignStudentMutation.error,

    removeStudent: removeStudentMutation.mutateAsync,
    isRemoving: removeStudentMutation.isPending,
    removeError: removeStudentMutation.error,

    page,
    limit,
    total: coursesQuery.data?.total ?? 0,
    totalPages: coursesQuery.data?.totalPages ?? 0,
    setPage,
    setLimit,
  };
}
