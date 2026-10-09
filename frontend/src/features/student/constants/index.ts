export const STUDENT_STATUSES = ['active', 'inactive', 'graduated'] as const;

export const studentStatuses = STUDENT_STATUSES;

export type StudentStatus = (typeof STUDENT_STATUSES)[number];
