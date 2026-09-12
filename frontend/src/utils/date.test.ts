import { describe, expect, it } from 'vitest';
import { toApiDate, toInputDate } from './date';

describe('date utilities', () => {
  it('converts input date to API date', () => {
    expect(toApiDate('1999-01-28')).toBe('1999-01-28T00:00:00Z');
  });

  it('converts API date to input date', () => {
    expect(toInputDate('1999-01-28T00:00:00Z')).toBe('1999-01-28');
  });
});
