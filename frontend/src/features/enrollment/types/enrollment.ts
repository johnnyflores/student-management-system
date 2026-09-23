export interface Enrollment {
  id: number;
  courseId: number;
  studentId: number;
  enrolledAt: string;
}

export interface EnrollStudentRequest {
  courseId: number;
  studentId: number;
}

export interface PaginatedCourses {
  items: Enrollment[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
