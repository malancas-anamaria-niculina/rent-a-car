describe("Login test", () => {
  it("Correct Login", async () => {
    await browser.url("http://localhost:3000/");
    await expect(browser).toHaveUrl("http://localhost:3000/");

    await expect($("#email")).toBeDisplayed();
    await expect($("#password")).toBeDisplayed();

    await browser.$("#email").setValue("test3@test.com");
    await browser.$("#password").setValue("TestUser123@");
    await browser.$("aria/Log in").click();

    await expect(browser).toHaveUrl("http://localhost:3000/dashboard");
  });

  it("Incorrect Login", async () => {
    await browser.url("http://localhost:3000/");
    await expect(browser).toHaveUrl("http://localhost:3000/");

    await expect($("#email")).toBeDisplayed();
    await expect($("#password")).toBeDisplayed();

    await browser.$("#email").setValue("test3@test.com");
    await browser.$("#password").setValue("TestUser123@4");
    await browser.$("aria/Log in").click();

    await expect(browser).toHaveUrl("http://localhost:3000/");
    const errorLogin = await $("div=Password doesn't match");
    await expect(errorLogin).toHaveText("Password doesn't match");
  });

  it("Register redirect", async () => {
    await browser.url("http://localhost:3000/");
    await expect(browser).toHaveUrl("http://localhost:3000/");

    await expect($("#email")).toBeDisplayed();
    await expect($("#password")).toBeDisplayed();

    const registerLink = await $("div*=Register");
    await registerLink.click();
    await expect(browser).toHaveUrl("http://localhost:3000/register");

    await expect($("#password")).toBeDisplayed();
    await expect($("#confirmpassword")).toBeDisplayed();
  });
});
