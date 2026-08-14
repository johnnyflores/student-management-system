import type {
  CreateStudent,
  PaginatedStudents,
  Student,
} from '@/features/student/types/student';

const API_URL = import.meta.env.VITE_API_URL;

export async function getStudents(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedStudents> {
  const response = await fetch(
    `${API_URL}/students?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }

  return response.json();
}

export async function getStudent(id: number): Promise<Student> {
  const response = await fetch(`${API_URL}/student?id=${id}`);

  if (!response.ok) {
    throw new Error('Student not found');
  }

  return response.json();
}

export async function searchStudentsByName(name: string): Promise<Student[]> {
  const response = await fetch(
    `${API_URL}/students?name=${encodeURIComponent(name)}`
  );

  if (!response.ok) {
    throw new Error('Failed to search students');
  }

  return response.json();
}

export async function createStudent(student: CreateStudent): Promise<Student> {
  const response = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error('Failed to create student');
  }

  return response.json();
}

export async function updateStudent(
  id: number,
  student: Student
): Promise<Student> {
  const response = await fetch(`${API_URL}/student?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error('Failed to update student');
  }

  return response.json();
}

export async function deleteStudent(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/student?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete student');
  }
}
