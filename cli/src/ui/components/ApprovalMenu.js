/**
 * ApprovalMenu component - displays approval/rejection options
 * Similar to AutocompleteMenu but for approve/reject actions
 */
import React from "react"
import { Box, Text } from "ink"
import { useTheme } from "../../state/hooks/useTheme.js"
export const ApprovalMenu = ({ options, selectedIndex, visible }) => {
	const theme = useTheme()
	if (!visible || options.length === 0) {
		return null
	}
	return (
		<Box flexDirection="column" borderStyle="round" borderColor={theme.actions.pending} paddingX={1}>
			{options.map((option, index) => (
				<ApprovalOptionRow
					key={option.key || `${option.action}-${index}`}
					option={option}
					isSelected={index === selectedIndex}
				/>
			))}
		</Box>
	)
}
const ApprovalOptionRow = ({ option, isSelected }) => {
	const theme = useTheme()
	// Map option colors to theme colors
	const getThemeColor = (optionColor) => {
		return optionColor === "green" ? theme.actions.approve : theme.actions.reject
	}
	const themeColor = getThemeColor(option.color)
	const color = isSelected ? themeColor : theme.ui.text.primary
	// Use appropriate icon based on action type
	const icon = option.action === "approve" || option.action === "approve-and-remember" ? "✓" : "✗"
	return (
		<Box>
			{isSelected && (
				<Text color={themeColor} bold>
					{">"}{" "}
				</Text>
			)}
			{!isSelected && <Text>{"  "}</Text>}

			<Text color={color} bold={isSelected}>
				{icon} {option.label}
			</Text>

			<Text color={theme.ui.text.dimmed}> ({option.hotkey})</Text>
		</Box>
	)
}
