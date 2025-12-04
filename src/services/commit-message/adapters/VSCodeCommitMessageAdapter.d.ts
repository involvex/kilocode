import { ICommitMessageAdapter } from "./ICommitMessageAdapter"
import { CommitMessageRequest, CommitMessageResult } from "../types/core"
import { CommitMessageGenerator } from "../CommitMessageGenerator"
export declare class VSCodeCommitMessageAdapter implements ICommitMessageAdapter {
	private messageGenerator
	private targetRepository
	private orchestrator
	constructor(messageGenerator: CommitMessageGenerator)
	generateCommitMessage(request: CommitMessageRequest): Promise<CommitMessageResult>
	private determineTargetRepository
	dispose(): void
}
//# sourceMappingURL=VSCodeCommitMessageAdapter.d.ts.map
