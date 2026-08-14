export interface Student {
  ID: number;
  Name: string;
  Age: number;
  Grade: string;
}

export interface CreateStudent {
  Name: string;
  Age: number;
  Grade: string;
}

export interface PaginatedStudents {
  students: Student[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
