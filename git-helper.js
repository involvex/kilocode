const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

try {
	// Try to get git status
	try {
		const status = execSync("git status --porcelain", { encoding: "utf8", cwd: __dirname })
		console.log("Git status:", status)
	} catch (error) {
		console.log("Error getting git status:", error.message)
	}

	// Try to get current branch
	try {
		const branch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8", cwd: __dirname })
		console.log("Current branch:", branch.trim())
	} catch (error) {
		console.log("Error getting current branch:", error.message)
	}

	// Try to fetch from origin
	try {
		console.log("Fetching from origin...")
		execSync("git fetch origin", { encoding: "utf8", cwd: __dirname })
		console.log("Fetch completed")
	} catch (error) {
		console.log("Error fetching:", error.message)
	}

	// Get latest main commit
	try {
		const mainCommit = execSync("git rev-parse origin/main", { encoding: "utf8", cwd: __dirname })
		console.log("Latest main commit:", mainCommit.trim())
	} catch (error) {
		console.log("Error getting main commit:", error.message)
	}
} catch (error) {
	console.error("Script error:", error)
}
