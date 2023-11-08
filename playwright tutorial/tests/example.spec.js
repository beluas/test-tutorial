import { expect, test } from "@playwright/test";

test("first_one", async ({ page }) => {
  await page.goto("http://localhost:2221");

  const addToBasketButton = page.locator('[data-qa="product-button"]').first();
  await addToBasketButton.waitFor();
  await addToBasketButton.click();

  await expect(addToBasketButton).toHaveText("Remove from Basket");

  const checkoutLink = page.getByRole("link", { name: "checkout" });
  await checkoutLink.waitFor();
  await checkoutLink.click();

  //await expect(page.url().includes("basket"));

  await page.waitForURL(/\/signup/, { timeout: 3000 });

  // await page.pause();
});
