import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import {
  createStudent,
  deleteStudent,
  getStudents,
  searchStudentsByName,
  updateStudent,
} from '@/features/student/services/studentApi';

import type { Student } from '@/features/student/types/student';
import { getStudent } from '@/features/student/services/studentApi';
import useDebouncedSearch from '@/features/student/hooks/useDebouncedSearch';

export default function useStudents(initialLimit = 10) {
  const queryClient = useQueryClient();

  const [searchId, setSearchId] = useState<number | null>(null);
  const [searchName, setSearchName] = useState('');

  const debouncedSearchName = useDebouncedSearch(searchName, 500);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

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

  const searchStudent = useCallback((id: number) => {
    setSearchName('');
    setSearchId(id);
  }, []);

  const nameSearchQuery = useQuery({
    queryKey: ['students', 'search', debouncedSearchName],
    queryFn: () => searchStudentsByName(debouncedSearchName),
    enabled: debouncedSearchName.trim().length > 0,
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

    page,
    limit,
    total: studentsQuery.data?.total ?? 0,
    totalPages: studentsQuery.data?.totalPages ?? 0,
    setPage,
    setLimit,

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
