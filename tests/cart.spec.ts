import { test, expect } from '@playwright/test';
import { users } from '../test-data/users';
test('BUG-001 - problem_user - botão Remove permanece após remover produto', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.locator('[data-test="username"]').fill(users.problem.username);
await page.locator('[data-test="password"]').fill(users.problem.password);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('[data-test="title"]')).toHaveText('Products');
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeHidden();
});
test('problem_user - botão Add não aparece após remover produto', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.locator('[data-test="username"]').fill(users.problem.username);
await page.locator('[data-test="password"]').fill(users.problem.password);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('[data-test="title"]')).toHaveText('Products');
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
});
test('problem_user - produto permanece no carrinho após remover', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.locator('[data-test="username"]').fill(users.problem.username);
await page.locator('[data-test="password"]').fill(users.problem.password);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('[data-test="title"]')).toHaveText('Products');
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
await page.locator('[data-test="shopping-cart-link"]').click();
await expect(page.locator('[data-test="inventory-item-name"]')).not.toHaveText('Sauce Labs Backpack');
});
test('problem_user - remover produto pelo carrinho', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.locator('[data-test="username"]').fill(users.problem.username);
await page.locator('[data-test="password"]').fill(users.problem.password);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('[data-test="title"]')).toHaveText('Products');
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await page.locator('[data-test="shopping-cart-link"]').click();
await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(0);
});
test('standard_user - produto é removido corretamente', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.locator('[data-test="username"]').fill(users.standard.username);
await page.locator('[data-test="password"]').fill(users.standard.password);
await page.locator('[data-test="login-button"]').click();
await expect(page.locator('[data-test="title"]')).toHaveText('Products');
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeHidden();
await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
await page.locator('[data-test="shopping-cart-link"]').click();
await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(0);
});