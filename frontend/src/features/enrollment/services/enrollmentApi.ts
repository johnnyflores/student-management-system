import type {
  Enrollment,
  PaginatedCourses,
} from '@/features/enrollment/types/enrollment';

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export async function getCourseEnrollments(
  courseId: number,
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_PAGE_SIZE
): Promise<PaginatedCourses> {
  const response = await fetch(
    `${API_URL}/courses/students?course_id=${courseId}&page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || 'Failed to fetch course enrollments');
  }

  return response.json();
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

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || 'Failed to enroll student');
  }

  return response.json();
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

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || 'Failed to unenroll student');
  }
}
