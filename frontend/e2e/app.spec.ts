import { test, expect } from '@playwright/test';

const pages = [
  {
    name: 'students',
    path: '/students',
    title: 'Students | Student Management System',
    heading: 'All Students',
  },
  {
    name: 'courses',
    path: '/courses',
    title: 'Courses | Student Management System',
    heading: 'All Courses',
  },
  {
    name: 'teachers',
    path: '/teachers',
    title: 'Teachers | Student Management System',
    heading: 'All Teachers',
  },
];

test.describe('Dashboard', () => {
  test('displays dashboard', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Dashboard | Student Management System');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Dashboard',
      })
    ).toBeVisible();
  });

  test('displays dashboard sections', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Dashboard statistics',
      })
    ).toBeAttached();

    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Dashboard chart',
      })
    ).toBeAttached();
  });
});

test.describe('Student Management System pages', () => {
  for (const pageInfo of pages) {
    test(`displays ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path);

      await expect(page).toHaveTitle(pageInfo.title);

      await expect(
        page.getByRole('heading', {
          level: 1,
          name: pageInfo.heading,
        })
      ).toBeVisible();
    });
  }
});

test.describe('Recent Students', () => {
  test('displays recent students section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('recent-students-title')).toBeVisible();

    await expect(
      page.getByText('Recently registered students', { exact: true })
    ).toBeVisible();

    await expect(page.getByRole('link', { name: 'View All' })).toBeVisible();
  });

  test('navigates to students page when clicking View All', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'View All' }).click();

    await expect(page).toHaveURL(/\/students/);

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'All Students',
      })
    ).toBeVisible();
  });
});

test.describe('Recent Students table', () => {
  test('displays recent students table', async ({ page }) => {
    await page.goto('/');

    const table = page.getByRole('table');

    await expect(table).toBeVisible();

    await expect(table.getByRole('columnheader', { name: 'ID' })).toBeVisible();

    await expect(
      table.getByRole('columnheader', { name: 'Name' })
    ).toBeVisible();

    await expect(
      table.getByRole('columnheader', { name: 'Email' })
    ).toBeVisible();

    await expect(
      table.getByRole('columnheader', { name: 'Grade' })
    ).toBeVisible();

    await expect(
      table.getByRole('columnheader', { name: 'Status' })
    ).toBeVisible();

    await expect(
      table.getByRole('columnheader', { name: 'Updated At' })
    ).toBeVisible();
  });

  test('displays up to three recent students', async ({ page }) => {
    await page.goto('/');

    const table = page.getByRole('table');

    await expect(table).toBeVisible();

    const rows = table.getByRole('row');

    await expect(rows).toHaveCount(4);
  });
});

test.describe('Student search', () => {
  test('filters students by search term', async ({ page }) => {
    await page.goto('/students');

    const searchInput = page.getByTestId('table-search');

    await expect(searchInput).toBeVisible();

    await searchInput.fill('Marie');

    await expect(page.getByRole('row', { name: /Marie Kenth/ })).toBeVisible();
    await expect(
      page.getByText('No data found', { exact: true })
    ).not.toBeVisible();
  });

  test('displays no data found when search has no results', async ({
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
