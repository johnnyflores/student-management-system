import type { Student } from '../types/student';

const API_URL = 'http://localhost:8080';

export async function getStudents(): Promise<Student[]> {
  const response = await fetch(`${API_URL}/students`);

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

export async function createStudent(student: Student): Promise<Student> {
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
