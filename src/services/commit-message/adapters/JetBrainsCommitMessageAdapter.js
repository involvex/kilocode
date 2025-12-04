import { CommitMessageOrchestrator } from "../CommitMessageOrchestrator"
export class JetBrainsCommitMessageAdapter {
	messageGenerator
	orchestrator
	constructor(messageGenerator) {
		this.messageGenerator = messageGenerator
		this.orchestrator = new CommitMessageOrchestrator()
	}
	async generateCommitMessage(request) {
		const integration = {
			// JetBrains doesn't need progress reporting or messages - handled externally
			// Just need to handle the final result
			handleResult: async (result) => {
				// JetBrains handles the result externally - no UI integration needed here
				// The result is returned to the calling Kotlin code
			},
		}
		return this.orchestrator.generateCommitMessage(request, integration, this.messageGenerator)
	}
	dispose() {
		// No resources to dispose for JetBrains adapter
	}
}
//# sourceMappingURL=JetBrainsCommitMessageAdapter.js.map
