import { execSync } from "child_process"
import fs from "fs"
import path from "path"

console.log("🔧 Robust VSIX packaging...\n")

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

	// Handle extension name issue - VSCE doesn't like @ in extension names
	const packageJsonPath = path.join(process.cwd(), "package.json")
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
	const originalName = packageJson.name
	const isScopedPackage = originalName.startsWith("@")
	
	let tempPackageJson = null
	
	if (isScopedPackage) {
		console.log("⚠️  Scoped package detected, temporarily fixing extension name for VSCE...")
		// Convert @involvex/kilo-code to involvex-kilo-code for packaging
		const extensionName = originalName.substring(1).replace("/", "-") // Remove @ and replace / with -
		tempPackageJson = { ...packageJson, name: extensionName }
		fs.writeFileSync(packageJsonPath, JSON.stringify(tempPackageJson, null, 2))
		console.log(`📝 Temporary extension name: ${extensionName}`)
	}

	// Try packaging with different approaches (we're already in src directory)
	const approaches = [
		{ name: "Standard vsce", cmd: "npx vsce package --no-dependencies --out ../bin" },
		{ name: "vsce with yarn", cmd: "npx vsce package --no-dependencies --out ../bin --yarn" },
	]

	let packagingSuccess = false
	
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
			packagingSuccess = true
			break
		} catch (error) {
			console.log(`❌ Failed: ${error.message}`)
			if (approach.name === approaches[approaches.length - 1].name) {
				// Last approach failed, throw the error
				break
			}
		}
	}
	
	// Restore original package.json if we modified it
	if (tempPackageJson) {
		console.log("🔄 Restoring original package.json...")
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
	}

	if (!packagingSuccess) {
		throw new Error("All packaging approaches failed")
	}

	// Check if VSIX was created
	const vsixFiles = fs.readdirSync(binDir).filter((f) => f.endsWith(".vsix"))
	console.log(`\n📦 Created VSIX files: ${vsixFiles.join(", ")}`)
	
	if (vsixFiles.length === 0) {
		throw new Error("No VSIX files were created")
	}
	
	console.log("🎉 VSIX packaging completed successfully!")
} catch (error) {
	console.error("❌ VSIX packaging failed:", error.message)
	console.error("Stderr:", error.stderr || "")
	process.exit(1)
}
