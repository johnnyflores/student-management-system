export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  speciality: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeacherRequest {
  firstName: string;
  lastName: string;
  email: string;
  speciality: string;
}

export interface UpdateTeacherRequest {
  firstName: string;
  lastName: string;
  email: string;
  speciality: string;
}

export interface PaginatedTeachers {
  items: Teacher[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
