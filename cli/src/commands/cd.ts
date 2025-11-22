/**
 * /cd command - Change directory
 */

import { existsSync, realpathSync, readdirSync } from "node:fs"
import { resolve, join } from "node:path"
import { homedir } from "node:os"
import type { Command, ArgumentProvider, ArgumentSuggestion } from "./core/types.js"

/**
 * Directory autocomplete provider for cd command
 */
const directoryAutocompleteProvider: ArgumentProvider = async (context) => {
	const { partialInput } = context
	const suggestions: ArgumentSuggestion[] = []

	try {
		// Get current directory from process.cwd() since workspace path is not in config
		const currentDir = process.cwd()

		// Determine the directory to list
		let searchDir = currentDir
		let prefix = ""

		if (partialInput.includes("/")) {
			// Handle paths with directories
			const pathParts = partialInput.split("/")
			if (partialInput.startsWith("/")) {
				// Absolute path
				searchDir = "/" + pathParts.slice(0, -1).join("/")
				prefix = "/" + pathParts.slice(0, -1).join("/") + "/"
			} else {
				// Relative path
				searchDir = resolve(currentDir, pathParts.slice(0, -1).join("/"))
				prefix = pathParts.slice(0, -1).join("/") + "/"
			}
		}

		// Ensure search directory exists
		if (!existsSync(searchDir)) {
			return suggestions
		}

		// Read directory contents
		const entries = readdirSync(searchDir, { withFileTypes: true })
		const searchTerm = partialInput.split("/").pop() || ""

		// Filter and create suggestions for directories
		for (const entry of entries) {
			if (entry.isDirectory() && entry.name.startsWith(searchTerm)) {
				const fullPath = join(searchDir, entry.name)
				const displayPath = prefix + entry.name

				suggestions.push({
					value: displayPath,
					title: entry.name,
					description: fullPath,
					matchScore: entry.name === searchTerm ? 100 : entry.name.startsWith(searchTerm) ? 80 : 60,
					highlightedValue: displayPath.replace(new RegExp(`(${searchTerm})`, "gi"), "**$1**"),
				})
			}
		}

		// Add common directory suggestions
		const commonDirs = ["~", "..", "/", "."]
		for (const dir of commonDirs) {
			if (dir.startsWith(searchTerm)) {
				suggestions.push({
					value: dir,
					title: dir,
					description:
						dir === "~"
							? "Home directory"
							: dir === ".."
								? "Parent directory"
								: dir === "/"
									? "Root directory"
									: "Current directory",
					matchScore: dir === searchTerm ? 95 : 70,
					highlightedValue: dir.replace(new RegExp(`(${searchTerm})`, "gi"), "**$1**"),
				})
			}
		}

		// Sort by match score and name
		suggestions.sort((a, b) => {
			if (b.matchScore !== a.matchScore) {
				return b.matchScore - a.matchScore
			}
			return a.value.localeCompare(b.value)
		})

		// Limit to top 20 suggestions
		return suggestions.slice(0, 20)
	} catch (_error) {
		// Return empty suggestions on error
		return suggestions
	}
}

export const cdCommand: Command = {
	name: "cd",
	aliases: [],
	description: "Change the current working directory",
	usage: "/cd [directory]",
	examples: ["/cd", "/cd ..", "/cd /home/user", "/cd src"],
	category: "navigation",
	priority: 8,
	handler: async (context) => {
		const { args, addMessage, setWorkspacePath } = context

		if (args.length === 0) {
			// Show current directory
			const currentDir = process.cwd()
			addMessage({
				id: Date.now().toString(),
				type: "system",
				content: `Current directory: ${currentDir}`,
				ts: Date.now(),
			})
			return
		}

		const targetDir = args[0]
		let resolvedPath: string

		if (!targetDir) {
			addMessage({
				id: Date.now().toString(),
				type: "error",
				content: "Usage: /cd [directory]. Provide a directory path.",
				ts: Date.now(),
			})
			return
		}

		try {
			// Get current directory from process.cwd()
			const currentDir = process.cwd()

			// Handle different path formats
			if (targetDir === "~") {
				// Handle home directory
				resolvedPath = homedir()
			} else if (targetDir === "..") {
				// Go up one directory from current workspace path
				resolvedPath = join(currentDir, "..")
			} else if (targetDir === "-") {
				// Go to previous directory (not implemented yet, show message)
				addMessage({
					id: Date.now().toString(),
					type: "error",
					content: "Previous directory navigation (cd -) is not yet implemented.",
					ts: Date.now(),
				})
				return
			} else if (targetDir === "/") {
				// Root directory (on Unix-like systems)
				resolvedPath = "/"
			} else if (targetDir.startsWith("/")) {
				// Absolute path
				resolvedPath = targetDir
			} else {
				// Relative path from current workspace directory
				resolvedPath = resolve(currentDir, targetDir)
			}

			// Resolve any symlinks and get the real path
			resolvedPath = realpathSync(resolvedPath)

			// Check if directory exists
			if (!existsSync(resolvedPath)) {
				addMessage({
					id: Date.now().toString(),
					type: "error",
					content: `Directory does not exist: ${resolvedPath}`,
					ts: Date.now(),
				})
				return
			}

			// Update workspace path in the CLI state
			setWorkspacePath(resolvedPath)

			addMessage({
				id: Date.now().toString(),
				type: "system",
				content: `Changed to directory: ${resolvedPath}`,
				ts: Date.now(),
			})
		} catch (error) {
			addMessage({
				id: Date.now().toString(),
				type: "error",
				content: `Failed to change directory: ${error instanceof Error ? error.message : String(error)}`,
				ts: Date.now(),
			})
		}
	},
	arguments: [
		{
			name: "directory",
			description: "Directory path to navigate to",
			provider: directoryAutocompleteProvider,
		},
	],
}
