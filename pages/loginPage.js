const config = require('../config/config');
const { page } = require('@playwright/test');

// page/loginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = config.baseURL;
    
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#submit');
    this.errorMessage = page.locator('#error');
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessageText() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return await this.errorMessage.textContent();
  }
}

// Make sure this line is at the very bottom!
module.exports = { LoginPage };