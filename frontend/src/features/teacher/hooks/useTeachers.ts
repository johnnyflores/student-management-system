import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '@/features/teacher/services/teacherApi';
import type { TeacherInput } from '@/features/teacher/types/teacher';

export function useTeachers() {
  const queryClient = useQueryClient();

  const teacherQuery = useQuery({
    queryKey: ['teachers'],
    queryFn: getTeachers,
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
    mutationFn: ({ id, teacher }: { id: number; teacher: TeacherInput }) =>
      updateTeacher(id, teacher),

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

  return {
    teachers: teacherQuery.data ?? [],
    isLoading: teacherQuery.isLoading,
    isError: teacherQuery.isError,
    error: teacherQuery.error,

    createTeacher: createTeacherMutation.mutate,
    isCreating: createTeacherMutation.isPending,
    createError: createTeacherMutation.error,

    updateTeacher: updateTeacherMutation.mutate,
    isUpdating: updateTeacherMutation.isPending,
    updateError: updateTeacherMutation.error,

    deleteTeacher: deleteTeacherMutation.mutateAsync,
    isDeleting: deleteTeacherMutation.isPending,
    deleteError: deleteTeacherMutation.error,
  };
}
