import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CreateStudent, Student } from '@/features/student/types/student';

const API_URL = import.meta.env.VITE_API_URL;

vi.stubEnv('VITE_API_URL', API_URL);

const {
  getStudents,
  getStudent,
  searchStudentsByName,
  createStudent,
  updateStudent,
  deleteStudent,
} = await import('./studentApi');

beforeEach(() => {
  vi.clearAllMocks();

  vi.stubGlobal('fetch', vi.fn());
});

describe('getStudents', () => {
  it('fetches students with pagination', async () => {
    const responseData = {
      students: [
        {
          ID: 101,
          Name: 'Bob Tom',
          Age: 21,
          Grade: 'Science',
        },
      ],
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => responseData,
    } as Response);

    const result = await getStudents(1, 10);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/students?page=1&limit=10`);

    expect(result).toEqual(responseData);
  });

  it('throws when fetching students fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(getStudents()).rejects.toThrow('Failed to fetch students');
  });
});

describe('getStudent', () => {
  it('fetches a student by ID', async () => {
    const student: Student = {
      ID: 101,
      Name: 'Bob Tom',
      Age: 21,
      Grade: 'Science',
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => student,
    } as Response);

    const result = await getStudent(101);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/student?id=101`);

    expect(result).toEqual(student);
  });

  it('throws when the student is not found', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(getStudent(999)).rejects.toThrow('Student not found');
  });
});

describe('searchStudentsByName', () => {
  it('searches students by name', async () => {
    const students: Student[] = [
      {
        ID: 101,
        Name: 'Bob Tom',
        Age: 21,
        Grade: 'Science',
      },
    ];

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => students,
    } as Response);

    const result = await searchStudentsByName('Bob Tom');

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/students?name=Bob%20Tom`);

    expect(result).toEqual(students);
  });

  it('throws when name search fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(searchStudentsByName('Bob')).rejects.toThrow(
      'Failed to search students'
    );
  });
});

describe('createStudent', () => {
  it('creates a student without an ID', async () => {
    const student: CreateStudent = {
      Name: 'Donald',
      Age: 30,
      Grade: 'AI',
    };

    const createdStudent: Student = {
      ID: 109,
      ...student,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => createdStudent,
    } as Response);

    const result = await createStudent(student);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    expect(result).toEqual(createdStudent);
  });

  it('throws when creating a student fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    const student: CreateStudent = {
      Name: 'John',
      Age: 25,
      Grade: 'A',
    };

    await expect(createStudent(student)).rejects.toThrow(
      'Failed to create student'
    );
  });
});

describe('updateStudent', () => {
  it('updates a student', async () => {
    const student: Student = {
      ID: 101,
      Name: 'Bob Updated',
      Age: 22,
      Grade: 'A',
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => student,
    } as Response);

    const result = await updateStudent(101, student);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/student?id=101`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    expect(result).toEqual(student);
  });

  it('throws when updating a student fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    const student: Student = {
      ID: 101,
      Name: 'John',
      Age: 25,
      Grade: 'A',
    };

    await expect(updateStudent(101, student)).rejects.toThrow(
      'Failed to update student'
    );
  });
});

describe('deleteStudent', () => {
  it('deletes a student', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
    } as Response);

    await deleteStudent(101);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/student?id=101`, {
      method: 'DELETE',
    });
  });

  it('throws when deleting a student fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(deleteStudent(101)).rejects.toThrow(
      'Failed to delete student'
    );
  });
});
