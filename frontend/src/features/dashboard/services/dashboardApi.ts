import type { DashboardStats } from '@/features/dashboard/types/dashboard';
import { handleResponse } from '@/helper/handleResponse';

const API_URL = import.meta.env.VITE_API_URL;

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_URL}/dashboard/stats`);
  return handleResponse<DashboardStats>(
    response,
    'Failed to fetch dashboard statistics'
  );
}
