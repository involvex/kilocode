import { config } from "dotenv"
import { existsSync } from "fs"
import { join } from "path"
/**
 * Loads the .env file from the dist directory (where binaries are located)
 * Throws an error if the .env file doesn't exist
 */
export function loadEnvFile() {
	// In bundled output, __dirname points to the dist directory where index.js is located
	// The .env file should be in the same directory
	const envPath = join(__dirname, ".env")
	// Check if .env file exists
	if (!existsSync(envPath)) {
		console.error(`Error: Required .env file not found at: ${envPath}`)
		process.exit(1)
	}
	// Load the .env file
	const result = config({ path: envPath })
	if (result.error) {
		console.error(`Error loading .env file: ${result.error.message}`)
		process.exit(1)
	}
}
