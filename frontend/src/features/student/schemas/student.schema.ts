import z from 'zod';

export const studentSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  age: z
    .number({
      error: 'Age is required',
    })
    .int({
      message: 'Age must be a whole number',
    })
    .min(1, {
      message: 'Age must be between 1 and 100',
    })
    .max(100, {
      message: 'Age must be between 1 and 100',
    }),
  grade: z.string().min(1, { message: 'Grade is required' }),
});

export type studentSchemaType = z.infer<typeof studentSchema>;
