import { test, expect } from '@playwright/test';

test.describe('Registre component', () => {

  test('mostra el formulari de registre correctament', async ({ page }) => {
    await page.goto('http://localhost:5173/registre');
    await expect(page.locator('h2')).toHaveText("Registra't");

    await expect(page.locator('input[placeholder="Introdueix el teu correu"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Introdueix el teu nom"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Crea una contrasenya"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Repeteix la contrasenya"]')).toBeVisible();
    await expect(page.locator('.submit-button')).toHaveText('Registra\'t');
  });
  
  test('shows email tooltip message when is clicked', async ({ page }) => {
    await page.goto('http://localhost:5173/registre');
    await page.locator('button.tooltip-btn').first().click();
    await expect(page.locator('.tooltip')).toBeVisible();
    await expect(page.locator('.tooltip')).toContainText('Escriviu el vostre correu electrònic vàlid (exemple@example.com)');
  });

  test('shows name tooltip message when is clicked', async ({ page }) => {
    await page.goto('http://localhost:5173/registre');
    await page.locator('button.tooltip-btn').nth(1).click();
    await expect(page.locator('.tooltip')).toBeVisible();
    await expect(page.locator('.tooltip')).toContainText('Escriviu el vostre nom complet');
  });

  test('shows password tooltip message when is clicked', async ({ page }) => {
    await page.goto('http://localhost:5173/registre');
    await page.locator('button.tooltip-btn').nth(2).click();
    await expect(page.locator('.tooltip')).toBeVisible();
    await expect(page.locator('.tooltip')).toContainText('La contrasenya ha de tenir almenys 8 caràcters, incloent números, minúsucules i majúsucules.');
  });

  test('shows repeat password tooltip message when is clicked', async ({ page }) => {
    await page.goto('http://localhost:5173/registre');
    await page.locator('button.tooltip-btn').nth(3).click();
    await expect(page.locator('.tooltip')).toBeVisible();
    await expect(page.locator('.tooltip')).toContainText('Confirmeu la mateixa contrasenya introduïda anteriorment.');
  });
  test('show succes toast on created account', async ({page}) => {
    await page.goto('http://localhost:5173/registre');
    await page.fill('input[placeholder="Introdueix el teu correu"]', 'test@test.com');
    await page.fill('input[placeholder="Introdueix el teu nom"]', 'Test User');
    await page.fill('input[placeholder="Crea una contrasenya"]', 'Test1234');
    await page.fill('input[placeholder="Repeteix la contrasenya"]', 'Test1234');
    await page.click('.submit-button');  
    await page.waitForTimeout(5000);
  });




});
