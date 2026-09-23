import type { DashboardStats } from '@/features/dashboard/types/dashboard';

const API_URL = import.meta.env.VITE_API_URL;

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_URL}/dashboard/stats`);

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard statistics');
  }

  return response.json();
}
