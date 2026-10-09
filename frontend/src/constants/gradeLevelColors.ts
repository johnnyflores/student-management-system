import type { GradeLevel } from '@/constants/gradeLevels';

export const gradeLevelColors: Record<
  GradeLevel,
  { bg: string; text: string }
> = {
  '1': { bg: 'bg-blue-100', text: 'text-blue-600' },
  '2': { bg: 'bg-purple-100', text: 'text-purple-600' },
  '3': { bg: 'bg-orange-100', text: 'text-orange-600' },
  '4': { bg: 'bg-green-100', text: 'text-green-600' },
  '5': { bg: 'bg-pink-100', text: 'text-pink-600' },
  '6': { bg: 'bg-indigo-100', text: 'text-indigo-600' },
  '7': { bg: 'bg-teal-100', text: 'text-teal-600' },
  '8': { bg: 'bg-red-100', text: 'text-red-600' },
  '9': { bg: 'bg-cyan-100', text: 'text-cyan-600' },
  '10': { bg: 'bg-amber-100', text: 'text-amber-600' },
  '11': { bg: 'bg-violet-100', text: 'text-violet-600' },
  '12': { bg: 'bg-emerald-100', text: 'text-emerald-600' },
};
