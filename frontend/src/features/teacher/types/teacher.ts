export interface Teacher {
  ID: number;
  Name: string;
  Speciality: string;
}

export interface CreateTeacher {
  Name: string;
  Speciality: string;
}

export interface PaginatedTeachers {
  items: Teacher[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
