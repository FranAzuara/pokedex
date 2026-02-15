import { test, expect } from '@playwright/test';

test('verify pagination truncation and loading visibility', async ({ page }) => {
  await page.goto('http://localhost:5173/pokedex');
  await page.waitForSelector('.pokemon-card', { timeout: 10000 });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/jules/verification/v3_page1.png' });

  // Click page 5 to see truncation
  // 14 pages total. Page 5 should show 1 ... 4 5 6 ... 14
  const page5Button = page.locator('button:has-text("5")');

  // Start navigation/click and watch for loader
  await page5Button.click();

  // Immediately take screenshot to see if pagination is still there during loading
  // We might need to be fast or use a slower network if it loads too fast
  await page.screenshot({ path: '/home/jules/verification/v3_loading.png' });

  // Wait for page 5 content (#401)
  await page.waitForFunction(() => {
    const firstId = document.querySelector('.pokemon-card p')?.textContent;
    return firstId === '#401';
  }, { timeout: 10000 });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/jules/verification/v3_page5.png' });
});
