import React from "react"
import { Box, Text, useInput } from "ink"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { useTheme } from "../../state/hooks/useTheme.js"
import {
	configMenuItemsAtom,
	configMenuLevelAtom,
	configMenuCategoryAtom,
	handleConfigMenuSelectAtom,
} from "../../state/atoms/configMenu.js"
import { selectedIndexAtom, inputModeAtom } from "../../state/atoms/ui.js"
import { ConfigMenuItem } from "../../state/atoms/configMenu.js"

export const ConfigMenu: React.FC = () => {
	const theme = useTheme()
	const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom)
	const items = useAtomValue(configMenuItemsAtom)
	const level = useAtomValue(configMenuLevelAtom)
	const category = useAtomValue(configMenuCategoryAtom)
	const handleSelect = useSetAtom(handleConfigMenuSelectAtom)
	const setInputMode = useSetAtom(inputModeAtom)

	useInput((input, key) => {
		if (key.upArrow) {
			setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))
		} else if (key.downArrow) {
			setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))
		} else if (key.return) {
			handleSelect()
		} else if (key.escape) {
			if (level === "items") {
				// Go back to categories
				handleSelect() // type: "back" logic is handled in the atom
			} else {
				setInputMode("normal")
			}
		}
	})

	const title = level === "categories" ? "Configuration" : `${category}`
	const borderColor = theme.ui.border.active

	return (
		<Box flexDirection="column" borderStyle="round" borderColor={borderColor} paddingX={1} marginY={1}>
			<Box marginBottom={1} borderStyle="single" borderBottom borderColor={theme.ui.border.default}>
				<Text bold color={theme.semantic.info}>
					{title}
				</Text>
			</Box>
			{items.map((item, index) => (
				<ConfigMenuRow key={`${item.label}-${index}`} item={item} isSelected={index === selectedIndex} />
			))}
			<Box marginTop={1}>
				<Text dimColor color={theme.ui.text.dimmed}>
					↑↓ to navigate • Enter to select • Esc to go back/exit
				</Text>
			</Box>
		</Box>
	)
}

interface ConfigMenuRowProps {
	item: ConfigMenuItem
	isSelected: boolean
}

const ConfigMenuRow: React.FC<ConfigMenuRowProps> = ({ item, isSelected }) => {
	const theme = useTheme()

	return (
		<Box>
			<Text color={isSelected ? theme.semantic.success : theme.ui.text.primary} bold={isSelected}>
				{isSelected ? "> " : "  "}
			</Text>
			<Box flexGrow={1}>
				<Text color={isSelected ? theme.semantic.success : theme.ui.text.primary} bold={isSelected}>
					{item.label}
				</Text>
			</Box>
			{item.description && (
				<Box marginLeft={2}>
					<Text color={isSelected ? theme.ui.text.primary : theme.ui.text.dimmed}>{item.description}</Text>
				</Box>
			)}
			{item.type === "category" && (
				<Box marginLeft={1}>
					<Text color={theme.ui.text.dimmed}>→</Text>
				</Box>
			)}
		</Box>
	)
}
