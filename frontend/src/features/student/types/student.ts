export type GradeLevel =
  '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type StudentStatus = 'active' | 'inactive' | 'graduated';

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
