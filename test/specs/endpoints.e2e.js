describe("endpoints", () => {
  it("tests endpoints", async () => {
    await browser.url("http://localhost:3000/");
    await expect(browser).toHaveUrl("http://localhost:3000/");
    await browser.$("#email").click();
    await browser.$("#email").setValue("test3@test.com");
    await browser.$("#password").click();
    await browser.$("#password").setValue("TestUser123@");
    await browser.$("aria/Log in").click();
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard");
    await browser.$("aria/Planned Activity").click();
    await expect(browser).toHaveUrl("http://localhost:3000/planned-activity");
    await browser.$("aria/User Activity").click();
    await expect(browser).toHaveUrl("http://localhost:3000/user-activity");
    await browser.$("aria/Map").click();
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard");
  });
});
