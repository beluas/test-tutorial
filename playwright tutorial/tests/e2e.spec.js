import { expect, test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import ProductPage from "../page-objects/productPage";
import Navigation from "../page-objects/Navigation";
import Checkout from "../page-objects/Checkout";
import LoginPage from "../page-objects/LoginPage";
import RegisterPage from "../page-objects/RegisterPage";
import DeliveryDetails from "../page-objects/DeliveryDetails";
import PaymentPage from "../page-objects/PaymentPage";

test("e2e journey", async ({ page }) => {
  /**
   *
   * @param {import("@playwright/test").Page} page
   */
  const registration_locators = {
    fName: page.locator('[data-qa="delivery-first-name"]'),
    lName: page.locator('[data-qa="delivery-last-name"]'),
    street: page.locator('[data-qa="delivery-address-street"]'),
    zip: page.locator('[data-qa="delivery-postcode"]'),
    city: page.locator('[data-qa="delivery-city"]'),
    country: page.locator('[data-qa="country-dropdown"]'),
  };
  const registration_text = {
    fName: "wewe",
    lName: "yepp",
    street: "street1",
    zip: "5701",
    city: "Eindhoven",
    country: "Netherlands",
  };

  const productPage = new ProductPage(page);
  const email = `${uuidv4()}@playtest.com`;
  const password = "pass";

  await productPage.visit();
  await productPage.sortByCheapest();
  await productPage.addProductToBasket(0);
  await productPage.addProductToBasket(1);
  await productPage.addProductToBasket(2);

  const navigation = new Navigation(page);
  navigation.goToCheckout();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();

  const loginPage = new LoginPage(page);
  await loginPage.continueToRegister();

  const registerPage = new RegisterPage(page);
  await registerPage.signupAsNewUser(email, password);

  const deliveryDetails = new DeliveryDetails(page);
  await deliveryDetails.fillDetails(registration_locators, registration_text);
  await deliveryDetails.saveAddress();
  await deliveryDetails.goToPayment();

  const paymentPage = new PaymentPage(page);
  await paymentPage.activateDiscount();
  await paymentPage.submitDiscount();
  await page.waitForTimeout(1000);
  await paymentPage.fillInPaymentDetails();
  await paymentPage.pay();
  await page.pause();
});
