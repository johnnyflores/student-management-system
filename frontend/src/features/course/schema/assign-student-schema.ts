import z from 'zod';

export const assignStudentSchema = z.object({
  Student: z.number().min(1, { message: 'Student is required' }),
});

export type assignStudentSchemaType = z.infer<typeof assignStudentSchema>;
