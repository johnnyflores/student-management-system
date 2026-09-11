import type { Student } from '@/features/student/types/student';

export interface Course {
  id: number;
  name: string;
  teacherId: number;
  studentIds: number[];
}

export interface CreateCourse {
  Name: string;
  TeacherID: number;
}

export interface CourseWithStudents {
  id: number;
  name: string;
  teacherId: number;
  studentIds: Student[];
}

export interface PaginatedCourses {
  items: Course[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
