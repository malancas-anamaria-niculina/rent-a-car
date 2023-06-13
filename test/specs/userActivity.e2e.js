describe("user-activity", () => {
  it("tests user-activity", async () => {
    await browser.url("http://localhost:3000/");
    await expect(browser).toHaveUrl("http://localhost:3000/");
    await browser.$("#email").setValue("test3@test.com");
    await browser.$("#password").setValue("TestUser123@");
    await browser.$("aria/Log in").click();
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard");
    await browser.$("aria/User Activity").click();
    await expect(browser).toHaveUrl("http://localhost:3000/user-activity");
    await expect(browser.$("#no-activities")).toHaveText(
      "You don't have past activities!"
    );
  });
});
