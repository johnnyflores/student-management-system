export const STUDENT_STATUSES = ['active', 'inactive', 'graduated'] as const;

export const studentStatuses = STUDENT_STATUSES;

export type StudentStatus = (typeof STUDENT_STATUSES)[number];

export const gradeLevels = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
] as const;

export type GradeLevel = (typeof gradeLevels)[number];
