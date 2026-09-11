export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentRequest {
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
