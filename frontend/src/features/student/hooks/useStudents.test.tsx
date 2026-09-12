import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useStudents from '@/features/student/hooks/useStudents';
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
} from '@/features/student/services/studentApi';
import type { CreateStudentRequest } from '../types/student';

vi.mock('@/features/student/services/studentApi', () => ({
  createStudent: vi.fn(),
  deleteStudent: vi.fn(),
  getStudent: vi.fn(),
  getStudents: vi.fn(),
  searchStudentsByName: vi.fn(),
  updateStudent: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(getStudents).mockResolvedValue({
    items: [],
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
});

describe('useStudents', () => {
  it('Return the initial student state', () => {
    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    expect(result.current.page).toBe(1);
    expect(result.current.limit).toBe(10);
    expect(result.current.students).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.totalPages).toBe(0);
  });

  it('Use the provided initial limit', () => {
    const { result } = renderHook(() => useStudents(20), {
      wrapper: createWrapper(),
    });

    expect(result.current.limit).toBe(20);
  });

  it('Search for a student by ID', async () => {
    const student = {
      id: 101,
      firstName: 'Bob',
      lastName: 'Tom',
      email: 'bob.tom@example.com',
      phone: '5141234567',
      dateOfBirth: '2003-01-01T00:00:00Z',
      grade: '12' as const,
      status: 'active' as const,
      createdAt: '2024-06-05',
      updatedAt: '2024-06-05',
    };

    vi.mocked(getStudent).mockResolvedValue(student);

    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.searchStudent(101);
    });

    await waitFor(() => {
      expect(getStudent).toHaveBeenCalledWith(101);
    });

    await waitFor(() => {
      expect(result.current.searchedStudent).toEqual(student);
    });
  });

  it('Add a student', async () => {
    const student: CreateStudentRequest = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '5141234567',
      dateOfBirth: '1999-01-01T00:00:00Z',
      grade: '5',
    };

    vi.mocked(createStudent).mockResolvedValue({
      id: 109,
      ...student,
      status: 'active',
      createdAt: '2024-06-05',
      updatedAt: '2024-06-05',
    });

    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.addStudent(student);
    });

    expect(createStudent).toHaveBeenCalledTimes(1);
    expect(createStudent).toHaveBeenCalledWith(student);
  });

  it('Delete a student', async () => {
    vi.mocked(deleteStudent).mockResolvedValue(undefined);

    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.removeStudent(101);
    });

    const mock = vi.mocked(deleteStudent);

    expect(mock).toHaveBeenCalled();
    expect(mock.mock.calls[0][0]).toBe(101);
  });

  it('Change the page', () => {
    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
  });

  it('Change the limit', () => {
    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setLimit(20);
    });

    expect(result.current.limit).toBe(20);
  });

  it('Clear the search and resets the page', () => {
    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setPage(3);
    });

    expect(result.current.page).toBe(3);

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.page).toBe(1);
  });
});
