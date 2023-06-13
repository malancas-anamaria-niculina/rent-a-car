describe("Rent test", () => {
  it("Rent a car", async () => {
    await browser.url("http://localhost:3000/");
    await browser.execute(() =>
      localStorage.setItem(
        "userToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3QzQHRlc3QuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJjNmQ1NDA5NC03MDliLTQ3NjItODcxYy0zZTFlMWM4M2I0ZTAiLCJleHAiOjE2ODkxMDA3NTAsImlzcyI6ImFwaVdpdGhBdXRoQmFja2VuZCIsImF1ZCI6ImFwaVdpdGhBdXRoQmFja2VuZCJ9.h7EBDkFy5RS3iiRsbjIS0YlSeimgu7jTNVwPdvSWvcY"
      )
    );

    await browser.url("http://localhost:3000/dashboard");
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard");

    const greenMarker = await $("img[src*=greenMapMarker]");

    await greenMarker.click();

    await browser.pause(500);

    const rentButton = await $("button=Rent");

    await rentButton.click();

    await browser.pause(500);

    const startRentButton = await $("button=Start Rent");

    await startRentButton.click();

    await browser.pause(500);

    const yellowMarker = await $("img[src*=yellowMapMarker]");

    await expect(yellowMarker).toExist();
  });

  it("View current rent details", async () => {
    await browser.url("http://localhost:3000/");

    await browser.$("#email").setValue("test3@test.com");
    await browser.$("#password").setValue("TestUser123@");
    await browser.$("aria/Log in").click();

    await browser.execute(() =>
      localStorage.setItem(
        "userToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3QzQHRlc3QuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJjNmQ1NDA5NC03MDliLTQ3NjItODcxYy0zZTFlMWM4M2I0ZTAiLCJleHAiOjE2ODkxMDA3NTAsImlzcyI6ImFwaVdpdGhBdXRoQmFja2VuZCIsImF1ZCI6ImFwaVdpdGhBdXRoQmFja2VuZCJ9.h7EBDkFy5RS3iiRsbjIS0YlSeimgu7jTNVwPdvSWvcY"
      )
    );

    await expect(browser).toHaveUrl("http://localhost:3000/dashboard");

    await browser.pause(500);

    const yellowMarker = await $("img[src*=yellowMapMarker]");

    await yellowMarker.click();

    await expect(yellowMarker).toExist();

    const rentDetailsButton = await $("button*=Rent details");

    await rentDetailsButton.click();

    await browser.pause(500);

    const currentRentDetailsBox = await $("h5*=Current rent details");

    await expect(currentRentDetailsBox).toExist();

    await browser.pause(500);
  });

  it("Finish a rent", async () => {
    await browser.url("http://localhost:3000/");

    await browser.$("#email").setValue("test3@test.com");
    await browser.$("#password").setValue("TestUser123@");
    await browser.$("aria/Log in").click();

    await browser.execute(() =>
      localStorage.setItem(
        "userToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3QzQHRlc3QuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJjNmQ1NDA5NC03MDliLTQ3NjItODcxYy0zZTFlMWM4M2I0ZTAiLCJleHAiOjE2ODkxMDA3NTAsImlzcyI6ImFwaVdpdGhBdXRoQmFja2VuZCIsImF1ZCI6ImFwaVdpdGhBdXRoQmFja2VuZCJ9.h7EBDkFy5RS3iiRsbjIS0YlSeimgu7jTNVwPdvSWvcY"
      )
    );

    await expect(browser).toHaveUrl("http://localhost:3000/dashboard");

    await browser.pause(500);

    const yellowMarker = await $("img[src*=yellowMapMarker]");

    await yellowMarker.click();

    await expect(yellowMarker).toExist();

    const finishButton = await $("button*=Finish");

    await finishButton.click();

    await browser.pause(500);

    const tooltipRentFinished = await $("div*=Renting finished");

    await expect(tooltipRentFinished).toExist();

    await browser.pause(500);
  });
});
