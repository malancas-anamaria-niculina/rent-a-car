describe("login", () => {
  it("tests login", async () => {
    await browser.setWindowSize(983, 937)
    await browser.url("http://localhost:3000/")
    await expect(browser).toHaveUrl("http://localhost:3000/")
    await browser.$("#email").click()
    await browser.$("#email").click()
    await browser.performActions([{
      type: 'key',
      id: 'keyboard',
      actions: [{ type: 'keyDown', value: '' }]
    }])
    await browser.performActions([{
      type: 'key',
      id: 'keyboard',
      actions: [{ type: 'keyUp', value: '' }]
    }])
    await browser.$("#email").doubleClick()
    await browser.$("#email").setValue("user@example.com")
    await browser.$("//*[@id=\"root\"]/div/div/div/form").click()
    await browser.$("#password").click()
    await browser.$("//*[@id=\"root\"]/div/div/div/form").click()
    await browser.$("#password").setValue("Password11@")
    await browser.$("aria/Log in").click()
  });
});
