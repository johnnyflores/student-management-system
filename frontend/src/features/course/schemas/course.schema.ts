import z from 'zod';

export const courseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  teacherId: z.number().min(1, { message: 'Teacher is required' }),
});

export type courseSchemaType = z.infer<typeof courseSchema>;
