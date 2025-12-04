import React from "react"
import { Box, Text } from "ink"
import { MarkdownText } from "../../../components/MarkdownText.js"
import { useTheme } from "../../../../state/hooks/useTheme.js"
/**
 * Display browser action results
 */
export const SayBrowserActionResultMessage = ({ message }) => {
	const theme = useTheme()
	return (
		<Box flexDirection="column" marginY={1}>
			<Box>
				<Text color={theme.semantic.info} bold>
					🌐 Browser Action Result
				</Text>
			</Box>

			{message.text && (
				<Box marginLeft={2} marginTop={1}>
					<MarkdownText>{message.text}</MarkdownText>
				</Box>
			)}
		</Box>
	)
}
