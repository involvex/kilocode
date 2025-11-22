import { execSync } from "child_process"
import fs from "fs"
import path from "path"

console.log("🔧 Robust VSIX nightly packaging...\n")

try {
	// Setup vscode-material-icons first
	console.log("🎨 Setting up vscode-material-icons...")
	try {
		execSync("node ../scripts/setup-icons.mjs", {
			encoding: "utf8",
			stdio: "pipe",
			timeout: 300000, // 5 minute timeout for icon fetching
		})
		console.log("✅ Icons setup completed")
	} catch (iconError) {
		console.log("⚠️  Icons setup failed, continuing anyway:", iconError.message)
	}

	// Clean first
	console.log("🧹 Cleaning bin directory...")
	const binDir = path.join(process.cwd(), "..", "bin")
	if (fs.existsSync(binDir)) {
		fs.rmSync(binDir, { recursive: true, force: true })
	}
	fs.mkdirSync(binDir, { recursive: true })

	console.log("📁 Current directory:", process.cwd())

	// Try packaging with different approaches (we're already in src directory)
	const approaches = [
		{ name: "Standard vsce nightly", cmd: "npx vsce package --no-dependencies --out ../bin --pre-release" },
		{ name: "vsce nightly with yarn", cmd: "npx vsce package --no-dependencies --out ../bin --pre-release --yarn" },
		{ name: "vsce nightly with npm", cmd: "npx vsce package --no-dependencies --out ../bin --pre-release --npm" },
	]

	for (const approach of approaches) {
		console.log(`\n📦 Trying: ${approach.name}`)
		try {
			const output = execSync(approach.cmd, {
				encoding: "utf8",
				stdio: "pipe",
				timeout: 120000, // 2 minute timeout
			})
			console.log("✅ Success!")
			console.log(output)
			break
		} catch (error) {
			console.log(`❌ Failed: ${error.message}`)
			if (approach.name === approaches[approaches.length - 1].name) {
				// Last approach failed, throw the error
				throw error
			}
		}
	}

	// Check if VSIX was created
	const vsixFiles = fs.readdirSync(binDir).filter((f) => f.endsWith(".vsix"))
	console.log(`\n📦 Created VSIX files: ${vsixFiles}`)
} catch (error) {
	console.error("❌ VSIX nightly packaging failed:", error.message)
	console.error("Stderr:", error.stderr || "")
	process.exit(1)
}
