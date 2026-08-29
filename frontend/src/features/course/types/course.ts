import type { Student } from '@/features/student/types/student';

export interface Course {
  ID: number;
  Name: string;
  Teacher: string;
  Students: number[];
}

export interface CreateCourse {
  Name: string;
  Teacher: string;
}

export interface CourseWithStudents {
  ID: number;
  Name: string;
  Teacher: string;
  Students: Student[];
}
