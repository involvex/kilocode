import React from "react"
import { Box } from "ink"
import { WelcomeMessage } from "./WelcomeMessage.js"
import { GenericCliMessage } from "./GenericCliMessage.js"
import { EmptyMessage } from "./EmptyMessage.js"
export const CliMessageRow = ({ message }) => {
	switch (message.type) {
		case "empty":
			return <EmptyMessage />
		case "welcome":
			return (
				<Box flexDirection="column" marginBottom={2} marginTop={2}>
					<WelcomeMessage options={message.metadata?.welcomeOptions} />
				</Box>
			)
		default:
			return <GenericCliMessage message={message} />
	}
}
