import z from 'zod';

export const teacherSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  speciality: z.string().min(1, 'Speciality is required'),
});

export type TeacherSchemaType = z.infer<typeof teacherSchema>;
