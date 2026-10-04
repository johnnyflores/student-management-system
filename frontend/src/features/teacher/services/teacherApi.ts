import type {
  Teacher,
  CreateTeacherRequest,
  PaginatedTeachers,
  UpdateTeacherRequest,
} from '@/features/teacher/types/teacher';
import { handleResponse } from '@/helper/handleResponse';

const API_URL = import.meta.env.VITE_API_URL;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export async function getTeachers(
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_PAGE_SIZE
): Promise<PaginatedTeachers> {
  const response = await fetch(
    `${API_URL}/teachers?page=${page}&limit=${limit}`
  );

  return handleResponse<PaginatedTeachers>(
    response,
    'Failed to fetch teachers'
  );
}

export async function getTeacher(id: number): Promise<Teacher> {
  const response = await fetch(`${API_URL}/teacher?id=${id}`);

  return handleResponse<Teacher>(response, 'Failed to fetch teacher');
}

export async function createTeacher(
  teacher: CreateTeacherRequest
): Promise<Teacher> {
  const response = await fetch(`${API_URL}/teachers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teacher),
  });

  return handleResponse<Teacher>(response, 'Failed to create teacher');
}

export async function updateTeacher(
  id: number,
  teacher: UpdateTeacherRequest
): Promise<Teacher> {
  const response = await fetch(`${API_URL}/teacher?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teacher),
  });

  return handleResponse<Teacher>(response, 'Failed to update teacher');
}

export async function deleteTeacher(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/teacher?id=${id}`, {
    method: 'DELETE',
  });

  return handleResponse<void>(response, 'Failed to delete teacher');
}
