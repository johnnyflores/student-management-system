import z from 'zod';

export const courseSchema = z.object({
  Name: z.string().min(1, { message: 'Name is required' }),
  Teacher: z.string().min(1, { message: 'Teacher Name is required' }),
});

export type courseSchemaType = z.infer<typeof courseSchema>;
