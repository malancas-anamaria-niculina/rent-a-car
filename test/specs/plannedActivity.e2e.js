describe("planned-activity", () => {
  it("tests planned-activity", async () => {
    await browser.url("http://localhost:3000/");
    await expect(browser).toHaveUrl("http://localhost:3000/");
    await browser.$("#email").setValue("test3@test.com");
    await browser.$("#password").setValue("TestUser123@");
    await browser.$("aria/Log in").click();
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard");
    await browser.$("aria/Planned Activity").click();
    await expect(browser).toHaveUrl("http://localhost:3000/planned-activity");
    await expect(browser.$("#no-planned-activities")).toHaveText(
      "You don't have planned activities!"
    );
  });
});
