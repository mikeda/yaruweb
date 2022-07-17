import { formatSec } from '@/lib';

describe(formatSec, () => {
  test('1分未満', () => {
    expect(formatSec(5)).toBe('00:05');
  });

  test('1分以上', () => {
    expect(formatSec(61)).toBe('01:01');
  });

  test('1時間以上', () => {
    expect(formatSec(3661)).toBe('01:01:01');
  });
});
