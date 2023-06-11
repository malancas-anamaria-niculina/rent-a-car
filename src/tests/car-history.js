describe("car-history", () => {
  it("tests car-history", async () => {
    await browser.setNetworkConditions({
      offline: false,
      latency: 0,
      download_throughput: 0,
      upload_throughput: 0
    })
    await browser.setWindowSize(1000, 937)
    await browser.url("http://localhost:3000/dashboard")
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard")
    await browser.$("//*[@id=\"root\"]/div/div/div/div/div/div[1]/div[4]/img[2]").click()
    await browser.$("aria/VIEW CAR HISTORY").click()
    await browser.$("aria/[role=\"button\"]").click()
    await browser.$("//*[@data-testid=\"KeyboardArrowUpIcon\"]").click()
  });
});
