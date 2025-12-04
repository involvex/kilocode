import { type Page } from "@playwright/test"
export { expect } from "@playwright/test"
export type TestOptions = {
	vscodeVersion: string
}
export type TestFixtures = TestOptions & {
	workbox: Page
	createProject: () => Promise<string>
	createTempDir: () => Promise<string>
	takeScreenshot: (name?: string) => Promise<void>
}
export declare const test: import("@playwright/test").TestType<
	import("@playwright/test").PlaywrightTestArgs &
		import("@playwright/test").PlaywrightTestOptions &
		TestOptions & {
			workbox: Page
			createProject: () => Promise<string>
			createTempDir: () => Promise<string>
			takeScreenshot: (name?: string) => Promise<void>
		},
	import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions
>
//# sourceMappingURL=playwright-base-test.d.ts.map
