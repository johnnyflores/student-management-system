import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  enrollStudent,
  getCourseEnrollments,
  unenrollStudent,
} from './enrollmentApi';
import type { Enrollment } from '../types/enrollment';
const API_URL = import.meta.env.VITE_API_URL;

vi.stubEnv('VITE_API_URL', API_URL);

beforeEach(() => {
  vi.clearAllMocks();

  vi.stubGlobal('fetch', vi.fn());
});

describe('getCourseEnrollments', () => {
  it('fetches course enrollments successfully', async () => {
    const enrollments = {
      data: [
        {
          id: 1,
          studentId: 101,
          courseId: 201,
        },
        {
          id: 2,
          studentId: 102,
          courseId: 201,
        },
      ],
      total: 2,
      page: 1,
      limit: 10,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(enrollments),
    } as unknown as Response);

    const result = await getCourseEnrollments(201);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/courses/students?course_id=201&page=1&limit=10`
    );

    expect(result).toEqual(enrollments);
  });

  it('uses custom pagination parameters', async () => {
    const enrollments = {
      data: [],
      total: 0,
      page: 2,
      limit: 20,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(enrollments),
    } as unknown as Response);

    const result = await getCourseEnrollments(201, 2, 20);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/courses/students?course_id=201&page=2&limit=20`
    );

    expect(result).toEqual(enrollments);
  });

  it('throws when fetching course enrollments fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    await expect(getCourseEnrollments(201)).rejects.toThrow(
      'Failed to fetch course enrollments'
    );
  });
});

describe('enrollStudent', () => {
  it('enrolls a student successfully', async () => {
    const enrollments: Enrollment[] = [
      {
        id: 1,
        courseId: 201,
        studentId: 101,
        enrolledAt: new Date().toISOString(),
      },
    ];

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 201,
      json: vi.fn().mockResolvedValue(enrollments),
    } as unknown as Response);

    const result = await enrollStudent(201, 101);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/courses/students?course_id=201&student_id=101`,
      {
        method: 'POST',
      }
    );

    expect(result).toEqual(enrollments);
  });

  it('throws when enrolling a student fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    await expect(enrollStudent(201, 101)).rejects.toThrow(
      'Failed to enroll student'
    );

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/courses/students?course_id=201&student_id=101`,
      {
        method: 'POST',
      }
    );
  });
});

describe('unenrollStudent', () => {
  it('unenrolls a student successfully', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 204,
    } as Response);

    await unenrollStudent(201, 101);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/courses/students?course_id=201&student_id=101`,
      {
        method: 'DELETE',
      }
    );
  });

  it('throws when unenrolling a student fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    await expect(unenrollStudent(201, 101)).rejects.toThrow(
      'Failed to unenroll student'
    );

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/courses/students?course_id=201&student_id=101`,
      {
        method: 'DELETE',
      }
    );
  });
});
