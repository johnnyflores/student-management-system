import z from 'zod';

export const studentSchema = z.object({
  ID: z.string().min(1, { message: 'ID is required' }),
  Name: z.string().min(1, { message: 'Name is required' }),
  Age: z.number().min(0, { message: 'Age must be a positive number' }),
  Grade: z.string().min(1, { message: 'Grade is required' }),
});

export type studentSchemaType = z.infer<typeof studentSchema>;
