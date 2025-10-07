import { expect, Page } from "@playwright/test";

/**
 * Rejects cookies if the banner is present. No-ops if not found.
 * Usage: await rejectCookies(page)
 */
export async function rejectCookies(page: Page): Promise<void> {
    const dialog = page.getByRole("dialog", { name: /uses cookies/i });
    const isVisible = await dialog.isVisible().catch(() => false);

    if (!isVisible) {
        // Not present -> treat as a non-blocking info
        return;
    }

    await expect(dialog).toBeVisible();
    await page.getByRole("button", { name: /reject all/i }).click();
    await expect(dialog).toBeHidden();
}
