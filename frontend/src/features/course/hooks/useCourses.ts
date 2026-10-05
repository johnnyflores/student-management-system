import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from '@/features/course/services/courseApi';
import type {
  CreateCourseRequest,
  UpdateCourseRequest,
} from '@/features/course/types/course';

export default function useCourses(initialLimit = 10) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const coursesQuery = useQuery({
    queryKey: ['courses', page, limit],
    queryFn: () => getCourses(page, limit),
  });

  const invalidateCourses = () => {
    queryClient.invalidateQueries({
      queryKey: ['courses'],
    });
  };

  const createCourseMutation = useMutation({
    mutationFn: (course: CreateCourseRequest) => createCourse(course),

    onSuccess: invalidateCourses,
  });

  const updateCourseMutation = useMutation({
    mutationFn: ({ id, course }: { id: number; course: UpdateCourseRequest }) =>
      updateCourse(id, course),

    onSuccess: invalidateCourses,
  });

  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,

    onSuccess: invalidateCourses,
  });

  return {
    courses: coursesQuery.data?.items ?? [],
    isLoading: coursesQuery.isLoading,
    isError: coursesQuery.isError,
    error: coursesQuery.error,

    createCourse: createCourseMutation.mutateAsync,
    isCreating: createCourseMutation.isPending,
    createError: createCourseMutation.error,

    updateCourse: updateCourseMutation.mutateAsync,
    isUpdating: updateCourseMutation.isPending,
    updateError: updateCourseMutation.error,

    deleteCourse: deleteCourseMutation.mutateAsync,
    isDeleting: deleteCourseMutation.isPending,
    deleteError: deleteCourseMutation.error,

    page,
    limit,
    total: coursesQuery.data?.total ?? 0,
    totalPages: coursesQuery.data?.totalPages ?? 0,
    setPage,
    setLimit,
  };
}
