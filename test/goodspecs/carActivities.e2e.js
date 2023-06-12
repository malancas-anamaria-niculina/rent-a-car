describe("planned-activity", () => {
  it("tests planned-activity", async () => {
    await browser.setNetworkConditions({
      offline: false,
      latency: 562.5,
      download_throughput: 180000,
      upload_throughput: 84375,
    });
    await browser.url("http://localhost:3000/");
    await expect(browser).toHaveUrl("http://localhost:3000/");
    await browser.$("#email").click();
    await browser.$("#email").setValue("user@example.com");
    await browser.$("#password").click();
    await browser.$("#password").setValue("Password11@");
    await browser.$("aria/Log in").click();
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard");
    await browser.pause(5000);
    (await browser.$("img[src*=greenMapMarker]")).click();
    await browser.pause(500);
    await browser.$("aria/View car history").click();
    await expect(browser).toHaveUrl("http://localhost:3000/car-history");
    await expect(browser.$("div*=Car name")).toBeDisplayed();
    await expect(browser.$("div*=Type")).toBeDisplayed();
    await expect(browser.$("div*=Odometer")).toBeDisplayed();
    await expect(browser.$("div*=Availability")).toBeDisplayed();
    await browser
      .$(
        ".MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeSmall.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
      )
      .click();
    await expect(browser.$("div*=History")).toBeDisplayed();
  });
});
