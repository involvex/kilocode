/**
 * /exit command - Exit the CLI
 */
export const exitCommand = {
	name: "exit",
	aliases: ["quit", "q"],
	description: "Exit the CLI - in parallel mode, will commit changes before exiting",
	usage: "/exit",
	examples: ["/exit"],
	category: "system",
	handler: async (context) => {
		const { exit, setCommittingParallelMode, isParallelMode } = context
		// In parallel mode, set the committing state before exit
		if (isParallelMode) {
			setCommittingParallelMode(true)
		}
		exit()
	},
}
