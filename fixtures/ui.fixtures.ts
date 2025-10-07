import { test as base, expect } from "@playwright/test";
import { Navigate } from "../pages/navigate";
import waitForPageToLoad from "../helpers/waitForPage";

/**
 * Provides:
 *  - navigator: page object for top-level navigation
 *  - per-test tracing (start/stop)
 *  - baseURL navigation + load wait
 */
type Fixtures = {
    navigator: Navigate;
};

export const test = base.extend<Fixtures>({
    navigator: async ({ page }, use) => {
        const nav = new Navigate(page);
        await use(nav);
    },
});

test.beforeEach(async ({ page }, testInfo) => {
    await page.context().tracing.start({
        title: testInfo.title,
        screenshots: true,
        snapshots: true,
        sources: true,
    });

    // Go to baseURL (set in playwright.config) and wait until UI is ready
    await page.goto("/");
    await waitForPageToLoad(page);
});

test.afterEach(async ({ page }, testInfo) => {
    // Store traces per-test, readable by title
    await page.context().tracing.stop({
        path: `playwright-traces/${testInfo.title}.zip`,
    });
});

export { expect };
