import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createStudent,
  deleteStudent,
  getStudents,
  searchStudentsByName,
  updateStudent,
} from '../services/studentApi';

import type { Student } from '../types/student';
import { getStudent } from '../services/studentApi';

export default function useStudents() {
  const queryClient = useQueryClient();

  const [searchId, setSearchId] = useState<number | null>(null);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);

  const limit = 3;

  const studentsQuery = useQuery({
    queryKey: ['students', page, limit],
    queryFn: () => getStudents(page, limit),
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
    setSearchName('');
    setSearchId(id);
  };

  const nameSearchQuery = useQuery({
    queryKey: ['students', 'search', searchName],
    queryFn: () => searchStudentsByName(searchName),
    enabled: searchName.trim().length > 0,
  });

  const searchStudentsByNameHandler = (name: string) => {
    setSearchName(name);
    setSearchId(null);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchId(null);
    setSearchName('');
    setPage(1);
  };

  return {
    students: studentsQuery.data?.students ?? [],

    page: studentsQuery.data?.page ?? 1,
    limit: studentsQuery.data?.limit ?? limit,
    total: studentsQuery.data?.total ?? 0,
    totalPages: studentsQuery.data?.totalPages ?? 0,
    setPage,

    loading: studentsQuery.isLoading,
    error: studentsQuery.error,

    addStudent: createMutation.mutateAsync,
    updateStudent: updateMutation.mutateAsync,
    removeStudent: deleteMutation.mutateAsync,

    searchedStudent: searchQuery.data,
    searchLoading: searchQuery.isLoading,
    searchError: searchQuery.error,
    searchStudent,

    searchedStudents: nameSearchQuery.data ?? [],
    nameSearchLoading: nameSearchQuery.isLoading,
    nameSearchError: nameSearchQuery.error,
    searchStudentsByName: searchStudentsByNameHandler,

    clearSearch,

    createLoading: createMutation.isPending,
    updateLoading: updateMutation.isPending,
    deleteLoading: deleteMutation.isPending,
  };
}
