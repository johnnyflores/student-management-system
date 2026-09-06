import type { Student } from '@/features/student/types/student';

export interface Course {
  ID: number;
  Name: string;
  TeacherID: number;
  Students: number[];
}

export interface CreateCourse {
  Name: string;
  TeacherID: number;
}

export interface CourseWithStudents {
  ID: number;
  Name: string;
  TeacherID: number;
  Students: Student[];
}
