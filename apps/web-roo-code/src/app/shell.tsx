"use client"

import { useState, useEffect } from "react"

import { NavBar, Footer } from "@/components/chromes"

export default function Shell({ children }: { children: React.ReactNode }): React.ReactNode {
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
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<NavBar stars={stars} downloads={downloads} />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	)
}
