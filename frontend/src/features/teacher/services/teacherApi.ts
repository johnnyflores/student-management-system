import type { Teacher } from '@/features/teacher/types/teacher';

const API_URL = import.meta.env.VITE_API_URL;

export async function getTeachers(): Promise<Teacher[]> {
  const response = await fetch(`${API_URL}/teachers`);

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

export async function createTeacher(
  teacher: Omit<Teacher, 'ID'>
): Promise<Teacher> {
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
  teacher: Omit<Teacher, 'ID'>
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
