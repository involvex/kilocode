import { type Page } from "@playwright/test"
export declare function verifyExtensionInstalled(page: Page): Promise<void>
export declare function closeAllTabs(page: Page): Promise<void>
export declare function waitForAllExtensionActivation(page: Page): Promise<void>
export declare function switchToTheme(page: Page, themeName: string): Promise<void>
export declare function executeVSCodeCommand(page: Page, commandName: string): Promise<void>
//# sourceMappingURL=vscode-helpers.d.ts.map
