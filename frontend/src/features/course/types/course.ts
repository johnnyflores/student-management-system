export interface Course {
  id: number;
  name: string;
  teacherId: number;
}

export interface CreateCourse {
  Name: string;
  TeacherID: number;
}

export interface CourseWithStudents {
  id: number;
  name: string;
  teacherId: number;
  studentIds: number[];
}

export interface PaginatedCourses {
  items: Course[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
