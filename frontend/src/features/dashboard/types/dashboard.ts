import type { LucideIcon } from 'lucide-react';

export interface DashboardStats {
  students: number;
  teachers: number;
  courses: number;
  enrollments: number;
}

export type StatCardColor = 'blue' | 'green' | 'orange' | 'purple';

export interface StatCard {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  color: StatCardColor;
}
