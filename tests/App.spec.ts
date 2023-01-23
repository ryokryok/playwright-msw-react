import { test, expect } from "@playwright/test";

test("Capture screenshots", async ({ page, browserName }) => {
  await page.goto("/");
  await page.screenshot({ path: `screenshot/${browserName}/screenshot.png` });
});

test("Page title", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe("Vite + React + TS");
});

test("Count up", async ({ page }) => {
  await page.goto("/");
  const counter = page.getByRole("button");
  await expect(counter).toHaveText(/0/);
  await counter.click();
  await expect(counter).toHaveText(/1/);
});
