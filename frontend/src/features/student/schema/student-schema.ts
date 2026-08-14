import z from 'zod';

export const studentSchema = z.object({
  Name: z.string().min(1, { message: 'Name is required' }),
  Age: z
    .number({
      error: 'Age is required',
    })
    .int({ message: 'Age must be a whole number' })
    .min(1, { message: 'Age must be greater than 0' }),
  Grade: z.string().min(1, { message: 'Grade is required' }),
});

export type studentSchemaType = z.infer<typeof studentSchema>;
