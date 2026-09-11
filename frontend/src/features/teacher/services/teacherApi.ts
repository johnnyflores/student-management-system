import type {
  Teacher,
  CreateTeacher,
  PaginatedTeachers,
} from '@/features/teacher/types/teacher';

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

  if (!response.ok) {
    throw new Error('Failed to fetch teachers');
  }

  return response.json();
}

export async function getTeacher(id: number): Promise<Teacher> {
  const response = await fetch(`${API_URL}/teacher?id=${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch teacher');
  }

  return response.json();
}

export async function createTeacher(teacher: CreateTeacher): Promise<Teacher> {
  const response = await fetch(`${API_URL}/teachers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teacher),
  });

  if (!response.ok) {
    throw new Error('Failed to create teacher');
  }

  return response.json();
}

export async function updateTeacher(
  id: number,
  teacher: CreateTeacher
): Promise<Teacher> {
  const response = await fetch(`${API_URL}/teacher?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teacher),
  });

  if (!response.ok) {
    throw new Error('Failed to update teacher');
  }

  return response.json();
}

export async function deleteTeacher(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/teacher?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete teacher');
  }
}
