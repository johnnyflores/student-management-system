import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from '../services/studentApi';

import type { Student } from '../types/student';
import { getStudent } from '../services/studentApi';

export default function useStudents() {
  const queryClient = useQueryClient();
  const [searchId, setSearchId] = useState<number | null>(null);

  const studentsQuery = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  });

  const createMutation = useMutation({
    mutationFn: createStudent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['students'],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, student }: { id: number; student: Student }) =>
      updateStudent(id, student),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['students'],
      });
    },
  });

  const deleteMutation = useMutation({
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

  const searchStudent = (id: number) => {
    setSearchId(id);
  };

  const clearSearch = () => {
    setSearchId(null);
  };

  return {
    students: studentsQuery.data ?? [],

    loading: studentsQuery.isLoading,

    error: studentsQuery.error,

    addStudent: createMutation.mutateAsync,

    updateStudent: updateMutation.mutateAsync,

    removeStudent: deleteMutation.mutateAsync,

    searchedStudent: searchQuery.data,

    searchLoading: searchQuery.isLoading,

    searchError: searchQuery.error,

    searchStudent,
    clearSearch,

    createLoading: createMutation.isPending,

    updateLoading: updateMutation.isPending,

    deleteLoading: deleteMutation.isPending,
  };
}
