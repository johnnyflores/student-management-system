import { test, expect } from '@playwright/test';

test.describe('Course Feature', () => {
  test('Display courses page', async ({ page }) => {
    await page.goto('/courses');

    await expect(page).toHaveTitle(/Courses | Student Management System/);

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'All Courses',
      })
    ).toBeVisible();
  });

  test('Filters courses by search term', async ({ page }) => {
    await page.goto('/courses');

    const searchInput = page.getByTestId('table-search');

    await expect(searchInput).toBeVisible();

    await searchInput.fill('Go');

    await expect(
      page.getByRole('row', { name: /Go Programming/ })
    ).toBeVisible();
    await expect(
      page.getByText('No data found', { exact: true })
    ).not.toBeVisible();
  });

  test('Displays no data found when search has no results', async ({
    page,
  }) => {
    await page.goto('/courses');

    const searchInput = page.getByTestId('table-search');

    await searchInput.fill('Test');

    await expect(
      page.getByText('No data found', { exact: true })
    ).toBeVisible();
  });
});
