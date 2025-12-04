import React from "react"
import ChatRow from "../../../../webview-ui/src/components/chat/ChatRow"
import { ASK_PRESETS, SAY_PRESETS, createMessage } from "../mockData/chatMessages"
export const ChatRowGallery = ({ category, meta }) => {
	// Generate stories from presets
	const presets = category === "ask" ? ASK_PRESETS : SAY_PRESETS
	const stories = Object.keys(presets).map((key) => {
		const presetKey = key
		return {
			name: key,
			story: {
				args: {
					message: createMessage(presetKey),
				},
			},
			meta,
		}
	})
	return (
		<div className="p-5 min-h-screen w-full" style={{ backgroundColor: "var(--vscode-editor-background)" }}>
			<div className="flex flex-wrap gap-4 items-start">
				{stories.map(({ name, story, meta }, index) => {
					const mergedArgs = { ...meta.args, ...story.args }
					if (!mergedArgs.message) return null
					return (
						<div
							key={name}
							className="flex flex-col border rounded overflow-hidden w-[400px] shrink-0"
							style={{
								borderColor: "var(--vscode-panel-border)",
								backgroundColor:
									index % 2 === 0
										? "var(--vscode-editor-background)"
										: "var(--vscode-panel-background)",
							}}>
							<div
								className="px-3 py-2 border-b"
								style={{
									borderBottomColor: "var(--vscode-panel-border)",
									backgroundColor: "var(--vscode-panel-background)",
								}}>
								<span
									className="text-[11px] font-medium font-mono"
									style={{ color: "var(--vscode-foreground)" }}>
									{name}
								</span>
							</div>
							<div className="p-3 w-full box-border">
								<ChatRow {...mergedArgs} />
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
