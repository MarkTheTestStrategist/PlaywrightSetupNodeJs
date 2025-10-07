import { Page, expect } from "@playwright/test";

// Wait for the page to be ready enough to interact with.
export async function WaitForPageToLoad(page: Page): Promise<void> {
    await page.waitForLoadState("domcontentloaded");
    //await page.waitForLoadState("networkidle"); // It keeps fialing on this point as the page won't fully load. When it does, uncomment this.
    await expect(page.getByRole("link", { name: /home/i })).toBeVisible({
        timeout: 10000,
    });
}
