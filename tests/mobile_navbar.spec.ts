import { test, expect } from '@playwright/test';

test.describe('Mobile Navbar', () => {
  test.use({
    viewport: { width: 375, height: 667 },
  });

  test('should open and close the mobile menu', async ({ page }) => {
    // We assume the dev server is running on localhost:5173
    await page.goto('http://localhost:5173');

    // 1. Verify hamburger button is visible on mobile
    const toggleButton = page.getByLabel('Toggle menu');
    await expect(toggleButton).toBeVisible();
    await expect(toggleButton).toHaveText('menu');

    // 2. Click to open menu
    await toggleButton.click();
    await expect(toggleButton).toHaveText('close');

    // 3. Verify links are visible
    const mobileMenu = page.locator('nav.sm\\:hidden');
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Pokédex' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Comparator' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Blog' })).toBeVisible();

    // 4. Click a link and verify menu closes and navigation occurs
    await mobileMenu.getByRole('link', { name: 'Pokédex' }).click();
    await expect(page).toHaveURL(/\/pokedex/);
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should close menu when clicking the close icon', async ({ page }) => {
    await page.goto('http://localhost:5173');
    const toggleButton = page.getByLabel('Toggle menu');

    await toggleButton.click();
    await expect(page.locator('nav.sm\\:hidden')).toBeVisible();

    await toggleButton.click();
    await expect(page.locator('nav.sm\\:hidden')).not.toBeVisible();
    await expect(toggleButton).toHaveText('menu');
  });
});
