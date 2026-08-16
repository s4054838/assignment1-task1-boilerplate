import { test, expect } from '@playwright/test';

// Edge case: invalid login credentials
// Run with: pnpm exec playwright test edge.spec.ts
//
// Uses the same TEST_USER_EMAIL from .env.local but an intentionally wrong
// password, to verify the error state renders correctly.

const BASE_URL = process.env.TEST_BASE_URL || 'https://assignment1-task1-boilerplate-front.vercel.app';
const TEST_EMAIL = process.env.TEST_USER_EMAIL || '';

test.describe('Edge case: invalid login', () => {
  test('wrong password shows an invalid credentials error', async ({ page }) => {
    test.skip(!TEST_EMAIL, 'TEST_USER_EMAIL not set');

    await page.goto(`${BASE_URL}/auth/signin`);

    await page.getByLabel('Email:').fill(TEST_EMAIL);
    await page.getByLabel('Password:').fill('definitely-the-wrong-password-123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText(/invalid email or password/i)).toBeVisible();

    // Confirm it did NOT navigate away from the signin page
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/auth/signin`));
  });
});