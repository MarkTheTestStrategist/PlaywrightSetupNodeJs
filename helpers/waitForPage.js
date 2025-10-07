async function waitForPageToLoad(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  try {
    await page.waitForLoadState("networkidle", { timeout: 4000 });
  } catch {}
  try {
    await page.locator("body").waitFor({ state: "visible", timeout: 2000 });
  } catch {}
  await page.evaluate(
    () =>
      new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(() => r()))
      )
  );
}
module.exports = waitForPageToLoad; // ← export the FUNCTION, not an object
