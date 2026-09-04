import z from 'zod';

export const teacherSchema = z.object({
  Name: z.string().min(1, 'Name is required'),
  Speciality: z.string().min(1, 'Speciality is required'),
});

export type TeacherSchemaType = z.infer<typeof teacherSchema>;
