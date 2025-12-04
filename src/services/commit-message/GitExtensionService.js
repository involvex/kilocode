import * as path from "path"
import { spawnSync } from "child_process"
import { shouldExcludeLockFile } from "./exclusionUtils"
import { RooIgnoreController } from "../../core/ignore/RooIgnoreController"
export class GitExtensionService {
	workspaceRoot
	ignoreController = null
	constructor(workspaceRoot) {
		this.workspaceRoot = workspaceRoot
		try {
			this.ignoreController = new RooIgnoreController(workspaceRoot)
			this.ignoreController.initialize()
		} catch (error) {
			this.ignoreController = null
		}
	}
	/**
	 * Gathers information about changes (staged or unstaged)
	 */
	async gatherChanges(options) {
		try {
			const statusOutput = this.getStatus(options)
			if (!statusOutput.trim()) {
				return []
			}
			const changes = []
			const lines = statusOutput.split("\n").filter((line) => line.trim())
			for (const line of lines) {
				if (!line || line.length < 2) continue
				let statusCode
				let filePath
				if (options.staged) {
					// git diff --name-status --cached format: "M\tfile.txt"
					const tabIndex = line.indexOf("\t")
					if (tabIndex > 0) {
						statusCode = line.substring(0, tabIndex).trim()
						filePath = line.substring(tabIndex + 1).trim()
					} else {
						continue
					}
				} else {
					// git status --porcelain format: " M file.txt" or "?? file.txt"
					if (line.length < 3) continue
					const indexStatus = line.charAt(0)
					const workingStatus = line.charAt(1)
					filePath = line.substring(2).trim() // Skip the two status chars
					// Determine the effective status
					if (workingStatus !== " ") {
						statusCode = workingStatus
					} else if (indexStatus !== " ") {
						statusCode = indexStatus
					} else {
						continue
					}
					// Handle special cases
					if (indexStatus === "?" && workingStatus === "?") {
						statusCode = "?" // Untracked
					}
				}
				if (filePath && statusCode) {
					changes.push({
						filePath: path.join(this.workspaceRoot, filePath),
						status: this.getChangeStatusFromCode(statusCode),
						staged: options.staged,
					})
				}
			}
			return changes
		} catch (error) {
			return []
		}
	}
	spawnGitWithArgs(args) {
		const result = spawnSync("git", args, {
			cwd: this.workspaceRoot,
			encoding: "utf8",
			stdio: ["ignore", "pipe", "pipe"],
		})
		if (result.error) {
			throw result.error
		}
		if (result.status !== 0) {
			throw new Error(`Git command failed with status ${result.status}: ${result.stderr}`)
		}
		return result.stdout
	}
	async getDiffForChanges(changes, options) {
		const { onProgress } = options || {}
		if (changes.length === 0) {
			return ""
		}
		try {
			const diffs = []
			let processedFiles = 0
			for (const change of changes) {
				const relativePath = path.relative(this.workspaceRoot, change.filePath)
				if (this.shouldIncludeFile(relativePath)) {
					const stagedFlag = change.staged ?? options.staged ?? true
					const diff = this.getGitDiff(change.filePath, { staged: stagedFlag })
					if (diff) {
						diffs.push(diff)
					}
				}
				processedFiles++
				this.reportProgress(onProgress, processedFiles, changes.length)
			}
			return diffs.join("\n")
		} catch (error) {
			return ""
		}
	}
	getStatus(options) {
		const { staged } = options
		if (staged) {
			// For staged files, use diff --cached to get only staged changes
			return this.spawnGitWithArgs(["diff", "--name-status", "--cached"])
		} else {
			// For unstaged files, use status --porcelain to get both modified tracked and untracked files
			return this.spawnGitWithArgs(["status", "--porcelain"])
		}
	}
	getGitDiff(filePath, options) {
		const { staged } = options
		try {
			if (this.isBinaryFile(filePath, staged)) {
				return `Binary file ${filePath} has been ${staged ? "staged" : "modified"}`
			}
			if (!staged && this.isUntrackedFile(filePath)) {
				return `New untracked file: ${filePath}`
			}
			const diffArgs = this.buildDiffArgs(staged, filePath)
			return this.spawnGitWithArgs(diffArgs)
		} catch (error) {
			return `File ${filePath} - diff unavailable`
		}
	}
	getCurrentBranch() {
		return this.spawnGitWithArgs(["branch", "--show-current"])
	}
	getRecentCommits(count = 5) {
		return this.spawnGitWithArgs(["log", "--oneline", `-${count}`])
	}
	/**
	 * Gets all context needed for commit message generation
	 * Can optionally focus on specific files if provided
	 */
	async getCommitContext(changes, options, specificFiles) {
		const { staged, includeRepoContext = true } = options
		try {
			// Start building the context with the required sections
			let context = "## Git Context for Commit Message Generation\n\n"
			// Determine which changes to include in diff generation
			const targetChanges =
				specificFiles && specificFiles.length > 0
					? changes.filter((change) => {
							const absolutePath = change.filePath
							const relativePath = path.relative(this.workspaceRoot, absolutePath)
							return specificFiles.some(
								(file) =>
									file === absolutePath ||
									file === relativePath ||
									absolutePath.endsWith(file) ||
									relativePath === path.normalize(file),
							)
						})
					: changes
			// Add full diff - essential for understanding what changed
			try {
				const diff = await this.getDiffForChanges(targetChanges, options)
				const fileInfo = specificFiles ? ` (${specificFiles.length} selected files)` : ""
				const allStaged = targetChanges.every((change) => change.staged)
				const allUnstaged = targetChanges.every((change) => !change.staged)
				const changeDescriptor = allStaged ? "Staged" : allUnstaged ? "Unstaged" : "Selected"
				context += `### Full Diff of ${changeDescriptor} Changes${fileInfo}\n\`\`\`diff\n` + diff + "\n```\n\n"
			} catch (error) {
				const changeType = staged ? "Staged" : "Unstaged"
				const fileInfo = specificFiles ? ` (${specificFiles.length} selected files)` : ""
				context += `### Full Diff of ${changeType} Changes${fileInfo}\n\`\`\`diff\n(No diff available)\n\`\`\`\n\n`
			}
			// Add change summary derived from provided changes
			if (targetChanges.length > 0) {
				const summaryLines = targetChanges.map((change) => {
					const relativePath = path.relative(this.workspaceRoot, change.filePath)
					const scope = change.staged ? "staged" : "unstaged"
					return `${this.getReadableStatus(change.status)} (${scope}): ${relativePath}`
				})
				context += "### Change Summary\n```\n" + summaryLines.join("\n") + "\n```\n\n"
			} else {
				context += "### Change Summary\n```\n(No changes matched selection)\n```\n\n"
			}
			if (includeRepoContext) {
				// Add contextual information
				context += "### Repository Context\n\n"
				// Show current branch
				try {
					const currentBranch = this.getCurrentBranch()
					if (currentBranch) {
						context += "**Current branch:** `" + currentBranch.trim() + "`\n\n"
					}
				} catch (error) {
					// Skip if not available
				}
				// Show recent commits for context
				try {
					const recentCommits = this.getRecentCommits()
					if (recentCommits) {
						context += "**Recent commits:**\n```\n" + recentCommits + "\n```\n"
					}
				} catch (error) {
					// Skip if not available
				}
			}
			return context
		} catch (error) {
			return "## Error generating commit context\n\nUnable to gather complete context for commit message generation."
		}
	}
	/**
	 * Validates and returns the raw Git status code
	 */
	getChangeStatusFromCode(code) {
		switch (code) {
			case "M":
			case "A":
			case "D":
			case "R":
			case "C":
			case "U":
			case "?":
				return code
			default:
				return "Unknown"
		}
	}
	/**
	 * Converts Git status code to readable text for display
	 */
	getReadableStatus(status) {
		switch (status) {
			case "M":
				return "Modified"
			case "A":
				return "Added"
			case "D":
				return "Deleted"
			case "R":
				return "Renamed"
			case "C":
				return "Copied"
			case "U":
				return "Updated"
			case "?":
				return "Untracked"
			case "Unknown":
			default:
				return "Unknown"
		}
	}
	shouldIncludeFile(relativePath) {
		let isValidFile = true
		if (this.ignoreController) {
			try {
				isValidFile = this.ignoreController.validateAccess(relativePath)
			} catch (error) {
				isValidFile = true
			}
		}
		return isValidFile && !shouldExcludeLockFile(relativePath)
	}
	reportProgress(onProgress, processed, total) {
		if (onProgress && total > 0) {
			const percentage = (processed / total) * 100
			onProgress(percentage)
		}
	}
	isBinaryFile(filePath, staged) {
		try {
			const checkArgs = this.buildNumstatArgs(staged, filePath)
			const numstatOutput = this.spawnGitWithArgs(checkArgs)
			return numstatOutput.includes("-\t-\t")
		} catch (error) {
			return false
		}
	}
	isUntrackedFile(filePath) {
		try {
			const statusArgs = ["status", "--porcelain", "--", filePath]
			const statusOutput = this.spawnGitWithArgs(statusArgs)
			return statusOutput.startsWith("??")
		} catch (error) {
			return false
		}
	}
	buildNumstatArgs(staged, filePath) {
		return staged ? ["diff", "--cached", "--numstat", "--", filePath] : ["diff", "--numstat", "--", filePath]
	}
	buildDiffArgs(staged, filePath) {
		return staged ? ["diff", "--cached", "--", filePath] : ["diff", "--", filePath]
	}
	dispose() {
		try {
			if (this.ignoreController) {
				this.ignoreController.dispose()
			}
		} catch (error) {
			// Ignore dispose errors
		} finally {
			this.ignoreController = null
		}
	}
}
//# sourceMappingURL=GitExtensionService.js.map
