import type { GradeLevel, StudentStatus } from '@/features/student/constants';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  grade: GradeLevel;
  status: StudentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  grade: GradeLevel;
}

export interface UpdateStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  grade: GradeLevel;
  status: StudentStatus;
}

export interface PaginatedStudents {
  items: Student[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
