describe("Login test", () => {
  before(async () => {
    await browser.url("http://localhost:3000/");
    await browser.execute(() =>
      localStorage.setItem(
        "userToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3QzQHRlc3QuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJjNmQ1NDA5NC03MDliLTQ3NjItODcxYy0zZTFlMWM4M2I0ZTAiLCJleHAiOjE2ODkxMDA3NTAsImlzcyI6ImFwaVdpdGhBdXRoQmFja2VuZCIsImF1ZCI6ImFwaVdpdGhBdXRoQmFja2VuZCJ9.h7EBDkFy5RS3iiRsbjIS0YlSeimgu7jTNVwPdvSWvcY"
      )
    );
  });
  it("Rent a car", async () => {
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
});
