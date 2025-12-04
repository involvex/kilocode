import { type Page } from "@playwright/test"
/**
 * Waits for DOM stability by injecting a MutationObserver into the page.
 * Monitors all DOM changes and waits for 250ms of inactivity before resolving.
 * Includes a 10-second timeout to prevent infinite waiting.
 *
 * @param page - The Playwright page instance
 * @returns Promise that resolves when DOM is stable or timeout occurs
 */
export declare function waitForDOMStability(page: Page): Promise<void>
//# sourceMappingURL=dom-stability-helpers.d.ts.map
