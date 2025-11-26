#!/usr/bin/env node

/**
 * Peer Dependency Conflict Checker
 *
 * This script analyzes the current package.json for potential peer dependency
 * conflicts based on known problematic combinations.
 */

import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Known conflict patterns based on current ecosystem issues
const CONFLICT_PATTERNS = [
	{
		package: "ink",
		conflicts: [
			{
				with: "react-devtools-core",
				expected: ">=4.0.0 <5.0.0",
				found: "6.1.5",
				resolution: "Consider downgrading react-devtools-core to ^4.28.5 or upgrading ink to v5+",
			},
			{
				with: "ink-link",
				expected: ">=6.0.0",
				found: "4.x.x",
				resolution: "Upgrade ink to v6+ or downgrade ink-link to v3.x",
			},
			{
				with: "ink-select-input",
				expected: ">=5.0.0",
				found: "4.x.x",
				resolution: "Upgrade ink to v5+ or use compatible component versions",
			},
			{
				with: "ink-text-input",
				expected: ">=5.0.0",
				found: "4.x.x",
				resolution: "Upgrade ink to v5+ or use compatible component versions",
			},
		],
	},
	{
		package: "marked",
		conflicts: [
			{
				with: "marked-terminal",
				expected: "<16.0.0",
				found: "17.x.x",
				resolution: "Pin marked to ^15.0.0 or wait for marked-terminal v8+",
			},
		],
	},
	{
		package: "zod",
		conflicts: [
			{
				with: "openai",
				expected: "^3.23.8",
				found: "4.x.x",
				resolution: "Pin zod to ^3.23.8 or wait for OpenAI SDK Zod v4 support",
			},
		],
	},
]

function semanticVersionCompare(version1, version2) {
	const cleanVersion = (v) => v.replace(/^[~^]/, "")
	const parseVersion = (v) => {
		const parts = cleanVersion(v).split(".").map(Number)
		return {
			major: parts[0] || 0,
			minor: parts[1] || 0,
			patch: parts[2] || 0,
		}
	}

	const v1 = parseVersion(version1)
	const v2 = parseVersion(version2)

	if (v1.major !== v2.major) return v1.major - v2.major
	if (v1.minor !== v2.minor) return v1.minor - v2.minor
	return v1.patch - v2.patch
}

function isConflicting(actual, expected, conflictType) {
	const actualVersion = actual.replace(/^[~^]/, "")

	if (conflictType === "range") {
		// Simple range checking for common cases
		if (expected.includes("<16.0.0") && semanticVersionCompare(actualVersion, "16.0.0") >= 0) {
			return true
		}
		if (expected.includes(">=4.0.0 <5.0.0") && semanticVersionCompare(actualVersion, "5.0.0") >= 0) {
			return true
		}
		if (expected === "^3.23.8" && actualVersion.startsWith("4.")) {
			return true
		}
	}

	return false
}

function analyzeConflicts(packageJson) {
	const conflicts = []
	const warnings = []

	for (const pattern of CONFLICT_PATTERNS) {
		const basePackage = packageJson.dependencies?.[pattern.package]
		if (!basePackage) continue

		for (const conflict of pattern.conflicts) {
			const conflictingPackage = packageJson.dependencies?.[conflict.with]
			if (!conflictingPackage) continue

			if (isConflicting(conflictingPackage, conflict.expected, "range")) {
				conflicts.push({
					package: pattern.package,
					baseVersion: basePackage,
					conflictWith: conflict.with,
					conflictingVersion: conflictingPackage,
					resolution: conflict.resolution,
				})
			}
		}
	}

	// Check for pnpm workspace constraints
	if (packageJson.pnpm?.overrides) {
		warnings.push("⚠️ pnpm overrides detected - conflicts may be suppressed")
	}

	return { conflicts, warnings }
}

function main() {
	try {
		const packagePath = join(__dirname, "..", "package.json")
		const packageJson = JSON.parse(readFileSync(packagePath, "utf8"))

		console.log("🔍 Analyzing peer dependency conflicts...\n")

		const { conflicts, warnings } = analyzeConflicts(packageJson)

		if (warnings.length > 0) {
			warnings.forEach((warning) => console.log(warning))
			console.log()
		}

		if (conflicts.length === 0) {
			console.log("✅ No critical peer dependency conflicts detected!\n")
			console.log("📋 Recommendations:")
			console.log("   • Run regular audits: pnpm audit && pnpm outdated")
			console.log("   • Keep dependencies updated: pnpm update")
			console.log("   • Check this script: node scripts/check-peer-deps.js")
		} else {
			console.log(`❌ Found ${conflicts.length} peer dependency conflict${conflicts.length === 1 ? "" : "s"}:\n`)

			conflicts.forEach((conflict, index) => {
				console.log(
					`  ${index + 1}. ${conflict.package}@${conflict.baseVersion} conflicts with ${conflict.conflictWith}@${conflict.conflictingVersion}`,
				)
				console.log(`     💡 ${conflict.resolution}\n`)
			})

			console.log("📖 For more detailed solutions, see: docs/PEER_DEPENDENCY_TROUBLESHOOTING.md\n")
			console.log("🛠️  Quick fixes:")
			console.log("   • Use overrides: Add pnpm.overrides in package.json")
			console.log("   • Downgrade: Pin conflicting packages to compatible versions")
			console.log("   • Upgrade: Update both packages to compatible newer versions")
			console.log("\n⚠️  Note: This analysis is based on known current conflicts and may not be exhaustive.")

			process.exit(1)
		}
	} catch (error) {
		console.error("❌ Error analyzing peer dependencies:", error.message)
		process.exit(1)
	}
}

if (import.meta.url === `file://${process.argv[1]}`) {
	main()
}

export { analyzeConflicts, CONFLICT_PATTERNS }
