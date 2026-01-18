"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { RxSun, RxMoon } from "react-icons/rx"

import { Button } from "@/components/ui"

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// Avoid hydration mismatch.
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		const RxSunAny = RxSun as any
		return (
			<Button variant="ghost" size="icon" disabled className="h-9 w-9">
				<RxSunAny className="h-4 w-4" />
			</Button>
		)
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="h-9 w-9"
			aria-label="Toggle theme">
			{(() => {
				const RxSunAny = RxSun as any
				const RxMoonAny = RxMoon as any
				return theme === "dark" ? (
					<RxSunAny className="h-4 w-4 transition-all" />
				) : (
					<RxMoonAny className="h-4 w-4 transition-all" />
				)
			})()}
		</Button>
	)
}
