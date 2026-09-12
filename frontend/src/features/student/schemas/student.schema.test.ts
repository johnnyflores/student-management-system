import { describe, expect, it } from 'vitest';
import { studentSchema } from '@/features/student/schemas/student.schema';

describe('studentSchema', () => {
  it('accepts a valid student', () => {
    const result = studentSchema.safeParse({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '5141234567',
      dateOfBirth: '2000-01-01',
      grade: '5',
      status: 'active',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an empty first name', () => {
    const result = studentSchema.safeParse({
      firstName: '',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '5141234567',
      dateOfBirth: '2000-01-01',
      grade: '5',
      status: 'active',
    });

    expect(result.success).toBe(false);
  });

  it('rejects an empty last name', () => {
    const result = studentSchema.safeParse({
      firstName: 'John',
      lastName: '',
      email: 'john.doe@example.com',
      phone: '5141234567',
      dateOfBirth: '2000-01-01',
      grade: '5',
      status: 'active',
    });

    expect(result.success).toBe(false);
  });

  it('rejects a student with missing required fields', () => {
    const result = studentSchema.safeParse({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      grade: '5',
      status: 'active',
    });

    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = studentSchema.safeParse({
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      phone: '5141234567',
      dateOfBirth: '2000-01-01',
      grade: '5',
      status: 'active',
    });

    expect(result.success).toBe(false);
  });

  it('rejects an invalid grade', () => {
    const result = studentSchema.safeParse({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '5141234567',
      dateOfBirth: '2000-01-01',
      grade: 'A',
      status: 'active',
    });

    expect(result.success).toBe(false);
  });
});
