import React, { useCallback } from "react"
import { ToolUseStyle, toolUseStylesSchema } from "@roo-code/types"
import { useAppTranslation } from "@/i18n/TranslationContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
interface ToolUseControlProps {
	toolStyle?: ToolUseStyle
	onChange: (field: "toolStyle", value?: ToolUseStyle) => void
}

export const ToolUseControl: React.FC<ToolUseControlProps> = ({ toolStyle, onChange }) => {
	const handleToolStyleChange = useCallback(
		(e: any) => {
			const value = toolUseStylesSchema.safeParse(e.target.value).data
			onChange("toolStyle", value)
		},
		[onChange],
	)
	const { t } = useAppTranslation()

	return (
		<div className="flex flex-col gap-1">
			<label className="block font-medium mb-1">{t("settings:kilocode.toolUseStyle.label")}</label>
			<Select
				value={toolStyle?.toString() || ""}
				onValueChange={(value) => handleToolStyleChange({ target: { value } })}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={t("settings:common.select")} />
				</SelectTrigger>
				<SelectContent>
					{/* TODO: Add tool style options once toolUseStylesSchema is properly defined */}
					<SelectItem key={"xml"} value={"xml"}>
						XML
					</SelectItem>
					<SelectItem key={"json"} value={"json"}>
						JSON
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
