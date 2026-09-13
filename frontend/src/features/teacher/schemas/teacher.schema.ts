import z from 'zod';

export const teacherSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  speciality: z.string().trim().min(1, 'Speciality is required'),
});

export type TeacherSchemaType = z.infer<typeof teacherSchema>;
