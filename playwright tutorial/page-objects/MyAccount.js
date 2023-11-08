export default class MyAccount {
  /**
   *
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
  }

  visit = async () => {
    await this.page.goto("http://localhost:2221/my-account");
  };
}
