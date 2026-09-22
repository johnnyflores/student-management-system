import type { Enrollment } from '@/features/enrollment/types/enrollment';

const API_URL = import.meta.env.VITE_API_URL;

export async function getCourseEnrollments(
  courseId: number
): Promise<Enrollment[]> {
  const response = await fetch(
    `${API_URL}/courses/students?course_id=${courseId}`
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
