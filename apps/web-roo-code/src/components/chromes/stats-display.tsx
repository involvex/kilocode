"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { RxGithubLogo } from "react-icons/rx"
import { VscVscode } from "react-icons/vsc"

export default function StatsDisplay(): React.ReactNode {
	const [stars, setStars] = useState<string | null>(null)
	const [downloads, setDownloads] = useState<string | null>(null)

	useEffect(() => {
		async function fetchData() {
			try {
				const [starsData, downloadsData] = await Promise.all([
					import("@/lib/stats").then((m) => m.getGitHubStars()),
					import("@/lib/stats").then((m) => m.getVSCodeDownloads()),
				])
				setStars(starsData)
				setDownloads(downloadsData)
			} catch (error) {
				console.error("Error fetching stats:", error)
			}
		}

		fetchData()
	}, [])

	return (
		<>
			<Link
				href="https://github.com/RooCodeInc/Roo-Code"
				target="_blank"
				className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-200">
				<RxGithubLogo className="h-4 w-4" />
				{stars !== null && <span>{stars}</span>}
			</Link>
			<Link
				href="https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline"
				target="_blank"
				className="hidden md:flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
				<VscVscode className="h-4 w-4" />
				<span>
					Install <span className="font-black">&middot;</span>
				</span>
				{downloads !== null && <span>{downloads}</span>}
			</Link>
		</>
	)
}
