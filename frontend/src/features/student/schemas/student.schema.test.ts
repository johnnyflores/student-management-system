import { describe, expect, it } from 'vitest';
import { studentSchema } from '@/features/student/schemas/student.schema';

describe('studentSchema', () => {
  it('accepts a valid student', () => {
    const result = studentSchema.safeParse({
      name: 'John',
      age: 25,
      grade: 'A',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an empty name', () => {
    const result = studentSchema.safeParse({
      name: '',
      age: 25,
      grade: 'A',
    });

    expect(result.success).toBe(false);
  });

  it('rejects age 0', () => {
    const result = studentSchema.safeParse({
      name: 'John',
      age: 0,
      grade: 'A',
    });

    expect(result.success).toBe(false);
  });

  it('rejects age greater than 100', () => {
    const result = studentSchema.safeParse({
      name: 'John',
      age: 101,
      grade: 'A',
    });

    expect(result.success).toBe(false);
  });

  it('accepts age 1', () => {
    const result = studentSchema.safeParse({
      name: 'John',
      age: 1,
      grade: 'A',
    });

    expect(result.success).toBe(true);
  });

  it('accepts age 100', () => {
    const result = studentSchema.safeParse({
      name: 'John',
      age: 100,
      grade: 'A',
    });

    expect(result.success).toBe(true);
  });

  it('rejects a decimal age', () => {
    const result = studentSchema.safeParse({
      name: 'John',
      age: 25.5,
      grade: 'A',
    });

    expect(result.success).toBe(false);
  });

  it('rejects an empty grade', () => {
    const result = studentSchema.safeParse({
      name: 'John',
      age: 25,
      grade: '',
    });

    expect(result.success).toBe(false);
  });
});
