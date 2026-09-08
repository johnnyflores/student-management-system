import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from '@/features/student/services/studentApi';

import type { Student } from '@/features/student/types/student';
import { getStudent } from '@/features/student/services/studentApi';

export default function useStudents(initialLimit = 10) {
  const queryClient = useQueryClient();

  const [searchId, setSearchId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const studentsQuery = useQuery({
    queryKey: ['students', page, limit],
    queryFn: () => getStudents(page, limit),
  });

  const createStudentMutation = useMutation({
    mutationFn: createStudent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['students'],
      });
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: ({ id, student }: { id: number; student: Student }) =>
      updateStudent(id, student),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['students'],
      });
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['students'],
      });
    },
  });

  const searchQuery = useQuery({
    queryKey: ['student', searchId],

    queryFn: () => getStudent(searchId!),

    enabled: searchId !== null,
  });

  const searchStudent = useCallback((id: number) => {
    setSearchId(id);
  }, []);

  const clearSearch = () => {
    setSearchId(null);
    setPage(1);
  };

  return {
    students: studentsQuery.data?.items ?? [],
    isLoading: studentsQuery.isLoading,
    isError: studentsQuery.isError,
    error: studentsQuery.error,

    page,
    limit,
    total: studentsQuery.data?.total ?? 0,
    totalPages: studentsQuery.data?.totalPages ?? 0,
    setPage,
    setLimit,

    addStudent: createStudentMutation.mutateAsync,
    isCreating: createStudentMutation.isPending,
    createError: createStudentMutation.error,

    updateStudent: updateStudentMutation.mutateAsync,
    isUpdating: updateStudentMutation.isPending,
    updateError: updateStudentMutation.error,

    removeStudent: deleteStudentMutation.mutateAsync,
    isDeleting: deleteStudentMutation.isPending,
    deleteError: deleteStudentMutation.error,

    searchedStudent: searchQuery.data,
    isSearching: searchQuery.isLoading,
    searchError: searchQuery.error,
    searchStudent,

    clearSearch,
  };
}
