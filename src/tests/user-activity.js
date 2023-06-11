describe("user-activity", () => {
  it("tests user-activity", async () => {
    await browser.setWindowSize(1000, 937)
    await browser.url("http://localhost:3000/dashboard")
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard")
    await browser.$("aria/USER ACTIVITY").click()
    await browser.$("aria/[role=\"button\"]").click()
    await browser.$("//*[@data-testid=\"KeyboardArrowUpIcon\"]").click()
  });
});
