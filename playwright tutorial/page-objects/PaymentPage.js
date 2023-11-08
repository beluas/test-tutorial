import { expect } from "@playwright/test";
export default class PaymentPage {
  /**
   *
   * @param {import("@playwright/test").Page} page
   */

  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInput = this.page.locator('[data-qa="discount-code-input"]');
    this.submitDiscountBtn = this.page.locator(
      '[data-qa="submit-discount-button"]'
    );
    this.owner = this.page.locator('[data-qa="credit-card-owner"]');
    this.number = this.page.locator('[data-qa="credit-card-number"]');
    this.valid = this.page.locator('[data-qa="valid-until"]');
    this.cvc = this.page.locator('[data-qa="credit-card-cvc"]');
    this.payBtn = this.page.locator('[data-qa="pay-button"]');
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor();
    const discountCode = await this.discountCode.innerText();
    await this.discountInput.waitFor();
    await this.discountInput.fill(discountCode);

    await expect(this.discountInput).toHaveValue(discountCode);
  };

  fillInPaymentDetails = async () => {
    await this.owner.waitFor();
    await this.owner.fill("pepp rec");
    await this.number.fill("0000000000000000");
    await this.valid.fill("00/00");
    await this.cvc.fill("123");
  };

  submitDiscount = async () => {
    await this.submitDiscountBtn.waitFor();
    await this.submitDiscountBtn.click();
  };

  pay = async () => {
    await this.payBtn.waitFor();
    await this.payBtn.click();
    await this.page.waitForURL(/\/thank-you/);
  };
}
