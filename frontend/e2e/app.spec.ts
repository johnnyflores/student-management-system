import { test, expect } from '@playwright/test';

test.describe('Student Management System', () => {
  test('displays student dashboard', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByText('Welcome to the Student Management System Dashboard')
    ).toBeVisible();
  });
});
