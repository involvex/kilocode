/**
 * Integration test helper utilities for Kilo Code CLI
 * Inspired by google-gemini/gemini-cli test infrastructure
 */
import * as pty from "@lydell/node-pty"
/**
 * Poll a predicate function until it returns true or times out
 */
export declare function poll(predicate: () => boolean, timeout: number, interval: number): Promise<boolean>
/**
 * Interactive run helper for PTY-based testing
 */
export declare class InteractiveRun {
	ptyProcess: pty.IPty
	output: string
	constructor(ptyProcess: pty.IPty)
	/**
	 * Wait for specific text to appear in output
	 */
	expectText(text: string, timeout?: number): Promise<void>
	/**
	 * Wait for a regex pattern to match in output
	 */
	expectPattern(pattern: RegExp, timeout?: number): Promise<void>
	/**
	 * Type text slowly (character by character) with echo verification
	 */
	type(text: string): Promise<void>
	/**
	 * Simulate typing one character at a time to avoid paste detection
	 */
	sendKeys(text: string): Promise<void>
	/**
	 * Press Enter key
	 */
	pressEnter(): Promise<void>
	/**
	 * Press Escape key
	 */
	pressEscape(): Promise<void>
	/**
	 * Send Ctrl+C
	 */
	sendCtrlC(): Promise<void>
	/**
	 * Kill the process
	 */
	kill(): Promise<void>
	/**
	 * Wait for process to exit and return exit code
	 */
	expectExit(): Promise<number>
	/**
	 * Get stripped output (without ANSI codes)
	 */
	getStrippedOutput(): string
}
/**
 * Main test rig for setting up and running CLI integration tests
 */
export declare class TestRig {
	bundlePath: string
	testName: string
	testDir: string
	sourceDir: string
	constructor(testName: string)
	setupTestDir(): void
	/**
	 * Create a file in the test workspace
	 */
	createFile(fileName: string, content: string): string
	/**
	 * Create a directory in the test workspace
	 */
	mkdir(dir: string): void
	/**
	 * Read a file from the test workspace
	 */
	readFile(fileName: string): string
	/**
	 * Sync filesystem (useful before spawning)
	 */
	sync(): void
	/**
	 * Get command and args for running the CLI
	 */
	private _getCommandAndArgs
	/**
	 * Run CLI in interactive mode with PTY
	 */
	runInteractive(
		extraArgs?: string[],
		options?: {
			env?: Record<string, string>
			cols?: number
			rows?: number
		},
	): Promise<InteractiveRun>
	/**
	 * Clean up test directory
	 */
	cleanup(): Promise<void>
	/**
	 * Check if the CLI bundle exists
	 */
	bundleExists(): boolean
}
//# sourceMappingURL=test-helper.d.ts.map
