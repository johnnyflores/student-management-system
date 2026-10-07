import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from './courseApi';
import type {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
} from '../types/course';

const API_URL = import.meta.env.VITE_API_URL;

vi.stubEnv('VITE_API_URL', API_URL);

beforeEach(() => {
  vi.clearAllMocks();

  vi.stubGlobal('fetch', vi.fn());
});

describe('getCourses', () => {
  it('fetches courses with pagination', async () => {
    const responseData = {
      items: [
        { id: 1, name: 'Math 101', description: 'Basic Math' },
        { id: 2, name: 'Physics 101', description: 'Basic Physics' },
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

    const result = await getCourses(1, 10);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/courses?page=1&limit=10`);
    expect(result).toEqual(responseData);
  });

  it('throws when fetching courses fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(getCourses()).rejects.toThrow('Failed to fetch courses');
  });
});

describe('getCourse', () => {
  it('fetches a course by ID', async () => {
    const course: Course = {
      id: 101,
      name: 'Math 101',
      teacherId: 201,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => course,
    } as Response);

    const result = await getCourse(101);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/course?id=101`);
    expect(result).toEqual(course);
  });

  it('throws when the course is not found', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(getCourse(999)).rejects.toThrow('Course not found');
  });
});

describe('createCourse', () => {
  it('creates a course without an ID', async () => {
    const course: CreateCourseRequest = {
      name: 'Math 102',
      teacherId: 202,
    };

    const createdCourse: Course = {
      id: 102,
      ...course,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => createdCourse,
    } as Response);

    const result = await createCourse(course);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    expect(result).toEqual(createdCourse);
  });

  it('throws when creating a course fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    const course: CreateCourseRequest = {
      name: 'Math 102',
      teacherId: 202,
    };

    await expect(createCourse(course)).rejects.toThrow(
      'Failed to create course'
    );
  });
});

describe('updateCourse', () => {
  it('updates a course successfully', async () => {
    const course: UpdateCourseRequest = {
      name: 'Math 202',
      teacherId: 202,
    };

    const updatedCourse: Course = {
      id: 102,
      ...course,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => updatedCourse,
    } as Response);

    const result = await updateCourse(102, course);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/course?id=102`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    expect(result).toEqual(updatedCourse);
  });

  it('throws when updating a course fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    const course: UpdateCourseRequest = {
      name: 'Math 102',
      teacherId: 202,
    };

    await expect(updateCourse(102, course)).rejects.toThrow(
      'Failed to update course'
    );
  });
});

describe('deleteCourse', () => {
  it('deletes a course successfully', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 204,
    } as Response);

    deleteCourse(102);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/course?id=102`, {
      method: 'DELETE',
    });
  });

  it('throws when deleting a course fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    await expect(deleteCourse(102)).rejects.toThrow('Failed to delete course');
  });
});
