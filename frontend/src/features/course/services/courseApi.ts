import type {
  Course,
  CreateCourse,
  PaginatedCourses,
} from '@/features/course/types/course';
import { handleResponse } from '@/helper/handleResponse';

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

  return handleResponse<PaginatedCourses>(response, 'Failed to fetch courses');
}

export async function createCourse(course: CreateCourse): Promise<Course> {
  const response = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });

  return handleResponse<Course>(response, 'Failed to create course');
}
