import { expect } from "@playwright/test";
import { time } from "console";
import { timeout } from "../playwright.config";

export default class DeliveryDetails {
  /**
   *
   * @param {import("@playwright/test").Page} page
   */

  constructor(page) {
    this.page = page;
    this.saveAddressBtn = this.page.locator('[data-qa="save-address-button"]');
    this.saveAddressBox = this.page.locator(
      '[data-qa="saved-address-container"]'
    );
    this.continueToPaymentBtn = this.page.locator(
      '[data-qa="continue-to-payment-button"]'
    );
  }

  fillDetails = async (inputSelectors, inputText) => {
    await inputSelectors.country.waitFor();
    for (let field in inputSelectors) {
      if (field === "country") {
        await inputSelectors[field].waitFor();
        await inputSelectors[field].selectOption(inputText[field]);
      } else {
        await inputSelectors[field].waitFor();
        await inputSelectors[field].fill(inputText[field]);
      }
    }
  };

  saveAddress = async () => {
    let totalBoxesBefore = await this.saveAddressBox.count();

    await this.saveAddressBtn.waitFor();

    await this.saveAddressBtn.click();
    await this.saveAddressBox.waitFor();
    let totalBoxesAfter = await this.saveAddressBox.count();
    await console.log({ totalBoxesAfter }, { totalBoxesBefore });
    await expect(totalBoxesAfter).toBeGreaterThan(totalBoxesBefore);
  };

  goToPayment = async () => {
    await this.continueToPaymentBtn.waitFor();
    await this.continueToPaymentBtn.click();
    await this.page.waitForURL(/\/payment/, { timeout: 3000 });
  };
}
