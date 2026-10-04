import type {
  Enrollment,
  PaginatedEnrollments,
} from '@/features/enrollment/types/enrollment';
import { handleResponse } from '@/helper/handleResponse';

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export async function getCourseEnrollments(
  courseId: number,
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_PAGE_SIZE
): Promise<PaginatedEnrollments> {
  const response = await fetch(
    `${API_URL}/courses/students?course_id=${courseId}&page=${page}&limit=${limit}`
  );

  return handleResponse<PaginatedEnrollments>(
    response,
    'Failed to fetch course enrollments'
  );
}

export async function enrollStudent(
  courseId: number,
  studentId: number
): Promise<Enrollment[]> {
  const response = await fetch(
    `${API_URL}/courses/students?course_id=${courseId}&student_id=${studentId}`,
    {
      method: 'POST',
    }
  );

  return handleResponse<Enrollment[]>(response, 'Failed to enroll student');
}

export async function unenrollStudent(
  courseId: number,
  studentId: number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/courses/students?course_id=${courseId}&student_id=${studentId}`,
    {
      method: 'DELETE',
    }
  );

  return handleResponse<void>(response, 'Failed to unenroll student');
}
