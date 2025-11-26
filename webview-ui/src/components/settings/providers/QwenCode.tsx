import React from "react"
import { VSCodeTextField, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { type ProviderSettings } from "@roo-code/types"

interface QwenCodeProps {
	apiConfiguration: ProviderSettings
	setApiConfigurationField: (field: keyof ProviderSettings, value: ProviderSettings[keyof ProviderSettings]) => void
}

export const QwenCode: React.FC<QwenCodeProps> = ({ apiConfiguration, setApiConfigurationField }) => {
	const defaultPath = "~/.qwen/oauth_creds.json"

	const handleInputChange = (e: { target: { value: string } }) => {
		setApiConfigurationField("qwenCodeOauthPath", e.target.value)
	}

	return (
		<div className="flex flex-col gap-4">
			<div>
				<label className="block font-medium mb-1">OAuth Credentials Path</label>
				<div
					className="w-full mt-1"
					onBlur={(e) => {
						// Handle blur: if field is empty, set to default
						const input = e.currentTarget.querySelector("input")
						if (input && (!input.value || input.value.trim() === "")) {
							setApiConfigurationField("qwenCodeOauthPath", defaultPath)
						}
					}}>
					<VSCodeTextField
						value={apiConfiguration?.qwenCodeOauthPath || ""}
						type="text"
						onInput={handleInputChange}
						placeholder={defaultPath}
					/>
				</div>

				<p className="text-xs mt-1 text-vscode-descriptionForeground">
					Path to your Qwen OAuth credentials file. Defaults to ~/.qwen/oauth_creds.json if left empty.
				</p>

				<div className="text-xs text-vscode-descriptionForeground mt-3">
					Qwen Code is an OAuth-based API that requires authentication through the official Qwen client.
					You&apos;ll need to set up OAuth credentials first.
				</div>

				<div className="text-xs text-vscode-descriptionForeground mt-2">
					To get started:
					<br />
					1. Install the official Qwen client
					<br />
					2. Authenticate using your account
					<br />
					3. OAuth credentials will be stored automatically
				</div>

				<VSCodeLink
					href="https://github.com/QwenLM/qwen-code/blob/main/README.md"
					className="text-vscode-textLink-foreground mt-2 inline-block text-xs">
					Setup Instructions
				</VSCodeLink>
			</div>
		</div>
	)
}
