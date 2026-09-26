import type { LucideIcon } from 'lucide-react';
import type { ColorName } from '@/constants/colorStyles';

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
  color: ColorName;
}
