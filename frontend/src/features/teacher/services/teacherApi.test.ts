import { beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  CreateTeacherRequest,
  Teacher,
  UpdateTeacherRequest,
} from '../types/teacher';
import {
  createTeacher,
  deleteTeacher,
  getTeacher,
  updateTeacher,
} from './teacherApi';

const API_URL = import.meta.env.VITE_API_URL;

vi.stubEnv('VITE_API_URL', API_URL);

const { getTeachers } = await import('./teacherApi');

beforeEach(() => {
  vi.clearAllMocks();

  vi.stubGlobal('fetch', vi.fn());
});

describe('getTeachers', () => {
  it('fetches teachers with pagination', async () => {
    const responseData = {
      items: [
        {
          id: 201,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          speciality: 'Mathematics',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
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

    const result = await getTeachers(1, 10);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/teachers?page=1&limit=10`);
    expect(result).toEqual(responseData);
  });

  it('handles fetch errors', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(getTeachers()).rejects.toThrow('Failed to fetch teachers');
  });
});

describe('getTeacher', () => {
  it('fetches a teacher by ID', async () => {
    const teacher: Teacher = {
      id: 201,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      speciality: 'Mathematics',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => teacher,
    } as Response);
    const result = await getTeacher(201);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/teacher?id=201`);
    expect(result).toEqual(teacher);
  });

  it('handles fetch errors', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(getTeacher(201)).rejects.toThrow('Failed to fetch teacher');
  });
});

describe('createTeacher', () => {
  it('creates a new teacher without an ID', async () => {
    const teacher: CreateTeacherRequest = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      speciality: 'Physics',
    };

    const createdTeacher: Teacher = {
      id: 202,
      ...teacher,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => createdTeacher,
    } as Response);

    const result = await createTeacher(teacher);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/teachers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacher),
    });
    console.log(result);
    expect(result).toEqual(createdTeacher);
  });

  it('trows when creating a teacher fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    const teacher: CreateTeacherRequest = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      speciality: 'Physics',
    };

    await expect(createTeacher(teacher)).rejects.toThrow(
      'Failed to create teacher'
    );
  });
});

describe('updateTeacher', () => {
  it('updates an existing teacher', async () => {
    const teacher: UpdateTeacherRequest = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      speciality: 'Mathematics',
    };

    const updatedTeacher: Teacher = {
      id: 201,
      ...teacher,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => updatedTeacher,
    } as Response);

    const result = await updateTeacher(201, teacher);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/teacher?id=201`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacher),
    });
    expect(result).toEqual(updatedTeacher);
  });

  it('throws when updating a teacher fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    const teacher: UpdateTeacherRequest = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      speciality: 'Mathematics',
    };

    await expect(updateTeacher(201, teacher)).rejects.toThrow(
      'Failed to update teacher'
    );
  });
});

describe('deleteTeacher', () => {
  it('deletes a teacher', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 204,
    } as Response);

    await deleteTeacher(201);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/teacher?id=201`, {
      method: 'DELETE',
    });
  });

  it('throws when deleting a teacher fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    await expect(deleteTeacher(201)).rejects.toThrow(
      'Failed to delete teacher'
    );

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/teacher?id=201`, {
      method: 'DELETE',
    });
  });
});
