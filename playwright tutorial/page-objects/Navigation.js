import { expect } from "@playwright/test";

export default class Navigation {
  /**
   *
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    this.checkoutCounter = this.page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = this.page
      .locator('.desktop-nav-link [href="/basket"]')
      .first();
  }

  getBasketCount = async () => {
    await this.checkoutCounter.waitFor();
    const text = await this.checkoutCounter.innerText();
    return await parseInt(text);
  };

  goToCheckout = async () => {
    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();

    const pageUrl = await this.page.url();
    expect(pageUrl).toContain("basket");
  };
}
