// kilocode_change - simplified: Load and parse changelog markdown directly
import { useState } from "react"
import { useExtensionState } from "../context/ExtensionStateContext"
import { vscode } from "../utils/vscode"
import { loadChangelog } from "../utils/changelogLoader"

// Global cache
let changelogCache: string | null = null
let currentVersionCache: string | null = null

const NULL_VERSION = "0.0.0"

// Parse version from markdown by finding first version header
function parseVersionFromMarkdown(markdown: string): string {
	const versionHeaderRegex = /^## \[v(\d+\.\d+\.\d+)\]/m
	const match = markdown.match(versionHeaderRegex)
	return match ? match[1] : NULL_VERSION
}

export const useReleaseNotes = () => {
	const [loading, setLoading] = useState(false)
	const { lastViewedReleaseVersion } = useExtensionState()

	const loadReleases = async () => {
		if (changelogCache && currentVersionCache) {
			return { markdown: changelogCache, currentVersion: currentVersionCache }
		}

		setLoading(true)
		try {
			// Load changelog from public directory
			changelogCache = await loadChangelog()

			// Parse version from markdown
			currentVersionCache = parseVersionFromMarkdown(changelogCache)

			return { markdown: changelogCache, currentVersion: currentVersionCache }
		} catch (error) {
			console.error("Failed to load release notes:", error)
			changelogCache = ""
			currentVersionCache = NULL_VERSION
			return { markdown: "", currentVersion: NULL_VERSION }
		} finally {
			setLoading(false)
		}
	}

	const hasUnviewedReleases = async (): Promise<boolean> => {
		const data = await loadReleases()
		// If no last viewed version, or current version is different, there are unviewed releases
		return !lastViewedReleaseVersion || lastViewedReleaseVersion !== data.currentVersion
	}

	const markAsViewed = async (version: string): Promise<void> => {
		// Use the generic updateGlobalState message to persist the last viewed version
		vscode.postMessage({
			type: "updateGlobalState",
			stateKey: "lastViewedReleaseVersion",
			stateValue: version,
		})
	}

	// Check if there's a new version (synchronous check on cached data)
	const hasNewVersion =
		changelogCache && currentVersionCache
			? !lastViewedReleaseVersion || lastViewedReleaseVersion !== currentVersionCache
			: false

	return {
		markdown: changelogCache || "",
		currentVersion: currentVersionCache || NULL_VERSION,
		hasNewVersion,
		loading,
		loadReleases,
		hasUnviewedReleases,
		markAsViewed,
	}
}
