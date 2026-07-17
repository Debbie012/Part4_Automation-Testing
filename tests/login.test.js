
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe('Portal Authentication Workflows', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Allow user access upon entering valid credentials', async ({ page }) => {
    await loginPage.login('student', 'Password123');
    await expect(page).toHaveURL(/logged-in-successfully/);
    
    const successHeader = page.locator('h1.post-title');
    await expect(successHeader).toHaveText('Logged In Successfully');
  });

  test('Reject authentication attempts with invalid username', async () => {
    await loginPage.login('incorrectUser', 'Password123');
    
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Your username is invalid!');
  });
});