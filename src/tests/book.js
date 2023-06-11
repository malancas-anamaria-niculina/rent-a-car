describe("book", () => {
  it("tests book", async () => {
    await browser.setNetworkConditions({
      offline: false,
      latency: 562.5,
      download_throughput: 180000,
      upload_throughput: 84375
    })
    await browser.setWindowSize(1000, 937)
    await browser.url("http://localhost:3000/dashboard")
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard")
    await browser.$("//*[@id=\"root\"]/div/div/div/div/div/div[1]/div[4]/img[2]").click()
    await browser.$("aria/BOOK").click()
    await browser.$("aria/13").click()
    await browser.$("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div/div[1]").click()
    await browser.$("aria/OK").click()
    await browser.$("aria/14").click()
    await browser.$("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div/div[1]").click()
    await browser.$("aria/OK").click()
    await browser.$("//*[@id=\"root\"]/div/div/div/div/div[3]/div[1]/div[4]/img[2]").click()
  });
});
