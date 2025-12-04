/**
 * Utility for lazy-loading the VS Code module in environments where it's available.
 * This allows the SDK to be used in both VS Code extension and Node.js environments.
 * Compatible with both VSCode and Cursor extension hosts.
 */
/**
 * Attempts to dynamically import the `vscode` module.
 * Returns undefined if not running in a VSCode extension context.
 */
export declare function importVscode(): Promise<typeof import("vscode") | undefined>
//# sourceMappingURL=importVscode.d.ts.map
