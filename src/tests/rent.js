describe("rent", () => {
  it("tests rent", async () => {
    await browser.setWindowSize(1000, 937)
    await browser.url("http://localhost:3000/dashboard")
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard")
    await browser.$("//*[@id=\"root\"]/div/div/div/div/div/div[1]/div[4]/img[2]").click()
    await browser.$("aria/RENT").click()
    await browser.$("aria/START RENT").click()
  });
});
