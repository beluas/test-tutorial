import { expect } from "@playwright/test";
import Navigation from "./Navigation.js";

export default class ProductPage {
  /**
   *
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    this.addButton = this.page.locator('[data-qa="product-button"]');
    this.sortSelect = this.page.locator('[data-qa="sort-dropdown"]');
    this.allProductTitles = this.page.locator('[data-qa="product-title"]');
  }

  visit = async () => {
    await this.page.goto("http://localhost:2221/");
  };

  addProductToBasket = async (i) => {
    const currentAddButton = this.addButton.nth(i);
    await currentAddButton.waitFor();
    await expect(currentAddButton).toHaveText("Add to Basket");

    const navigation = new Navigation(this.page);
    const basketCountBeforeAdding = await navigation.getBasketCount();
    // await expect(basketCountBeforeAdding).toBe(i);

    await currentAddButton.click();
    const basketCountAfterAdding = await navigation.getBasketCount();

    await expect(currentAddButton).toHaveText("Remove from Basket");

    await expect(basketCountAfterAdding).toBeGreaterThan(
      basketCountBeforeAdding
    );
  };

  sortByCheapest = async () => {
    await this.sortSelect.waitFor();
    // get order of products
    this.allProductTitles.first().waitFor();
    const orders = await this.allProductTitles.allInnerTexts();

    await this.sortSelect.selectOption("price-asc");
    // get order of products
    this.allProductTitles.first().waitFor();
    const ordersAfter = await this.allProductTitles.allInnerTexts();

    // expect different lists
    expect(orders).not.toEqual(ordersAfter);
  };
}
