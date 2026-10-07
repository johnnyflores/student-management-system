import type {
  Course,
  CreateCourseRequest,
  PaginatedCourses,
  UpdateCourseRequest,
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

export async function getCourse(id: number): Promise<Course> {
  const response = await fetch(`${API_URL}/course?id=${id}`);

  return handleResponse<Course>(response, 'Course not found');
}

export async function createCourse(
  course: CreateCourseRequest
): Promise<Course> {
  const response = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });

  return handleResponse<Course>(response, 'Failed to create course');
}

export async function updateCourse(
  id: number,
  course: UpdateCourseRequest
): Promise<Course> {
  const response = await fetch(`${API_URL}/course?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });

  return handleResponse<Course>(response, 'Failed to update course');
}

export async function deleteCourse(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/course?id=${id}`, {
    method: 'DELETE',
  });

  return handleResponse<void>(response, 'Failed to delete course');
}
