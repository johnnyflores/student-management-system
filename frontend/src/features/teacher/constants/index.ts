export const TEACHER_SPECIALITIES = [
  'Engineering',
  'Programming',
  'Mathematics',
  'Chemistry',
  'Psychology',
  'Biology',
] as const;

export const teacherSpecialities = TEACHER_SPECIALITIES;

export type TeacherSpeciality = (typeof TEACHER_SPECIALITIES)[number];
