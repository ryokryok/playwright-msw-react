import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // access to http://127.0.0.1:3000/
  await page.goto("/");
});

test("Capture screenshots", async ({ page, browserName }) => {
  await page.waitForSelector("form");
  await page.screenshot({ path: `screenshot/${browserName}/screenshot.png` });
});

test("Page title should be `Contact`", async ({ page }) => {
  await page.waitForSelector("form");
  await expect(await page.title()).toBe("Contact");
});

test("success to form send", async ({ page }) => {
  await page.waitForSelector("form");
  const input = page.locator("input[type=email]");
  await input.fill("user@example.com");
  await page.getByRole("button").click();
  await expect(page.getByText("success to contact")).toBeVisible();
});

test("failed to form send", async ({ page }) => {
  await page.waitForSelector("form");
  const input = page.locator("input[type=email]");
  await input.fill("");
  await page.getByRole("button").click();
  await expect(page.getByText("error, please resend")).toBeVisible();
});
