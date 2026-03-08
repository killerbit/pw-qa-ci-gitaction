import { test, expect } from '@playwright/test';
import { step } from '../utility/stepHelper';

test('verify login Orange HRM', async ({ page }) => {

  await page.goto('');

  await step(page, 'Enter Username', async () => {
    await page.getByPlaceholder('Username').fill('Admin');
  });

  await step(page, 'Enter Password', async () => {
    await page.getByPlaceholder('Password').fill('admin123');
  });

  await step(page, 'Click Login', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
  });

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

});