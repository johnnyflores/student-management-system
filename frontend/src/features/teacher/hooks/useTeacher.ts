import { useQuery } from '@tanstack/react-query';
import { getTeacher } from '@/features/teacher/services/teacherApi';

export default function useTeacher(teacherId?: number) {
  const teacherQuery = useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: () => getTeacher(teacherId!),
    enabled: !!teacherId && teacherId > 0,
  });

  return {
    teacher: teacherQuery.data ?? null,
    isLoading: teacherQuery.isLoading,
    isError: teacherQuery.isError,
    error: teacherQuery.error,
  };
}
