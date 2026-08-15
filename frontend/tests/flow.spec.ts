import { test, expect } from '@playwright/test';

// Login -> redirect -> team page flow
// Run with: pnpm exec playwright test flow.spec.ts
//
// Requires two env vars pointing at a real test account in your Firebase project:
//   TEST_USER_EMAIL, TEST_USER_PASSWORD
// Set these in a .env.local (never commit real credentials into this file).

const BASE_URL = process.env.TEST_BASE_URL || 'https://assignment1-task1-boilerplate-front.vercel.app';
const TEST_EMAIL = process.env.TEST_USER_EMAIL || '';
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD || '';

test.describe('Login -> redirect -> team page flow', () => {
  test('successful login redirects to /team and renders member cards', async ({ page }) => {
    test.skip(!TEST_EMAIL || !TEST_PASSWORD, 'TEST_USER_EMAIL / TEST_USER_PASSWORD not set');

    await page.goto(`${BASE_URL}/auth/signin`);

    await page.getByLabel('Email:').fill(TEST_EMAIL);
    await page.getByLabel('Password:').fill(TEST_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.waitForURL(`${BASE_URL}/team`);

    await expect(page.getByText('Chelsea Lasslett')).toBeVisible();
    await expect(page.getByText('Minh Nguyen')).toBeVisible();
    await expect(page.getByText('Chriswin Joseph')).toBeVisible();
    await expect(page.getByText('Savio Simon')).toBeVisible();
  });

  test('accessing /team without a session redirects to /auth/signin', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto(`${BASE_URL}/team`);
    await page.waitForURL(`${BASE_URL}/auth/signin*`);
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/auth/signin`));
  });
});