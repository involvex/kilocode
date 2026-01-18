/**
 * /statusLine command - Configure custom status line
 */

import type { Command, CommandContext } from "./core/types.js"
import openConfigFile from "../config/openConfig.js"

export const statusLineCommand: Command = {
	name: "statusLine",
	aliases: ["sl", "status"],
	description: "Configure custom status line",
	usage: "/statusLine",
	examples: ["/statusLine"],
	category: "settings",
	handler: async (context: CommandContext) => {
		const { addMessage } = context

		addMessage({
			id: Date.now().toString(),
			type: "system",
			content:
				"To configure a custom status line, please add a `statusLine` object to your settings.json file. Opening configuration now...",
			ts: Date.now(),
		})

		try {
			await openConfigFile()
		} catch (_error) {
			addMessage({
				id: Date.now().toString(),
				type: "error",
				content: "Failed to open configuration file.",
				ts: Date.now(),
			})
		}
	},
}
