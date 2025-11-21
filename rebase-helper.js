const fs = require("fs")
const { execSync } = require("child_process")

console.log("🚀 Starting rebase completion process...\n")

try {
	// Step 1: Create new branch
	console.log("📂 Creating new branch: involvex-finish-rebase")
	execSync("git checkout -b involvex-finish-rebase", { stdio: "inherit", cwd: __dirname })
	console.log("✅ Branch created successfully\n")

	// Step 2: Check current status
	console.log("📋 Checking git status...")
	const status = execSync("git status --porcelain", { encoding: "utf8", cwd: __dirname })
	console.log("Status:", status)

	// Step 3: Verify key files
	console.log("\n🔍 Verifying key files...")

	const rootPackage = JSON.parse(fs.readFileSync("package.json", "utf8"))
	console.log(`✓ Root package name: ${rootPackage.name}`)
	console.log(`✓ Package manager: ${rootPackage.packageManager}`)

	const srcPackage = JSON.parse(fs.readFileSync("src/package.json", "utf8"))
	console.log(`✓ SRC publisher: ${srcPackage.publisher}`)
	console.log(`✓ SRC version: ${srcPackage.version}`)

	const nlsPackage = JSON.parse(fs.readFileSync("src/package.nls.json", "utf8"))
	console.log(`✓ Display name: ${nlsPackage["extension.displayName"]}`)

	console.log("\n🎯 All files verified successfully!")
} catch (error) {
	console.error("❌ Error:", error.message)
	process.exit(1)
}
