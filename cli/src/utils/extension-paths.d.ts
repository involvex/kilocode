export interface ExtensionPaths {
	extensionBundlePath: string
	extensionRootPath: string
}
/**
 * Resolves extension paths for production CLI.
 * Assumes the extension is bundled in dist/kilocode/
 *
 * Production structure:
 * cli/dist/
 * ├── index.js
 * ├── cli/KiloCodeCLI.js
 * ├── host/ExtensionHost.js
 * ├── utils/extension-paths.js (this file)
 * └── kilocode/
 *     ├── dist/extension.js
 *     ├── assets/
 *     └── webview-ui/
 */
export declare function resolveExtensionPaths(): ExtensionPaths
//# sourceMappingURL=extension-paths.d.ts.map
