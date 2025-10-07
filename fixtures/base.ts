import { test as base, expect } from "@playwright/test";
import { Navigate } from "../pages/navigate";
import waitForPageToLoad from "../helpers/waitForPage";
// Expose Navigate as a fixture (available in each test)
type Fixtures = {
    navigator: Navigate;
};

export const test = base.extend<Fixtures>({
    navigator: async ({ page }, use) => {
        const nav = new Navigate(page);
        await use(nav);
    },
});

// Centralised beforeEach: runs for every test that imports `test` from this file
test.beforeEach(async ({ page }, testInfo) => {
    // Start tracing (optional: you can move this to config if you prefer)
    await page.context().tracing.start({
        title: testInfo.title,
        screenshots: true,
        snapshots: true,
        sources: true,
    });

    // Go to your baseURL (set in playwright.config) or hardcode if you prefer
    await page.goto("/");
    await waitForPageToLoad();
});

// Optional: centralised afterEach for trace saving (you can also rely on config’s trace settings)
test.afterEach(async ({ page }) => {
    await page
        .context()
        .tracing.stop({ path: `playwright-traces/${Date.now()}.zip` });
});

export { expect };
