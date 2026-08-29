import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  assignStudent,
  getCourseStudents,
  removeStudent,
} from '@/features/course/services/courseApi';

export default function useCourseStudents(courseId: number) {
  const queryClient = useQueryClient();

  const studentsQuery = useQuery({
    queryKey: ['course-students', courseId],
    queryFn: () => getCourseStudents(courseId),
    enabled: courseId > 0,
  });

  const assignMutation = useMutation({
    mutationFn: (studentId: number) => assignStudent(courseId, studentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course-students', courseId],
      });

      queryClient.invalidateQueries({
        queryKey: ['courses'],
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (studentId: number) => removeStudent(courseId, studentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course-students', courseId],
      });

      queryClient.invalidateQueries({
        queryKey: ['courses'],
      });
    },
  });

  return {
    students: studentsQuery.data ?? [],

    isLoading: studentsQuery.isLoading,
    isError: studentsQuery.isError,
    error: studentsQuery.error,

    assignStudent: assignMutation.mutate,
    isAssigning: assignMutation.isPending,
    assignError: assignMutation.error,

    removeStudent: removeMutation.mutate,
    isRemoving: removeMutation.isPending,
    removeError: removeMutation.error,
  };
}
