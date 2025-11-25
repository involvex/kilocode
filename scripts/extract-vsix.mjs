#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import { fileURLToPath } from "url"

// Helper function to copy directories recursively
function copyDirectory(src, dest) {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true })
	}

	const files = fs.readdirSync(src)
	for (const file of files) {
		const srcPath = path.join(src, file)
		const destPath = path.join(dest, file)

		if (fs.statSync(srcPath).isDirectory()) {
			copyDirectory(srcPath, destPath)
		} else {
			fs.copyFileSync(srcPath, destPath)
		}
	}
}

// Get the bin directory path - script is in scripts/ but run from src/
const binDir = path.join(process.cwd(), "..", "bin")
const unpackedDir = path.join(process.cwd(), "..", "bin-unpacked")

console.log("Bin dir:", binDir)
console.log("Unpacked dir:", unpackedDir)

// Create unpacked directory if it doesn't exist
if (!fs.existsSync(unpackedDir)) {
	fs.mkdirSync(unpackedDir, { recursive: true })
}

// Find the VSIX file
const vsixFiles = fs.readdirSync(binDir).filter((file) => file.endsWith(".vsix"))

if (vsixFiles.length === 0) {
	console.error("No VSIX file found in bin directory")
	process.exit(1)
}

const vsixFile = path.join(binDir, vsixFiles[0])
console.log(`Extracting ${vsixFile} to ${unpackedDir}`)

try {
	// Try different extraction methods based on platform
	const platform = process.platform

	if (platform === "win32") {
		// On Windows, try tar first (comes with Git for Windows and Windows 10+)
		try {
			execSync(`tar -tf "${vsixFile}"`, { stdio: "pipe" })
			execSync(`tar -xf "${vsixFile}" -C "${unpackedDir}"`, { stdio: "pipe" })
			console.log("✅ Extracted using tar")
		} catch (tarError) {
			// If tar fails, try PowerShell Expand-Archive
			try {
				const psCommand = `Expand-Archive -Path "${vsixFile}" -DestinationPath "${unpackedDir}" -Force`
				execSync(`powershell -Command "${psCommand}"`, { stdio: "pipe" })
				console.log("✅ Extracted using PowerShell Expand-Archive")
			} catch (psError) {
				console.log("⚠️  Neither tar nor PowerShell Expand-Archive available")
				console.log("📦 Please extract manually:")
				console.log(`   1. Rename ${vsixFile} to ${vsixFile.replace(".vsix", ".zip")}`)
				console.log(`   2. Extract the ZIP file to ${unpackedDir}`)
				console.log(`   3. Move contents from 'extension' subfolder to ${unpackedDir} root`)
				process.exit(0)
			}
		}
	} else {
		// On Unix-like systems, use unzip
		execSync(`unzip -q -o "${vsixFile}" -d "${unpackedDir}"`, { stdio: "pipe" })
		console.log("✅ Extracted using unzip")
	}

	// Move contents from extension subdirectory to root if it exists
	const extensionDir = path.join(unpackedDir, "extension")
	if (fs.existsSync(extensionDir)) {
		const files = fs.readdirSync(extensionDir)
		for (const file of files) {
			const src = path.join(extensionDir, file)
			const dest = path.join(unpackedDir, file)

			try {
				// First try to rename (move)
				fs.renameSync(src, dest)
			} catch (renameError) {
				// If rename fails, copy and then remove
				try {
					if (fs.statSync(src).isDirectory()) {
						// Copy directory recursively
						copyDirectory(src, dest)
					} else {
						// Copy file
						fs.copyFileSync(src, dest)
					}
					// Remove the original
					if (fs.statSync(dest).isDirectory()) {
						fs.rmdirSync(src, { recursive: true })
					} else {
						fs.unlinkSync(src)
					}
				} catch (copyError) {
					console.log(`Warning: Could not move ${file}, might already exist`)
				}
			}
		}
		try {
			fs.rmdirSync(extensionDir)
		} catch (rmError) {
			console.log("Warning: Could not remove extension directory")
		}
		console.log("📁 Moved extension contents to root")
	}

	console.log("🎉 VSIX extraction completed successfully")
} catch (error) {
	console.error("❌ Error extracting VSIX:", error.message)
	process.exit(1)
}
