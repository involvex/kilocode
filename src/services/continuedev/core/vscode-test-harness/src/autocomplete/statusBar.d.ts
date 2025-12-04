export declare enum StatusBarStatus {
	Disabled = 0,
	Enabled = 1,
	Paused = 2,
}
export declare function stopStatusBarLoading(): void
/**
 * TODO: We should clean up how status bar is handled.
 * Ideally, there should be a single 'status' value without
 * 'loading' and 'error' booleans.
 */
export declare function setupStatusBar(status: StatusBarStatus | undefined, loading?: boolean, error?: boolean): void
export declare function getStatusBarStatus(): StatusBarStatus | undefined
//# sourceMappingURL=statusBar.d.ts.map
