const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  use: {
    browserName: "chromium",
    channel: "chrome", // run real Chrome
    headless: false, // show browser window
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,

    // Record network traffic (HAR)
    recordHar: {
      path: "test-results/network.har",
      content: "embed", // include req/resp bodies
    },

    // Nice extras (optional)
    trace: "on", // steps + screenshots + network
    video: "on",
  },
  reporter: [["html", { open: "never" }]],
});
