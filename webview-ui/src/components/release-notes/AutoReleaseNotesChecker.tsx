// kilocode_change - simplified: Use hook to get markdown and pass to dialog
import React, { useState, useEffect } from "react"
import { ReleaseNotesDialog } from "./ReleaseNotesDialog"
import { useReleaseNotes } from "../../hooks/useReleaseNotes"

const SHOULD_AUTO_OPEN = false // Disable auto-opening for the first version
const AUTO_OPEN_DELAY_MS = 2000 // 2 second delay before showing dialog

export const AutoReleaseNotesChecker: React.FC = () => {
	const [showDialog, setShowDialog] = useState(false)
	const { hasNewVersion, loadReleases } = useReleaseNotes()

	useEffect(() => {
		if (!SHOULD_AUTO_OPEN) return

		let mounted = true
		const checkAndAutoOpen = async () => {
			try {
				await loadReleases()
				if (!mounted || !hasNewVersion) return

				setTimeout(() => {
					if (mounted) {
						setShowDialog(true)
					}
				}, AUTO_OPEN_DELAY_MS)
			} catch (error) {
				console.warn("Failed to check for unviewed releases:", error)
			}
		}
		checkAndAutoOpen()

		return () => {
			mounted = false
		}
	}, [hasNewVersion, loadReleases])

	return showDialog ? <ReleaseNotesDialog isOpen onClose={() => setShowDialog(false)} /> : null
}
