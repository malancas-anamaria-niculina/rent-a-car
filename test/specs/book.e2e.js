describe("Book test", () => {
  it("Book a car", async () => {
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

    const bookButton = await $("button=Book");

    await bookButton.click();

    await browser.pause(500);

    const daySelectButton = await $("aria/21");

    await daySelectButton.click();

    await browser.pause(500);

    const okButton = await $("button=OK");

    await okButton.click();

    const endSelectButton = await $("aria/22");

    await endSelectButton.click();

    await browser.pause(500);

    const okEndButton = await $("button=OK");

    await okEndButton.click();

    await browser.pause(500);

    const tooltipRentFinished = await $("div*=Renting planned successfully");

    await expect(tooltipRentFinished).toExist();
  });

  it("Verify future booking", async () => {
    await browser.url("http://localhost:3000/");
    await browser.execute(() =>
      localStorage.setItem(
        "userToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3QzQHRlc3QuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJjNmQ1NDA5NC03MDliLTQ3NjItODcxYy0zZTFlMWM4M2I0ZTAiLCJleHAiOjE2ODkxMDA3NTAsImlzcyI6ImFwaVdpdGhBdXRoQmFja2VuZCIsImF1ZCI6ImFwaVdpdGhBdXRoQmFja2VuZCJ9.h7EBDkFy5RS3iiRsbjIS0YlSeimgu7jTNVwPdvSWvcY"
      )
    );

    await browser.url("http://localhost:3000/dashboard");
    await expect(browser).toHaveUrl("http://localhost:3000/dashboard");

    await browser.pause(500);

    const plannedActivity = await $("a*=Planned Activity");

    await plannedActivity.click();

    await browser.pause(500);

    const startDate = await $("th*=-21");
    const endDate = await $("td*=-22");

    await expect(startDate).toExist();

    await expect(endDate).toExist();

  });

  it("Cancel booking", async () => {
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

    const cancelButton = await $("button*=Cancel");

    await cancelButton.click();

    await browser.pause(500);

    const tooltipRentFinished = await $("div*=Planned rent cancelled");

    await expect(tooltipRentFinished).toExist();

    await browser.pause(1000);

  });
});
