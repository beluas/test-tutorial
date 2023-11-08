export default class LoginPage {
  /**
   *
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    this.registrationBtn = page.locator('[data-qa="go-to-signup-button"]');
  }

  continueToRegister = async () => {
    await this.registrationBtn.waitFor();
    await this.registrationBtn.click();
    await this.page.waitForURL(/\/signup/, { timeout: 3000 });
  };
}
