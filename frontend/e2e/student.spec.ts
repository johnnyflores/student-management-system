import { test, expect } from '@playwright/test';

test.describe('Student Feature', () => {
  test('Display students page', async ({ page }) => {
    await page.goto('/students');

    await expect(page).toHaveTitle(/Students | Student Management System/);

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'All Students',
      })
    ).toBeVisible();
  });

  test('Filters students by search term', async ({ page }) => {
    await page.goto('/students');

    const searchInput = page.getByTestId('table-search');

    await expect(searchInput).toBeVisible();

    await searchInput.fill('Marie');

    await expect(page.getByRole('row', { name: /Marie Kenth/ })).toBeVisible();
    await expect(
      page.getByText('No data found', { exact: true })
    ).not.toBeVisible();
  });

  test('Displays no data found when search has no results', async ({
    page,
  }) => {
    await page.goto('/students');

    const searchInput = page.getByTestId('table-search');

    await searchInput.fill('John Doe');

    await expect(
      page.getByText('No data found', { exact: true })
    ).toBeVisible();
  });
});
