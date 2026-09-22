import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCourse, getCourses } from '@/features/course/services/courseApi';

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

  return {
    courses: coursesQuery.data?.items ?? [],
    isLoading: coursesQuery.isLoading,
    isError: coursesQuery.isError,
    error: coursesQuery.error,

    createCourse: createCourseMutation.mutateAsync,
    isCreating: createCourseMutation.isPending,
    createError: createCourseMutation.error,

    page,
    limit,
    total: coursesQuery.data?.total ?? 0,
    totalPages: coursesQuery.data?.totalPages ?? 0,
    setPage,
    setLimit,
  };
}
