import React, { useState } from "react"
import { Trans } from "react-i18next"
import styles from "./McpView.module.css"
import {
	VSCodeButton,
	VSCodeCheckbox,
	VSCodeLink,
	VSCodePanels,
	VSCodePanelTab,
	VSCodePanelView,
} from "@vscode/webview-ui-toolkit/react"

import { McpServer } from "@roo/mcp"

import { vscode } from "@src/utils/vscode"
import { useExtensionState } from "@src/context/ExtensionStateContext"
import { useAppTranslation } from "@src/i18n/TranslationContext"
import { cn } from "@/lib/utils"
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	ToggleSwitch,
} from "@src/components/ui"
import { buildDocLink } from "@src/utils/docLinks"

import { Tab, TabContent, TabHeader } from "../common/Tab"

import McpToolRow from "./McpToolRow"
import McpResourceRow from "./McpResourceRow"
import { McpErrorRow } from "./McpErrorRow"

type McpViewProps = {
	onDone: () => void
	hideHeader?: boolean
}

const McpView = ({ onDone, hideHeader = false }: McpViewProps) => {
	const {
		mcpServers: servers,
		alwaysAllowMcp,
		mcpEnabled,
		enableMcpServerCreation,
		setEnableMcpServerCreation,
	} = useExtensionState()

	const { t } = useAppTranslation()

	return (
		<Tab className={styles.relative}>
			<TabHeader
				className={cn(styles.flex, styles.justifyBetween, styles.itemsCenter)}
				style={{ display: hideHeader ? "none" : "flex" }}>
				<h3 className={styles.textVscodeForeground}>{t("mcp:title")}</h3>
				<Button onClick={onDone}>{t("mcp:done")}</Button>
			</TabHeader>

			<TabContent>
				<div className={styles.descriptionContainer}>
					<Trans i18nKey="mcp:description">
						<VSCodeLink
							href={buildDocLink("features/mcp/using-mcp-in-kilo-code", "mcp_settings")}
							style={{ display: "inline" }}>
							Learn More
						</VSCodeLink>
					</Trans>
				</div>

				{mcpEnabled && (
					<>
						<div className={styles.serverCreationContainer}>
							<VSCodeCheckbox
								checked={enableMcpServerCreation}
								onChange={(e: any) => {
									setEnableMcpServerCreation(e.target.checked)
									vscode.postMessage({ type: "enableMcpServerCreation", bool: e.target.checked })
								}}>
								<span className={styles.serverCreationTitle}>
									{t("mcp:enableServerCreation.title")}
								</span>
							</VSCodeCheckbox>
							<div className={styles.serverCreationDescription}>
								<Trans i18nKey="mcp:enableServerCreation.description">
									<VSCodeLink
										href={buildDocLink(
											"features/mcp/using-mcp-in-kilo-code#how-to-use-kilo-code-to-create-an-mcp-server",
											"mcp_server_creation",
										)}
										style={{ display: "inline" }}>
										Learn about server creation
									</VSCodeLink>
									<strong>new</strong>
								</Trans>
								<p className={styles.serverCreationHint}>{t("mcp:enableServerCreation.hint")}</p>
							</div>
						</div>

						{servers.length > 0 && (
							<div className={styles.serverListContainer}>
								{servers.map((server) => (
									<ServerRow
										key={`${server.name}-${server.source || "global"}`}
										server={server}
										alwaysAllowMcp={alwaysAllowMcp}
									/>
								))}
							</div>
						)}

						<div className={styles.editSettingsButtonsContainer}>
							<Button
								variant="secondary"
								className={styles.editSettingsButton}
								onClick={() => {
									vscode.postMessage({ type: "openMcpSettings" })
								}}>
								<span className="codicon codicon-edit" style={{ marginRight: "6px" }}></span>
								{t("mcp:editGlobalMCP")}
							</Button>
							<Button
								variant="secondary"
								className={styles.editSettingsButton}
								onClick={() => {
									vscode.postMessage({ type: "openProjectMcpSettings" })
								}}>
								<span className="codicon codicon-edit" style={{ marginRight: "6px" }}></span>
								{t("mcp:editProjectMCP")}
							</Button>
							<Button
								variant="secondary"
								className={styles.editSettingsButton}
								onClick={() => {
									vscode.postMessage({ type: "refreshAllMcpServers" })
								}}>
								<span className="codicon codicon-refresh" style={{ marginRight: "6px" }}></span>
								{t("mcp:refreshMCP")}
							</Button>
						</div>

						<div className={styles.marketplaceInfoContainer}>
							You can find the MCP Marketplace under Settings MCP Servers Marketplace
						</div>

						<div className={styles.learnMoreContainer}>
							<VSCodeLink
								href={buildDocLink(
									"features/mcp/using-mcp-in-kilo-code#editing-mcp-settings-files",
									"mcp_edit_settings",
								)}
								style={{ display: "inline" }}>
								{t("mcp:learnMoreEditingSettings")}
							</VSCodeLink>
						</div>
					</>
				)}
			</TabContent>
		</Tab>
	)
}

const ServerRow = ({ server, alwaysAllowMcp }: { server: McpServer; alwaysAllowMcp?: boolean }) => {
	const { t } = useAppTranslation()
	const [isExpanded, setIsExpanded] = useState(false)
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
	const [timeoutValue, setTimeoutValue] = useState(() => {
		const configTimeout = JSON.parse(server.config)?.timeout
		return configTimeout ?? 60 // Default 1 minute (60 seconds)
	})

	const isExpandable = server.status === "connected" && !server.disabled

	const timeoutOptions = [
		{ value: 15, label: t("mcp:networkTimeout.options.15seconds") },
		{ value: 30, label: t("mcp:networkTimeout.options.30seconds") },
		{ value: 60, label: t("mcp:networkTimeout.options.1minute") },
		{ value: 300, label: t("mcp:networkTimeout.options.5minutes") },
		{ value: 600, label: t("mcp:networkTimeout.options.10minutes") },
		{ value: 900, label: t("mcp:networkTimeout.options.15minutes") },
		{ value: 1800, label: t("mcp:networkTimeout.options.30minutes") },
		{ value: 3600, label: t("mcp:networkTimeout.options.60minutes") },
	]

	const getStatusColor = () => {
		if (server.disabled) {
			return "var(--vscode-descriptionForeground)"
		}

		switch (server.status) {
			case "connected":
				return "var(--vscode-testing-iconPassed)"
			case "connecting":
				return "var(--vscode-charts-yellow)"
			case "disconnected":
				return "var(--vscode-testing-iconFailed)"
		}
	}

	const handleRowClick = () => {
		if (isExpandable) {
			setIsExpanded(!isExpanded)
		}
	}

	const handleRestart = () => {
		vscode.postMessage({
			type: "restartMcpServer",
			text: server.name,
			source: server.source || "global",
		})
	}

	const handleTimeoutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const seconds = parseInt(event.target.value)
		setTimeoutValue(seconds)
		vscode.postMessage({
			type: "updateMcpTimeout",
			serverName: server.name,
			source: server.source || "global",
			timeout: seconds,
		})
	}

	const handleDelete = () => {
		vscode.postMessage({
			type: "deleteMcpServer",
			serverName: server.name,
			source: server.source || "global",
		})
		setShowDeleteConfirm(false)
	}

	return (
		<div className={styles.serverRowContainer}>
			<div className={cn(styles.serverRow, styles.flex, styles.itemsCenter)} onClick={handleRowClick}>
				{isExpandable && (
					<span
						className={`codicon codicon-chevron-${isExpanded ? "down" : "right"}`}
						style={{ marginRight: "8px" }}
					/>
				)}
				<span className={styles.serverName}>{server.name}</span>
				{server.source && (
					<span
						className={styles.serverSource}
						style={{
							marginLeft: "8px",
							padding: "1px 6px",
							fontSize: "11px",
							borderRadius: "4px",
							background: "var(--vscode-badge-background)",
							color: "var(--vscode-badge-foreground)",
						}}>
						{server.source}
					</span>
				)}
				<div className={styles.serverActions} onClick={(e) => e.stopPropagation()}>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setShowDeleteConfirm(true)}
						style={{ marginRight: "8px" }}>
						<span className="codicon codicon-trash" style={{ fontSize: "14px" }}></span>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={handleRestart}
						disabled={server.status === "connecting"}
						style={{ marginRight: "8px" }}>
						<span className="codicon codicon-refresh" style={{ fontSize: "14px" }}></span>
					</Button>
				</div>
				<div
					className={styles.serverStatus}
					style={{
						width: "8px",
						height: "8px",
						borderRadius: "50%",
						background: getStatusColor(),
						marginLeft: "8px",
					}}
				/>
				<div className={styles.serverToggle}>
					<ToggleSwitch
						checked={!server.disabled}
						onChange={() => {
							vscode.postMessage({
								type: "toggleMcpServer",
								serverName: server.name,
								source: server.source || "global",
								disabled: !server.disabled,
							})
						}}
						size="medium"
						aria-label={`Toggle ${server.name} server`}
					/>
				</div>
			</div>

			{isExpandable
				? isExpanded && (
						<div className={styles.serverExpandedContainer}>
							<VSCodePanels>
								<VSCodePanelTab id="tools">
									{t("mcp:tabs.tools")} ({server.tools?.length || 0})
								</VSCodePanelTab>
								<VSCodePanelTab id="resources">
									{t("mcp:tabs.resources")} (
									{[...(server.resourceTemplates || []), ...(server.resources || [])].length || 0})
								</VSCodePanelTab>
								{server.instructions && (
									<VSCodePanelTab id="instructions">{t("mcp:instructions")}</VSCodePanelTab>
								)}
								<VSCodePanelTab id="logs">
									{t("mcp:tabs.logs")} ({server.errorHistory?.length || 0})
								</VSCodePanelTab>

								<VSCodePanelView>
									{server.tools && server.tools.length > 0 ? (
										<div className={styles.toolsContainer}>
											{server.tools.map((tool) => (
												<McpToolRow
													key={`${tool.name}-${server.name}-${server.source || "global"}`}
													tool={tool}
													serverName={server.name}
													serverSource={server.source || "global"}
													alwaysAllowMcp={alwaysAllowMcp}
												/>
											))}
										</div>
									) : (
										<div className={styles.emptyState}>{t("mcp:emptyState.noTools")}</div>
									)}
								</VSCodePanelView>

								<VSCodePanelView>
									{(server.resources && server.resources.length > 0) ||
									(server.resourceTemplates && server.resourceTemplates.length > 0) ? (
										<div className={styles.resourcesContainer}>
											{[...(server.resourceTemplates || []), ...(server.resources || [])].map(
												(item) => (
													<McpResourceRow
														key={"uriTemplate" in item ? item.uriTemplate : item.uri}
														item={item}
													/>
												),
											)}
										</div>
									) : (
										<div className={styles.emptyState}>{t("mcp:emptyState.noResources")}</div>
									)}
								</VSCodePanelView>

								{server.instructions && (
									<VSCodePanelView>
										<div className={styles.instructionsContainer}>
											<div className="opacity-80 whitespace-pre-wrap break-words">
												{server.instructions}
											</div>
										</div>
									</VSCodePanelView>
								)}

								<VSCodePanelView>
									{server.errorHistory && server.errorHistory.length > 0 ? (
										<div className={styles.logsContainer}>
											{server.errorHistory.map((error, index) => (
												<McpErrorRow key={index} error={error} />
											))}
										</div>
									) : (
										<div className={styles.emptyState}>{t("mcp:emptyState.noLogs")}</div>
									)}
								</VSCodePanelView>
							</VSCodePanels>

							{/* Network Timeout */}
							<div style={{ padding: "10px 7px" }}>
								<div className={styles.timeoutContainer}>
									<label htmlFor="network-timeout">{t("mcp:networkTimeout.label")}</label>
									<select
										id="network-timeout"
										value={timeoutValue}
										onChange={handleTimeoutChange}
										className={styles.timeoutSelect}
										aria-label={t("mcp:networkTimeout.ariaLabel")}>
										{timeoutOptions.map((option) => (
											<option key={option.value} value={option.value} title="Option">
												{option.label}
											</option>
										))}
									</select>
									<span
										style={{
											fontSize: "12px",
											color: "var(--vscode-descriptionForeground)",
											display: "block",
										}}>
										{t("mcp:networkTimeout.description")}
									</span>
								</div>
							</div>
						</div>
					)
				: // Only show error UI for non-disabled servers
					!server.disabled && (
						<div
							style={{
								fontSize: "13px",
								background: "var(--vscode-textCodeBlock-background)",
								borderRadius: "0 0 4px 4px",
								width: "100%",
							}}>
							<div
								style={{
									color: "var(--vscode-testing-iconFailed)",
									marginBottom: "8px",
									padding: "0 10px",
									overflowWrap: "break-word",
									wordBreak: "break-word",
								}}>
								{server.error &&
									server.error.split("\n").map((item, index) => (
										<React.Fragment key={index}>
											{index > 0 && <br />}
											{item}
										</React.Fragment>
									))}
							</div>
							<div style={{ width: "calc(100% - 20px)", margin: "0 10px 10px 10px" }}>
								<VSCodeButton
									appearance="secondary"
									onClick={handleRestart}
									disabled={server.status === "connecting"}>
									{server.status === "connecting"
										? t("mcp:serverStatus.retrying")
										: t("mcp:serverStatus.retryConnection")}
								</VSCodeButton>
							</div>
						</div>
					)}

			{/* Delete Confirmation Dialog */}
			<Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t("mcp:deleteDialog.title")}</DialogTitle>
						<DialogDescription>
							{t("mcp:deleteDialog.description", { serverName: server.name })}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
							{t("mcp:deleteDialog.cancel")}
						</Button>
						<Button variant="default" onClick={handleDelete}>
							{t("mcp:deleteDialog.delete")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default McpView
