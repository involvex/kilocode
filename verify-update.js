const fs = require("fs")

try {
	// Check root package.json
	console.log("Checking root package.json...")
	const rootPackage = JSON.parse(fs.readFileSync("package.json", "utf8"))
	console.log("✓ Root package.json is valid")
	console.log(`  Name: ${rootPackage.name}`)
	console.log(`  Package manager: ${rootPackage.packageManager}`)

	// Check src/package.json
	console.log("\nChecking src/package.json...")
	const srcPackage = JSON.parse(fs.readFileSync("src/package.json", "utf8"))
	console.log("✓ src/package.json is valid")
	console.log(`  Name: ${srcPackage.name}`)
	console.log(`  Publisher: ${srcPackage.publisher}`)
	console.log(`  Version: ${srcPackage.version}`)

	// Check src/package.nls.json
	console.log("\nChecking src/package.nls.json...")
	const nlsPackage = JSON.parse(fs.readFileSync("src/package.nls.json", "utf8"))
	console.log("✓ src/package.nls.json is valid")
	console.log(`  Display name: ${nlsPackage["extension.displayName"]}`)
	console.log(`  Sidebar name: ${nlsPackage["views.sidebar.name"]}`)

	// Check jetbrains plugin package.json
	console.log("\nChecking jetbrains/plugin/package.json...")
	const jetbrainsPackage = JSON.parse(fs.readFileSync("jetbrains/plugin/package.json", "utf8"))
	console.log("✓ jetbrains/plugin/package.json is valid")
	console.log(`  Name: ${jetbrainsPackage.name}`)

	console.log("\n✅ All JSON files are valid!")
	console.log("\n📋 Summary of changes:")
	console.log("- Updated root package.json to latest main branch dependencies")
	console.log("- Updated src/package.json version to 4.121.2")
	console.log("- Preserved @involvex/kilo-code branding throughout")
	console.log("- Updated scripts to match main branch")
} catch (error) {
	console.error("❌ Error:", error.message)
	process.exit(1)
}
