import test from "@playwright/test";
import MyAccount from "../page-objects/myAccount";
import { getLoginToken } from "../api/getLoginToken";
import { adminDetails } from "../userDetails";

test.only("account", async ({ page }) => {
  // Make a request to get token login
  console.log({ adminDetails });
  const loginToken = await getLoginToken(
    adminDetails.username,
    adminDetails.password
  );

  await page.route();

  console.log({ loginToken });
  const myAccount = new MyAccount(page);
  await myAccount.visit();
  await page.evaluate(
    ([loginToken]) => {
      document.cookie = "token=" + loginToken.token;
    },
    [loginToken]
  );
  await page.pause();
});
