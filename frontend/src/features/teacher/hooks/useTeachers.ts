import { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacher,
} from '@/features/teacher/services/teacherApi';
import type { UpdateTeacherRequest } from '@/features/teacher/types/teacher';

export function useTeachers(initialLimit = 10) {
  const queryClient = useQueryClient();
  const [searchId, setSearchId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const teacherQuery = useQuery({
    queryKey: ['teachers', page, limit],
    queryFn: () => getTeachers(page, limit),
  });

  const createTeacherMutation = useMutation({
    mutationFn: createTeacher,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teachers'],
      });
    },
  });

  const updateTeacherMutation = useMutation({
    mutationFn: ({
      id,
      teacher,
    }: {
      id: number;
      teacher: UpdateTeacherRequest;
    }) => updateTeacher(id, teacher),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teachers'],
      });
    },
  });

  const deleteTeacherMutation = useMutation({
    mutationFn: deleteTeacher,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teachers'],
      });
    },
  });

  const searchQuery = useQuery({
    queryKey: ['teacher', searchId],
    queryFn: () => getTeacher(searchId!),
    enabled: searchId !== null,
  });

  const searchTeacher = useCallback((id: number) => {
    setSearchId(id);
  }, []);

  return {
    teachers: teacherQuery.data?.items ?? [],
    isLoading: teacherQuery.isLoading,
    isError: teacherQuery.isError,
    error: teacherQuery.error,

    page,
    limit,
    total: teacherQuery.data?.total ?? 0,
    totalPages: teacherQuery.data?.totalPages ?? 0,
    setPage,
    setLimit,

    createTeacher: createTeacherMutation.mutateAsync,
    isCreating: createTeacherMutation.isPending,
    createError: createTeacherMutation.error,

    updateTeacher: updateTeacherMutation.mutateAsync,
    isUpdating: updateTeacherMutation.isPending,
    updateError: updateTeacherMutation.error,

    deleteTeacher: deleteTeacherMutation.mutateAsync,
    isDeleting: deleteTeacherMutation.isPending,
    deleteError: deleteTeacherMutation.error,

    searchResult: searchQuery.data,
    isSearching: searchQuery.isLoading,
    searchError: searchQuery.error,
    searchTeacher,
  };
}
