import { type Page, type FrameLocator } from "@playwright/test"
import type { WebviewMessage } from "../../../src/shared/WebviewMessage"
import { ProviderSettings } from "@roo-code/types"
export declare function findWebview(workbox: Page): Promise<FrameLocator>
export declare function waitForWebviewText(page: Page, text: string, timeout?: number): Promise<void>
export declare function waitForModelSelector(page: Page, timeout?: number): Promise<void>
export declare function postWebviewMessage(page: Page, message: WebviewMessage): Promise<void>
export declare function upsertApiConfiguration(page: Page, apiConfiguration?: Partial<ProviderSettings>): Promise<void>
export declare function configureApiKeyThroughUI(page: Page): Promise<void>
export declare function clickSaveSettingsButton(webviewFrame: FrameLocator): Promise<void>
/**
 * Waits for all tooltips to be dismissed before proceeding.
 * This is necessary when tooltips appear after clicking elements and need to animate away
 * before taking screenshots to avoid inconsistent visual states.
 */
export declare function waitForTooltipsToDismiss(webviewFrame: FrameLocator): Promise<void>
/**
 * Freezes all GIFs on the page by converting them to static PNG images.
 * Also sets up a MutationObserver to handle dynamically added GIFs.
 * Works inside the VSCode extension webview iframe.
 */
export declare function freezeGifs(page: Page): Promise<void>
//# sourceMappingURL=webview-helpers.d.ts.map
