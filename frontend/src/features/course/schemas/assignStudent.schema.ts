import z from 'zod';

export const assignStudentSchema = z.object({
  StudentID: z.number().min(1, { message: 'Student is required' }),
});

export type AssignStudentSchemaType = z.infer<typeof assignStudentSchema>;
