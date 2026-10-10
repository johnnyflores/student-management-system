import type { TeacherSpeciality } from '@/features/teacher/constants';

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  speciality: TeacherSpeciality;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeacherRequest {
  firstName: string;
  lastName: string;
  email: string;
  speciality: TeacherSpeciality;
}

export interface UpdateTeacherRequest {
  firstName: string;
  lastName: string;
  email: string;
  speciality: TeacherSpeciality;
}

export interface PaginatedTeachers {
  items: Teacher[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
