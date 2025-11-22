import React from "react"
import styles from "./toggle-switch.module.css"

export interface ToggleSwitchProps {
	checked: boolean
	onChange: () => void
	disabled?: boolean
	size?: "small" | "medium"
	"aria-label"?: string
	"data-testid"?: string
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
	checked,
	onChange,
	disabled = false,
	size = "small",
	"aria-label": ariaLabel,
	"data-testid": dataTestId,
}) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault()
			if (!disabled) {
				onChange()
			}
		}
	}

	const containerClasses = [
		styles.container,
		styles[`container${size.charAt(0).toUpperCase() + size.slice(1)}${checked ? "Checked" : "Unchecked"}`],
		disabled && styles[`container${size.charAt(0).toUpperCase() + size.slice(1)}Disabled`],
		disabled ? "cursor-not-allowed" : "cursor-pointer",
	]
		.filter(Boolean)
		.join(" ")

	const dotClasses = [
		styles.dot,
		styles[`dot${size.charAt(0).toUpperCase() + size.slice(1)}`],
		styles[`dot${size.charAt(0).toUpperCase() + size.slice(1)}${checked ? "Checked" : "Unchecked"}`],
	].join(" ")

	const ariaProps = {
		role: "switch" as const,
		"aria-checked": checked ? ("true" as const) : ("false" as const),
		"aria-label": ariaLabel,
		"aria-disabled": disabled ? ("true" as const) : undefined,
		tabIndex: disabled ? -1 : 0,
		"data-testid": dataTestId,
	}

	return (
		<div
			{...ariaProps}
			className={containerClasses}
			onClick={disabled ? undefined : onChange}
			onKeyDown={handleKeyDown}>
			<div className={dotClasses} />
		</div>
	)
}
