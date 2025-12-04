"use client"
import { usePathname, useRouter } from "next/navigation"
export function ScrollButton({ targetId, children, className = "", onClick }) {
	const router = useRouter()
	const pathname = usePathname()
	const handleClick = () => {
		if (pathname === "/") {
			// if we're on the home page, use smooth scrolling
			const section = document.getElementById(targetId)
			section?.scrollIntoView({ behavior: "smooth" })
		} else {
			// if we're on a different page, navigate directly to the section
			router.push(`/#${targetId}`)
		}
		onClick?.()
	}
	return (
		<button onClick={handleClick} className={className}>
			{children}
		</button>
	)
}
