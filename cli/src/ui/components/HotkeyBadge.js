/**
 * HotkeyBadge - Displays a single keyboard shortcut in a styled badge
 */
import React from "react"
import { Box, Text } from "ink"
import { useTheme } from "../../state/hooks/useTheme.js"
/**
 * Displays a keyboard shortcut badge with styling
 */
export const HotkeyBadge = ({ keys, description, primary = false }) => {
	const theme = useTheme()
	return (
		<Box marginRight={2}>
			<Text color={primary ? theme.ui.text.highlight : theme.ui.text.dimmed}>
				<Text bold color={primary ? theme.semantic.info : theme.ui.text.primary}>
					{keys}
				</Text>{" "}
				{description}
			</Text>
		</Box>
	)
}
