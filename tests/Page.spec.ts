import { test, expect } from "@playwright/test";

test("Capture screenshots", async ({ page, browserName }) => {
  await page.goto("/");
  await page.waitForSelector("form");
  await page.screenshot({ path: `screenshot/${browserName}/screenshot.png` });
});

test("success to form send", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("form");
  const input = page.locator("input[type=email]");
  await input.fill("user@example.com");
  await page.getByRole("button").click();
  await expect(page.getByText("success to contact")).toBeVisible();
});

test("failed to form send", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("form");
  const input = page.locator("input[type=email]");
  await input.fill("");
  await page.getByRole("button").click();
  await expect(page.getByText("error, please resend")).toBeVisible();
});
