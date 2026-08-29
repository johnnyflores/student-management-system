import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  assignStudent,
  createCourse,
  getCourses,
  removeStudent,
} from '@/features/course/services/courseApi';

export default function useCourses() {
  const queryClient = useQueryClient();

  const courseQuery = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
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
    courses: courseQuery.data ?? [],
    isLoading: courseQuery.isLoading,
    isError: courseQuery.isError,
    error: courseQuery.error,

    createCourse: createCourseMutation.mutate,
    isCreating: createCourseMutation.isPending,
    createError: createCourseMutation.error,

    assignStudent: assignStudentMutation.mutate,
    isAssigning: assignStudentMutation.isPending,
    assignError: assignStudentMutation.error,

    removeStudent: removeStudentMutation.mutateAsync,
    isRemoving: removeStudentMutation.isPending,
    removeError: removeStudentMutation.error,
  };
}
