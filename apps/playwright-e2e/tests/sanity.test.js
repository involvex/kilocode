// kilocode_change - new file
import { setupTestEnvironment } from "../helpers"
import { test, expect } from "./playwright-base-test"
test.describe("Sanity Tests", () => {
	test("should launch VS Code with extension installed", async ({ workbox: page }) => {
		await expect(page.locator(".monaco-workbench")).toBeVisible()
		console.log("✅ VS Code launched successfully")
		await expect(page.locator(".activitybar")).toBeVisible()
		console.log("✅ Activity bar visible")
		await setupTestEnvironment(page)
	})
})
