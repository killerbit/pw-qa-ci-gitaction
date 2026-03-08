import { Page, test } from '@playwright/test';

export async function step(
  page: Page,
  stepName: string,
  action: () => Promise<void>
) {

  console.log(`\n▶ STEP: ${stepName}`);

  await test.step(stepName, async () => {

    try {
      await action();

      const screenshot = await page.screenshot({
        path: `screenshots/${stepName}-${Date.now()}.png`
      });

      await test.info().attach(`${stepName}-success`, {
        body: screenshot,
        contentType: 'image/png'
      });

      console.log(`✔ COMPLETED: ${stepName}`);

    } catch (error) {

      console.error(`✖ FAILED: ${stepName}`);

      const screenshot = await page.screenshot({
        path: `screenshots/${stepName}-FAILED-${Date.now()}.png`
      });

      await test.info().attach(`${stepName}-failed`, {
        body: screenshot,
        contentType: 'image/png'
      });

      console.error(error);

      throw error; // rethrow so Playwright marks test as failed
    }

  });

}