// kilocode_change: Fast Apply - global settings version
import { useAppTranslation } from "@/i18n/TranslationContext"
import { SetCachedStateField } from "./types"

export const FastApplySettings = ({
	morphApiKey,
	fastApplyModel,
	fastApplyApiProvider,
	setCachedStateField,
}: {
	morphApiKey?: string
	fastApplyModel?: string
	fastApplyApiProvider?: string
	setCachedStateField: SetCachedStateField<"morphApiKey" | "fastApplyModel" | "fastApplyApiProvider">
}) => {
	const { t } = useAppTranslation()
	return (
		<div className="flex flex-col gap-2">
			<div>
				<label className="text-xs text-vscode-descriptionForeground mb-1 block">
					{t("settings:experimental.MORPH_FAST_APPLY.apiProvider")}
				</label>
				<select
					value={fastApplyApiProvider || "current"}
					onChange={(e) => setCachedStateField("fastApplyApiProvider", e.target.value || "current")}>
					<option value="kilocode">Kilo Code</option>
					<option value="openrouter">OpenRouter</option>
					<option value="morph">Morph</option>
					<option value="current">
						{t("settings:experimental.MORPH_FAST_APPLY.apiProviderList.current")}
					</option>
				</select>
			</div>
			<div>
				<label className="text-xs text-vscode-descriptionForeground mb-1 block">
					{t("settings:experimental.MORPH_FAST_APPLY.modelLabel")}
				</label>
				<select
					value={fastApplyModel || "auto"}
					onChange={(e) => setCachedStateField("fastApplyModel", e.target.value || "auto")}>
					<option value="auto">{t("settings:experimental.MORPH_FAST_APPLY.models.auto")}</option>
					<option value="morph/morph-v3-fast">
						{t("settings:experimental.MORPH_FAST_APPLY.models.morphFast")}
					</option>
					<option value="morph/morph-v3-large">
						{t("settings:experimental.MORPH_FAST_APPLY.models.morphLarge")}
					</option>
					<option value="relace/relace-apply-3">
						{t("settings:experimental.MORPH_FAST_APPLY.models.relace")}
					</option>
				</select>
				<p className="text-xs text-vscode-descriptionForeground mt-1">
					{t("settings:experimental.MORPH_FAST_APPLY.modelDescription")}
				</p>
			</div>

			{fastApplyApiProvider !== "current" && (
				<input
					type="password"
					value={morphApiKey || ""}
					placeholder={t("settings:experimental.MORPH_FAST_APPLY.placeholder")}
					onInput={(e) => setCachedStateField("morphApiKey", (e.target as any)?.value || "")}
					className="w-full">
					{t("settings:experimental.MORPH_FAST_APPLY.apiKey")}
				</input>
			)}
		</div>
	)
}
