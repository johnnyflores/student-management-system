export interface Teacher {
  id: number;
  name: string;
  speciality: string;
}

export interface CreateTeacher {
  name: string;
  speciality: string;
}

export interface PaginatedTeachers {
  items: Teacher[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
