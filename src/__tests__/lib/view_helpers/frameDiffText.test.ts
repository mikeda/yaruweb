import { frameDiffText } from '@/lib';

describe(frameDiffText, () => {
  test('有利は+がつく', () => {
    expect(frameDiffText(5)).toBe('+5F');
  });

  test('五分は±がつく', () => {
    expect(frameDiffText(0)).toBe('±0F');
  });

  test('不利は-がつく', () => {
    expect(frameDiffText(-5)).toBe('-5F');
  });
});
