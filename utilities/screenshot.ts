import fs from "fs";
import path from "path";
import { Page, TestInfo } from "@playwright/test";

/**
 * Saves a full-page screenshot and attaches it to the test run.
 * File name includes a timestamp (to the second) for uniqueness.
 */
export async function captureScreenshot(
    page: Page,
    testInfo: TestInfo,
    label: string
): Promise<string> {
    const dir = path.resolve(process.cwd(), "test-artifacts", "screenshots");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const stamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .replace("T", "_")
        .replace("Z", "");
    const fileName = `${testInfo.title}__${label}__${stamp}.png`;
    const filePath = path.join(dir, fileName);

    await page.screenshot({ path: filePath, fullPage: true });
    await testInfo.attach(`screenshot:${label}`, {
        path: filePath,
        contentType: "image/png",
    });

    return filePath;
}
