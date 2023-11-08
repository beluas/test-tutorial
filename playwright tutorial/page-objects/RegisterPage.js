export default class RegisterPage {
  /**
   *
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder("E-Mail");
    this.passwordField = page.getByPlaceholder("Password");
    this.registerBtn = page.getByRole("button", { name: "Register" });
  }

  signupAsNewUser = async (email, password) => {
    // type email
    await this.emailField.waitFor();
    await this.emailField.fill(email);
    // type password
    await this.passwordField.waitFor();
    await this.passwordField.fill(password);

    // click register
    await this.registerBtn.waitFor();
    await this.registerBtn.click();
  };
}
