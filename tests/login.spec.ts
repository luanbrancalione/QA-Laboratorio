import { test, expect } from '@playwright/test';
import { users } from '../test-data/users';
test('login com usuário válido', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.locator('[data-test="username"]').fill(users.standard.username);
await page.locator('[data-test="password"]').fill(users.standard.password);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});
test('login com usuário bloqueado', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.locator('[data-test="username"]').fill('locked_out_user');
await page.locator('[data-test="password"]').fill('secret_sauce');
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});