const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🔍 Debugging VSIX nightly build...\n")

try {
	// Change to build directory
	process.chdir("apps/vscode-nightly/build")
	console.log("📁 Current directory:", process.cwd())

	// Check if package.json exists
	if (fs.existsSync("package.json")) {
		const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))
		console.log("📦 Package name:", pkg.name)
		console.log("📦 Package version:", pkg.version)
		console.log("📦 Expected VSIX name:", `${pkg.name}-${pkg.version}.vsix`)
	}

	// Check if extension.js exists
	if (fs.existsSync("dist/extension.js")) {
		console.log("✅ dist/extension.js exists")
	} else {
		console.log("❌ dist/extension.js missing")
	}

	// Try to run vsce package with verbose output
	console.log("\n🏗️  Running vsce package...")
	try {
		const output = execSync("npx vsce package --no-dependencies --out ../../../bin --pre-release", {
			encoding: "utf8",
			stdio: "pipe",
		})
		console.log("VSCE output:", output)
	} catch (error) {
		console.log("VSCE error output:", error.stdout || error.message)
		console.log("VSCE stderr:", error.stderr || "")
	}

	// Check bin directory for new files
	process.chdir("../../..")
	const binFiles = fs.readdirSync("bin").filter((f) => f.endsWith(".vsix"))
	console.log("\n📦 VSIX files in bin directory:", binFiles)
} catch (error) {
	console.error("❌ Debug script error:", error.message)
}
