import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { vscode } from "@/utils/vscode"
import { getBasename } from "@/utils/kilocode/path-webview"

const RuleRow: React.FC<{
	rulePath: string
	enabled: boolean
	toggleRule: (rulePath: string, enabled: boolean) => void
}> = ({ rulePath, enabled, toggleRule }) => {
	const handleEditClick = () => {
		vscode.postMessage({
			type: "openFile",
			text: rulePath,
		})
	}

	const handleDeleteClick = () => {
		vscode.postMessage({
			type: "deleteRuleFile",
			rulePath,
		})
	}

	return (
		<div className="mb-2.5">
			<div
				className={`flex items-center p-2 rounded bg-[var(--vscode-textCodeBlock-background)] h-[18px] ${
					enabled ? "opacity-100" : "opacity-60"
				}`}>
				<span
					className="flex-1 overflow-hidden break-all whitespace-normal flex items-center mr-1"
					title={rulePath}>
					<span className="ph-no-capture">{getBasename(rulePath)}</span>
				</span>
				<div className="flex items-center ml-2 space-x-2">
					<div
						role="switch"
						aria-checked={enabled}
						aria-label={`Toggle rule ${getBasename(rulePath)}`}
						tabIndex={0}
						className={`w-[20px] h-[10px] rounded-[5px] relative cursor-pointer transition-colors duration-200 flex items-center ${
							enabled
								? "bg-[var(--vscode-testing-iconPassed)] opacity-90"
								: "bg-[var(--vscode-titleBar-inactiveForeground)] opacity-50"
						}`}
						onClick={() => toggleRule(rulePath, !enabled)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault()
								toggleRule(rulePath, !enabled)
							}
						}}>
						<div
							className={`w-[8px] h-[8px] bg-white border border-[#66666699] rounded-full absolute transition-all duration-200 ${
								enabled ? "left-[11px]" : "left-[1px]"
							}`}
						/>
					</div>
					<VSCodeButton
						appearance="icon"
						aria-label="Edit rule file"
						onClick={handleEditClick}
						className="h-5">
						<span className="codicon codicon-edit text-xs" />
					</VSCodeButton>
					<VSCodeButton
						appearance="icon"
						aria-label="Delete rule file"
						onClick={handleDeleteClick}
						className="h-5">
						<span className="codicon codicon-trash text-xs" />
					</VSCodeButton>
				</div>
			</div>
		</div>
	)
}

export default RuleRow
