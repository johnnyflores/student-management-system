import { z } from 'zod';

import { gradeLevels, studentStatuses } from '@/features/student/constants';

export const studentSchema = z.object({
  firstName: z.string().trim().min(1, { message: 'First name is required' }),
  lastName: z.string().trim().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' }),
  phone: z.string().trim().min(1, { message: 'Phone is required' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  grade: z.enum(gradeLevels, {
    message: 'Grade is required',
  }),
  status: z.enum(studentStatuses, {
    message: 'Status is required',
  }),
});

export type StudentSchemaType = z.infer<typeof studentSchema>;
