import { execSync } from "child_process"
import fs from "fs"
import path from "path"

console.log("🔧 Robust VSIX packaging...\n")

try {
	// Clean first
	console.log("🧹 Cleaning bin directory...")
	const binDir = path.join(process.cwd(), "..", "bin")
	if (fs.existsSync(binDir)) {
		fs.rmSync(binDir, { recursive: true, force: true })
	}
	fs.mkdirSync(binDir, { recursive: true })

	// Change to src directory for vsce
	process.chdir("src")
	console.log("📁 Changed to:", process.cwd())

	// Try packaging with different approaches
	const approaches = [
		{ name: "Standard vsce", cmd: "npx vsce package --no-dependencies --out ../bin" },
		{ name: "vsce with yarn", cmd: "npx vsce package --no-dependencies --out ../bin --yarn" },
		{ name: "vsce with npm", cmd: "npx vsce package --no-dependencies --out ../bin --npm" },
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
	process.chdir("..")
	const vsixFiles = fs.readdirSync(binDir).filter((f) => f.endsWith(".vsix"))
	console.log(`\n📦 Created VSIX files: ${vsixFiles}`)
} catch (error) {
	console.error("❌ VSIX packaging failed:", error.message)
	console.error("Stderr:", error.stderr || "")
	process.exit(1)
}
