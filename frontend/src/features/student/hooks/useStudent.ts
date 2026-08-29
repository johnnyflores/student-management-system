import { useQuery } from '@tanstack/react-query';
import { getStudent } from '@/features/student/services/studentApi';

export default function useStudent(studentId: number) {
  const studentQuery = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudent(studentId),
    enabled: studentId > 0,
  });

  return {
    student: studentQuery.data ?? null,
    isLoading: studentQuery.isLoading,
    isError: studentQuery.isError,
    error: studentQuery.error,
  };
}
