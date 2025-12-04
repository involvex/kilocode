import { z } from "zod"
import { kiloLanguages } from "./kilocode/kiloLanguages.js"
/**
 * CodeAction
 */
export const kiloCodeActionIds = ["addToContextAndFocus"] // kilocode_change
export const codeActionIds = [
	...kiloCodeActionIds, // kilocode_change
	"explainCode",
	"fixCode",
	"improveCode",
	"addToContext",
	"newTask",
]
/**
 * TerminalAction
 */
export const terminalActionIds = ["terminalAddToContext", "terminalFixCommand", "terminalExplainCommand"]
/**
 * Command
 */
export const commandIds = [
	"activationCompleted",
	"plusButtonClicked",
	"promptsButtonClicked",
	"mcpButtonClicked",
	"historyButtonClicked",
	"marketplaceButtonClicked",
	"popoutButtonClicked",
	"cloudButtonClicked",
	"settingsButtonClicked",
	"openInNewTab",
	"showHumanRelayDialog",
	"registerHumanRelayCallback",
	"unregisterHumanRelayCallback",
	"handleHumanRelayResponse",
	"newTask",
	"setCustomStoragePath",
	"importSettings",
	// "focusInput", // kilocode_change
	"acceptInput",
	"profileButtonClicked", // kilocode_change
	"helpButtonClicked", // kilocode_change
	"focusChatInput", // kilocode_change
	"importSettings", // kilocode_change
	"exportSettings", // kilocode_change
	"generateTerminalCommand", // kilocode_change
	"handleExternalUri", // kilocode_change - for JetBrains plugin URL forwarding
	"focusPanel",
	"toggleAutoApprove",
]
/**
 * Language
 */
export const languages = [
	...kiloLanguages,
	"ca",
	"de",
	"en",
	"es",
	"fr",
	"hi",
	"id",
	"it",
	"ja",
	"ko",
	"nl",
	"pl",
	"pt-BR",
	"ru",
	"tr",
	"vi",
	"zh-CN",
	"zh-TW",
]
export const languagesSchema = z.enum(languages)
export const isLanguage = (value) => languages.includes(value)
