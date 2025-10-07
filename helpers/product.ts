import { expect, Page, Locator } from "@playwright/test";

/**
 * Open "Buy now" for a given product tile, preferring your original LINK role/name
 * and only falling back to button/label if needed.
 */
export async function openBuyNowForProduct(
    page: Page,
    productName: string,
    opts?: { timeout?: number; debugShotPath?: string }
): Promise<void> {
    const timeout = opts?.timeout ?? 20000;
    const debugShotPath =
        opts?.debugShotPath ??
        "test-artifacts/screenshots/DEBUG_no_buy_now.png";

    // Find the product container by name (Lightning component wrapper)
    const container = page
        .locator("webruntime-component-container", {
            hasText: new RegExp(productName, "i"),
        })
        .first();

    await expect(container).toBeVisible({ timeout });

    // 1) Your original preference: LINK with the exact accessible name variants
    const exactLinkNames = [
        "Buy now (Opens a new window", // seen in your test
        "Buy now (Opens a new window)", // sometimes includes trailing )
        "Buy now (Opens in a new window)", // wording sometimes varies
    ];

    for (const name of exactLinkNames) {
        const link = container.getByRole("link", { name, exact: true });
        if (await link.count()) {
            const t = link.first();
            await t.scrollIntoViewIfNeeded();
            if (await t.isVisible().catch(() => false)) {
                await t.click({ timeout: Math.min(timeout, 15000) });
                return;
            }
        }
    }

    // 2) Next-best link: any link named "Buy now"
    {
        const link = container.getByRole("link", { name: /buy now/i }).first();
        if (await link.count()) {
            await link.scrollIntoViewIfNeeded();
            if (await link.isVisible().catch(() => false)) {
                await link.click({ timeout: Math.min(timeout, 15000) });
                return;
            }
        }
    }

    // 3) Fallbacks: button or aria-label
    const fallbacks: Locator[] = [
        container.getByRole("button", { name: /buy now/i }),
        container.getByLabel(/buy now/i),
    ];

    for (const fb of fallbacks) {
        if ((await fb.count()) > 0) {
            const t = fb.first();
            await t.scrollIntoViewIfNeeded();
            if (await t.isVisible().catch(() => false)) {
                await t.click({ timeout: Math.min(timeout, 15000) });
                return;
            }
        }
    }

    // If we got here, we didn’t find it—take a debug shot and throw
    try {
        await page.screenshot({ path: debugShotPath, fullPage: true });
    } catch {}
    throw new Error(
        `Could not find a visible "Buy now" control (link preferred) for product: ${productName}`
    );
}
