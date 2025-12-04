import { ICommitMessageAdapter } from "./ICommitMessageAdapter"
import { CommitMessageRequest, CommitMessageResult } from "../types/core"
import { CommitMessageGenerator } from "../CommitMessageGenerator"
export declare class JetBrainsCommitMessageAdapter implements ICommitMessageAdapter {
	private messageGenerator
	private orchestrator
	constructor(messageGenerator: CommitMessageGenerator)
	generateCommitMessage(request: CommitMessageRequest): Promise<CommitMessageResult>
	dispose(): void
}
//# sourceMappingURL=JetBrainsCommitMessageAdapter.d.ts.map
