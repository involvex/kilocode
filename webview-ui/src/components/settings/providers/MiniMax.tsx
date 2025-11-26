import { useCallback } from "react"
import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react"

import type { ProviderSettings } from "@roo-code/types"

import { useAppTranslation } from "@src/i18n/TranslationContext"
import { VSCodeButtonLink } from "@src/components/common/VSCodeButtonLink"

import { inputEventTransform } from "../transforms"
import { cn } from "@/lib/utils"

type MiniMaxProps = {
	apiConfiguration: ProviderSettings
	setApiConfigurationField: (field: keyof ProviderSettings, value: ProviderSettings[keyof ProviderSettings]) => void
}

export const MiniMax = ({ apiConfiguration, setApiConfigurationField }: MiniMaxProps) => {
	const { t } = useAppTranslation()

	const handleInputChange = useCallback(
		<K extends keyof ProviderSettings, E>(
			field: K,
			transform: (event: E) => ProviderSettings[K] = inputEventTransform,
		) =>
			(event: E | Event) => {
				setApiConfigurationField(field, transform(event as E))
			},
		[setApiConfigurationField],
	)

	return (
		<>
			<div>
				<label className="block font-medium mb-1">{t("settings:providers.minimaxBaseUrl")}</label>
				<select
					value={apiConfiguration.minimaxBaseUrl}
					onChange={handleInputChange("minimaxBaseUrl")}
					className={cn("w-full")}>
					{/* kilocode_change start: anthropic api */}
					<option value="https://api.minimax.io/anthropic">api.minimax.io</option>
					<option value="https://api.minimaxi.com/anthropic">api.minimaxi.com</option>
					{/* kilocode_change end */}
				</select>
			</div>
			<div>
				<label className="block font-medium mb-1">{t("settings:providers.minimaxApiKey")}</label>
				<VSCodeTextField
					value={apiConfiguration?.minimaxApiKey || ""}
					type="password"
					onInput={handleInputChange("minimaxApiKey")}
					placeholder={t("settings:placeholders.apiKey")}
				/>
				<div className="text-sm text-vscode-descriptionForeground">
					{t("settings:providers.apiKeyStorageNotice")}
				</div>
				{!apiConfiguration?.minimaxApiKey && (
					<VSCodeButtonLink
						href={
							// kilocode_change: anthropic api
							apiConfiguration.minimaxBaseUrl === "https://api.minimaxi.com/anthropic"
								? "https://platform.minimaxi.com/user-center/basic-information/interface-key"
								: "https://www.minimax.io/platform/user-center/basic-information/interface-key"
						}
						appearance="secondary">
						{t("settings:providers.getMiniMaxApiKey")}
					</VSCodeButtonLink>
				)}
			</div>
		</>
	)
}
