import { CommitMessageRequest, CommitMessageResult } from "./types/core"
import { GitChange } from "./GitExtensionService"
import { CommitMessageGenerator } from "./CommitMessageGenerator"
import { ICommitMessageIntegration } from "./adapters/ICommitMessageIntegration"
export interface ChangeResolution {
	changes: GitChange[]
	files: string[]
	usedStaged: boolean
}
/**
 * Orchestrates the generic commit message generation workflow.
 * Coordinates between Git operations, change resolution, and IDE integration.
 */
export declare class CommitMessageOrchestrator {
	/**
	 * Generate a commit message using the generic workflow with IDE-specific integration.
	 */
	generateCommitMessage(
		request: CommitMessageRequest,
		integration: ICommitMessageIntegration,
		messageGenerator: CommitMessageGenerator,
	): Promise<CommitMessageResult>
	/**
	 * Resolve which changes should be included in the commit message generation.
	 * Handles file discovery, filtering, and matching strategies.
	 */
	private resolveCommitChanges
}
//# sourceMappingURL=CommitMessageOrchestrator.d.ts.map
