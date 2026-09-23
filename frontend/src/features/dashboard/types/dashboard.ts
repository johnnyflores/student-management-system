import type { LucideIcon } from 'lucide-react';

export interface DashboardStats {
  students: number;
  teachers: number;
  courses: number;
  enrollments: number;
}

export interface StatCard {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'purple';
}
