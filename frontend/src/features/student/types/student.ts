export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

export interface CreateStudent {
  name: string;
  age: number;
  grade: string;
}

export interface PaginatedStudents {
  items: Student[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
