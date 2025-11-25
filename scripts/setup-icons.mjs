import { execSync } from "child_process"
import fs from "fs"
import path from "path"

console.log("🔧 Fetching vscode-material-icons...\n")

try {
	const vscodeIconsDir = path.join(process.cwd(), "node_modules/vscode-material-icons")
	const generatedDir = path.join(vscodeIconsDir, "generated")

	// Check if generated directory exists and has files
	if (!fs.existsSync(generatedDir) || fs.readdirSync(generatedDir).length === 0) {
		console.log("📦 Fetching vscode-material-icons...")

		// Change to the vscode-material-icons directory and run fetch-icons
		const originalCwd = process.cwd()
		process.chdir(vscodeIconsDir)

		try {
			execSync("node scripts/fetch-icons.js", {
				encoding: "utf8",
				stdio: "inherit",
				timeout: 300000, // 5 minute timeout
			})
			console.log("✅ vscode-material-icons fetched successfully")
		} catch (error) {
			console.log("⚠️  Could not fetch vscode-material-icons:", error.message)
			console.log("📦 Creating minimal icons directory...")

			// Create the generated directory if it doesn't exist
			if (!fs.existsSync(generatedDir)) {
				fs.mkdirSync(generatedDir, { recursive: true })
			}

			// Create a simple placeholder to avoid the zip.svg error
			const iconsDir = path.join(generatedDir, "icons")
			if (!fs.existsSync(iconsDir)) {
				fs.mkdirSync(iconsDir, { recursive: true })
			}

			// Create a minimal zip.svg placeholder
			const zipSvgPath = path.join(iconsDir, "zip.svg")
			if (!fs.existsSync(zipSvgPath)) {
				const minimalSvg =
					'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="#888"/><text x="8" y="12" text-anchor="middle" fill="white" font-size="10">ZIP</text></svg>'
				fs.writeFileSync(zipSvgPath, minimalSvg)
				console.log("✅ Created minimal zip.svg placeholder")
			}
		}

		process.chdir(originalCwd)
	} else {
		console.log("✅ vscode-material-icons already exist")
	}
} catch (error) {
	console.error("❌ Error setting up vscode-material-icons:", error.message)
	process.exit(1)
}
