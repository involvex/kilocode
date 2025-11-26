// kilocode_change - provider added

import { useCallback } from "react"
import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react"

import { useAppTranslation } from "@src/i18n/TranslationContext"
import { VSCodeButtonLink } from "@src/components/common/VSCodeButtonLink"

import { inputEventTransform } from "../transforms"

import { type ProviderSettings, type OrganizationAllowList, syntheticDefaultModelId } from "@roo-code/types"
import type { RouterModels } from "@roo/api"
import { ModelPicker } from "../ModelPicker"

type SyntheticProps = {
	apiConfiguration: ProviderSettings
	setApiConfigurationField: (field: keyof ProviderSettings, value: ProviderSettings[keyof ProviderSettings]) => void
	routerModels?: RouterModels
	organizationAllowList: OrganizationAllowList
	modelValidationError?: string
}

export const Synthetic = ({
	apiConfiguration,
	setApiConfigurationField,
	routerModels,
	organizationAllowList,
	modelValidationError,
}: SyntheticProps) => {
	const { t } = useAppTranslation()

	const _handleInputChange = useCallback(
		<K extends keyof ProviderSettings, E>(
			field: K,
			transform: (event: E) => ProviderSettings[K] = inputEventTransform,
		) =>
			(event: E | Event) => {
				setApiConfigurationField(field, transform(event as E))
			},
		[setApiConfigurationField],
	)

	const onInputSyntheticApiKey = useCallback(
		(e: { target: { value: string } }) => {
			setApiConfigurationField("syntheticApiKey", e.target.value)
		},
		[setApiConfigurationField],
	)

	return (
		<>
			<VSCodeTextField
				value={apiConfiguration?.syntheticApiKey || ""}
				type="password"
				onInput={onInputSyntheticApiKey}
				placeholder={t("settings:placeholders.apiKey")}
			/>
			<div className="text-sm text-vscode-descriptionForeground -mt-2">
				{t("settings:providers.apiKeyStorageNotice")}
			</div>
			{!apiConfiguration?.syntheticApiKey && (
				<VSCodeButtonLink href="https://synthetic.new/" appearance="secondary">
					{t("settings:providers.getSyntheticApiKey")}
				</VSCodeButtonLink>
			)}
			{
				<>
					<ModelPicker
						apiConfiguration={apiConfiguration}
						setApiConfigurationField={setApiConfigurationField}
						defaultModelId={syntheticDefaultModelId}
						models={routerModels?.synthetic ?? {}}
						modelIdKey="apiModelId"
						serviceName="Synthetic"
						serviceUrl="https://synthetic.new/"
						organizationAllowList={organizationAllowList}
						errorMessage={modelValidationError}
					/>
				</>
			}
		</>
	)
}
