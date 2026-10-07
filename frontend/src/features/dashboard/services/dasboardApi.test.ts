import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDashboardStats } from './dashboardApi';
import type { DashboardStats } from '../types/dashboard';
const API_URL = import.meta.env.VITE_API_URL;

vi.stubEnv('VITE_API_URL', API_URL);

beforeEach(() => {
  vi.clearAllMocks();

  vi.stubGlobal('fetch', vi.fn());
});

describe('getDashboardStats', () => {
  it('fetches dashboard stats successfully', async () => {
    const data: DashboardStats = {
      students: 100,
      courses: 10,
      teachers: 5,
      enrollments: 50,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => data,
    } as Response);

    const result = await getDashboardStats();

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/dashboard/stats`);
    expect(result).toEqual(data);
  });

  it('throws when fetching dashboard stats fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(getDashboardStats()).rejects.toThrow(
      'Failed to fetch dashboard statistics'
    );
  });
});
