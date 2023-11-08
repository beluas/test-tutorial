import { expect } from "@playwright/test";
export default class Checkout {
  /**
   *
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.itemPrices = page.locator('[data-qa="basket-item-price"]');
    this.removeFromBasket = page.locator('[data-qa="basket-card-remove-item"]');
    this.continueToCheckoutButton = page.locator(
      '[data-qa="continue-to-checkout"]'
    );
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    const itemsBeforeRemove = await this.basketCards.count();

    await this.itemPrices.first().waitFor();
    let allPriceTexts = await this.itemPrices.allInnerTexts();

    allPriceTexts = allPriceTexts.map((price) => {
      price = price.replace("$", "");
      return parseInt(price);
    });

    let minPrice = Math.min(...allPriceTexts);
    const removeFromBasketBtn = await this.removeFromBasket.nth(
      allPriceTexts.indexOf(minPrice)
    );

    await removeFromBasketBtn.waitFor();
    await removeFromBasketBtn.click();

    await expect(this.basketCards).toHaveCount(itemsBeforeRemove - 1);
  };

  continueToCheckout = async () => {
    await this.continueToCheckoutButton.waitFor();
    await this.continueToCheckoutButton.click();
    await this.page.waitForURL(/\/login/, { timeout: 3000 });
  };
}
