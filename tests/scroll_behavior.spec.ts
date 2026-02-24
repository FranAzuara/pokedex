import { test, expect } from '@playwright/test';

test.describe('Scroll Behavior', () => {
  test('should scroll to top on navigation', async ({ page }) => {
    await page.goto('http://localhost:5173');
    // Scroll to bottom of home page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Navigate to Pokedex
    await page.getByRole('link', { name: 'Pokédex' }).first().click();
    await page.waitForURL(/\/pokedex/);

    // Check if at top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });

  test('should NOT scroll down to gallery when applying filters', async ({ page }) => {
    await page.goto('http://localhost:5173/pokedex');
    await page.waitForLoadState('networkidle');

    // Ensure we are at the top
    await page.evaluate(() => window.scrollTo(0, 0));

    // Apply a type filter
    // Based on TypeFilter.tsx, the buttons have the type name in them
    const fireFilter = page.getByRole('button', { name: 'fire', exact: true });
    await fireFilter.click();

    // Wait for loading to finish or some time to pass
    await page.waitForTimeout(1000);

    const scrollY = await page.evaluate(() => window.scrollY);
    // If it scrolled to gallery, scrollY would be significant (e.g. > 400)
    // We expect it to STAY at the top (scrollY close to 0)
    expect(scrollY).toBeLessThan(200);
  });

  test('should scroll to gallery when changing page', async ({ page }) => {
    await page.goto('http://localhost:5173/pokedex');
    await page.waitForLoadState('networkidle');

    // Scroll to bottom to reach pagination
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const page2Button = page.getByLabel('Page 2');
    await page2Button.click();

    // Wait for smooth scroll
    await page.waitForTimeout(2000);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(300); // Gallery is below the header
  });
});
