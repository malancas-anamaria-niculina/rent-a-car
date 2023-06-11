describe("planned-activity", () => {
  it("tests planned-activity", async () => {
    await browser.setNetworkConditions({
      offline: false,
      latency: 562.5,
      download_throughput: 180000,
      upload_throughput: 84375
    })
    await browser.setWindowSize(1000, 937)
    await browser.url("http://localhost:3000/dashboard")
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard")
    await browser.$("aria/PLANNED ACTIVITY").click()
  });
});
