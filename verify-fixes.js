const fs = require("fs")
const path = require("path")

// Files to check for ARIA issues
const filesToCheck = [
	"webview-ui/src/components/chat/CodeIndexPopover.tsx",
	"webview-ui/src/components/kilocode/common/OrganizationSelector.tsx",
	"webview-ui/src/components/kilocode/rules/RuleRow.tsx",
	"webview-ui/src/components/modes/ModesView.tsx",
	"webview-ui/src/components/ui/toggle-switch.tsx",
	"webview-ui/src/components/settings/__tests__/ContextManagementSettings.spec.tsx",
	"webview-ui/src/components/settings/__tests__/TemperatureControl.spec.tsx",
	"webview-ui/src/components/ui/__tests__/select-dropdown.spec.tsx",
]

const ariaPatterns = [
	/aria-expanded.*\?.*"true".*"false"/g,
	/aria-selected.*\?.*"true".*"false"/g,
	/aria-checked.*\?.*"true".*"false"/g,
	/aria-disabled.*\?.*"true".*"false"/g,
]

console.log("Checking for ARIA issues...\n")

let foundIssues = false

filesToCheck.forEach((filePath) => {
	const fullPath = path.join(__dirname, filePath)

	if (fs.existsSync(fullPath)) {
		const content = fs.readFileSync(fullPath, "utf8")

		ariaPatterns.forEach((pattern, index) => {
			const matches = content.match(pattern)
			if (matches) {
				console.log(`❌ ${filePath} found ${matches.length} ARIA issues:`)
				matches.forEach((match) => console.log(`   ${match}`))
				foundIssues = true
			}
		})

		if (
			!content.match(/aria-expanded.*\?.*"true".*"false"/) &&
			!content.match(/aria-selected.*\?.*"true".*"false"/) &&
			!content.match(/aria-checked.*\?.*"true".*"false"/) &&
			!content.match(/aria-disabled.*\?.*"true".*"false"/)
		) {
			console.log(`✅ ${filePath} - No ARIA issues found`)
		}
	} else {
		console.log(`⚠️  ${filePath} - File not found`)
	}
})

if (!foundIssues) {
	console.log("\n🎉 All ARIA issues have been fixed!")
} else {
	console.log("\n❌ Some ARIA issues still remain.")
}
