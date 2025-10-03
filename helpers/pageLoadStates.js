// helpers/pageLoadStates.js
export async function WaitForLoadStateToComplete(page) {
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');
}