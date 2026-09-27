import { test, expect } from '@playwright/test';

test.describe('Teacher Feature', () => {
  test('Display teachers page', async ({ page }) => {
    await page.goto('/teachers');

    await expect(page).toHaveTitle(/Teachers | Student Management System/);

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'All Teachers',
      })
    ).toBeVisible();
  });

  test('Filters teachers by search term', async ({ page }) => {
    await page.goto('/teachers');

    const searchInput = page.getByTestId('table-search');

    await expect(searchInput).toBeVisible();

    await searchInput.fill('Paul');

    await expect(page.getByRole('row', { name: /Paul Connor/ })).toBeVisible();
    await expect(
      page.getByText('No data found', { exact: true })
    ).not.toBeVisible();
  });

  test('Displays no data found when search has no results', async ({
    page,
  }) => {
    await page.goto('/teachers');

    const searchInput = page.getByTestId('table-search');

    await searchInput.fill('Test');

    await expect(
      page.getByText('No data found', { exact: true })
    ).toBeVisible();
  });
});
