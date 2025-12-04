import { ProviderSettingsManager } from "../../core/config/ProviderSettingsManager"
import { GenerateMessageParams, PromptOptions } from "./types/core"
/**
 * Pure commit message generation logic without IDE-specific dependencies.
 */
export declare class CommitMessageGenerator {
	private readonly providerSettingsManager
	private previousGitContext
	private previousCommitMessage
	constructor(providerSettingsManager: ProviderSettingsManager)
	generateMessage(params: GenerateMessageParams): Promise<string>
	buildPrompt(gitContext: string, options: PromptOptions): Promise<string>
	private callAIForCommitMessage
	private extractCommitMessage
}
//# sourceMappingURL=CommitMessageGenerator.d.ts.map
