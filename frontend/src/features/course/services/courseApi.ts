import type {
  Course,
  CreateCourse,
  PaginatedCourses,
} from '@/features/course/types/course';

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export async function getCourses(
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_PAGE_SIZE
): Promise<PaginatedCourses> {
  const response = await fetch(
    `${API_URL}/courses?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || 'Failed to fetch courses');
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
