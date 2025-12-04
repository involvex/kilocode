import React from "react"
import { CliMessageRow } from "./cli/CliMessageRow.js"
import { ExtensionMessageRow } from "./extension/ExtensionMessageRow.js"
export const MessageRow = ({ unifiedMessage }) => {
	if (unifiedMessage.source === "cli") {
		return <CliMessageRow message={unifiedMessage.message} />
	}
	return <ExtensionMessageRow message={unifiedMessage.message} />
}
