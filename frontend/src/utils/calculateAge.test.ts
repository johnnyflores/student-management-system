import { describe, expect, it } from 'vitest';
import { calculateAge } from '@/utils/calculateAge';

describe('calculateAge', () => {
  it('calculates age correctly', () => {
    const today = new Date();
    const birthYear = today.getFullYear() - 20;

    const dateOfBirth = `${birthYear}-01-01`;

    expect(calculateAge(dateOfBirth)).toBe(20);
  });

  it('subtracts one year when birthday has not occurred yet', () => {
    const today = new Date();

    const nextBirthday = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    const birthYear = today.getFullYear() - 20;

    const dateOfBirth = `${birthYear}-${String(
      nextBirthday.getMonth() + 1
    ).padStart(2, '0')}-${String(nextBirthday.getDate()).padStart(2, '0')}`;

    expect(calculateAge(dateOfBirth)).toBe(19);
  });
});
