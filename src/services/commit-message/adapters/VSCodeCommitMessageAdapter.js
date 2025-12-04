// kilocode_change - new file
import * as vscode from "vscode"
import { VSCodeMessageTypeMap } from "../types/vscode"
import { t } from "../../../i18n"
import { CommitMessageOrchestrator } from "../CommitMessageOrchestrator"
export class VSCodeCommitMessageAdapter {
	messageGenerator
	targetRepository = null
	orchestrator
	constructor(messageGenerator) {
		this.messageGenerator = messageGenerator
		this.orchestrator = new CommitMessageOrchestrator()
	}
	async generateCommitMessage(request) {
		try {
			const targetRepository = await this.determineTargetRepository(request.workspacePath)
			if (!targetRepository?.rootUri) {
				throw new Error("Could not determine Git repository")
			}
			this.targetRepository = targetRepository
			return await vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.SourceControl,
					title: t("kilocode:commitMessage.generating"),
					cancellable: false,
				},
				async (progress) => {
					const integration = {
						reportProgress: (percentage, message) => {
							progress.report({
								increment: Math.max(0, percentage - progress._lastPercentage || 0),
								message: message || t("kilocode:commitMessage.generating"),
							})
							progress._lastPercentage = percentage
						},
						showMessage: async (message, type) => {
							const methodName = VSCodeMessageTypeMap[type]
							const method = vscode.window[methodName]
							await method(message)
						},
						handleResult: async (result) => {
							if (result.message && this.targetRepository) {
								this.targetRepository.inputBox.value = result.message
							}
							if (result.error) {
								const methodName = VSCodeMessageTypeMap["error"]
								const method = vscode.window[methodName]
								await method(
									t("kilocode:commitMessage.generationFailed", { errorMessage: result.error }),
								)
							}
						},
					}
					return this.orchestrator.generateCommitMessage(request, integration, this.messageGenerator)
				},
			)
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
			return { message: "", error: errorMessage }
		}
	}
	async determineTargetRepository(workspacePath) {
		try {
			const gitExtension = vscode.extensions.getExtension("vscode.git")
			if (!gitExtension) {
				return null
			}
			if (!gitExtension.isActive) {
				try {
					await gitExtension.activate()
				} catch (activationError) {
					return null
				}
			}
			const gitApi = gitExtension.exports.getAPI(1)
			if (!gitApi) {
				return null
			}
			for (const repo of gitApi.repositories ?? []) {
				if (repo.rootUri && workspacePath.startsWith(repo.rootUri.fsPath)) {
					return repo
				}
			}
			return gitApi.repositories[0] ?? null
		} catch (error) {
			return null
		}
	}
	dispose() {
		this.targetRepository = null
	}
}
//# sourceMappingURL=VSCodeCommitMessageAdapter.js.map
