import { test, expect } from "@playwright/test";

test("Capture screenshots", async ({ page, browserName }) => {
  await page.goto("/");
  await page.screenshot({ path: `screenshot/${browserName}/screenshot.png` });
});

test("Page title", async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toBe("Index");
  await page.goto("/contact/");
  expect(await page.title()).toBe("Contact");
});
