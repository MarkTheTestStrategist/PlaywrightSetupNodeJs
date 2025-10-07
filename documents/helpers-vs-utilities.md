# Helpers vs Utilities — the rule of thumb

## Helpers = “UI actions.”

Functions that drive the browser and need a page (or locator/fixture). They encapsulate test steps you’d otherwise repeat.

## Utilities = “Pure logic.”

Functions that don’t need Playwright.
They do formatting, filenames, parsing, random data, date/time, environment lookup, file I/O, etc.
