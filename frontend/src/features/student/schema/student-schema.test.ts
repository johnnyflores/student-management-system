import { describe, expect, it } from 'vitest';
import { studentSchema } from './student-schema';

describe('studentSchema', () => {
  it('accepts a valid student', () => {
    const result = studentSchema.safeParse({
      Name: 'John',
      Age: 25,
      Grade: 'A',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an empty name', () => {
    const result = studentSchema.safeParse({
      Name: '',
      Age: 25,
      Grade: 'A',
    });

    expect(result.success).toBe(false);
  });

  it('rejects age 0', () => {
    const result = studentSchema.safeParse({
      Name: 'John',
      Age: 0,
      Grade: 'A',
    });

    expect(result.success).toBe(false);
  });

  it('rejects age greater than 100', () => {
    const result = studentSchema.safeParse({
      Name: 'John',
      Age: 101,
      Grade: 'A',
    });

    expect(result.success).toBe(false);
  });

  it('accepts age 1', () => {
    const result = studentSchema.safeParse({
      Name: 'John',
      Age: 1,
      Grade: 'A',
    });

    expect(result.success).toBe(true);
  });

  it('accepts age 100', () => {
    const result = studentSchema.safeParse({
      Name: 'John',
      Age: 100,
      Grade: 'A',
    });

    expect(result.success).toBe(true);
  });

  it('rejects a decimal age', () => {
    const result = studentSchema.safeParse({
      Name: 'John',
      Age: 25.5,
      Grade: 'A',
    });

    expect(result.success).toBe(false);
  });

  it('rejects an empty grade', () => {
    const result = studentSchema.safeParse({
      Name: 'John',
      Age: 25,
      Grade: '',
    });

    expect(result.success).toBe(false);
  });
});
