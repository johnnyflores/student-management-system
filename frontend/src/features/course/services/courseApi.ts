import type { Course, CreateCourse } from '@/features/course/types/course';
import type { Student } from '@/features/student/types/student';

const API_URL = import.meta.env.VITE_API_URL;

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(`${API_URL}/courses`);

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }

  return response.json();
}

export async function getCourseStudents(courseId: number): Promise<Student[]> {
  const response = await fetch(
    `${API_URL}/courses/students?course_id=${courseId}`
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Failed to fetch course students');
  }

  return response.json();
}

export async function createCourse(course: CreateCourse): Promise<Course> {
  const response = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Failed to create course');
  }

  return response.json();
}

export async function assignStudent(
  courseId: number,
  studentId: number
): Promise<Course> {
  const response = await fetch(
    `${API_URL}/courses/students?course_id=${courseId}&student_id=${studentId}`,
    {
      method: 'POST',
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Failed to assign student');
  }

  return response.json();
}

export async function removeStudent(
  courseId: number,
  studentId: number
): Promise<Course> {
  const response = await fetch(
    `${API_URL}/courses/students?course_id=${courseId}&student_id=${studentId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Failed to remove student');
  }

  return response.json();
}
