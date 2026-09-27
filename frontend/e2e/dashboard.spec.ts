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

test.describe('Dashboard Feature', () => {
  test('Display dashboard page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Dashboard | Student Management System');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Dashboard',
      })
    ).toBeVisible();
  });

  test('Display dashboard sections', async ({ page }) => {
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
  test('Display recent students section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('recent-students-title')).toBeVisible();

    await expect(
      page.getByText('Recently registered students', { exact: true })
    ).toBeVisible();

    await expect(page.getByRole('link', { name: 'View All' })).toBeVisible();
  });

  test('Navigate to students page when clicking View All', async ({ page }) => {
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

  test('Display recent students table', async ({ page }) => {
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

  test('Display up to three recent students', async ({ page }) => {
    await page.goto('/');

    const table = page.getByRole('table');

    await expect(table).toBeVisible();

    const rows = table.getByRole('row');

    await expect(rows).toHaveCount(4);
  });
});

test.describe('Quick Actions', () => {
  test('Display quick actions section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('quick-actions-title')).toBeVisible();

    await expect(
      page.getByText('Quick Actions', { exact: true })
    ).toBeVisible();
  });

  test('Navigate to quick actions when clicking Add Student', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Add Student' }).click();

    await expect(page.getByTestId('add-student-title')).toBeVisible();

    await page.getByTestId('add-student-close').click();

    await expect(page.getByTestId('add-student-title')).not.toBeVisible();
  });

  test('Navigate to quick actions when clicking Add Teacher', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Add Teacher' }).click();

    await expect(page.getByTestId('add-teacher-title')).toBeVisible();

    await page.getByTestId('add-teacher-close').click();

    await expect(page.getByTestId('add-teacher-title')).not.toBeVisible();
  });

  test('Navigate to quick actions when clicking Add Course', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Add Course' }).click();

    await expect(page.getByTestId('add-course-title')).toBeVisible();

    await page.getByTestId('add-course-close').click();

    await expect(page.getByTestId('add-course-title')).not.toBeVisible();
  });
});
