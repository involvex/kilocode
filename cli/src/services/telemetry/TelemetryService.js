/**
 * Telemetry Service
 * Singleton service that manages telemetry lifecycle and provides high-level tracking methods
 */
import { TelemetryClient } from "./TelemetryClient.js"
import { getIdentityManager } from "./identity.js"
import { TelemetryEvent } from "./events.js"
import { logs } from "../logs.js"
import { KILOCODE_POSTHOG_API_KEY } from "../../constants/telemetry.js"
/**
 * Telemetry Service
 * Provides a high-level API for tracking telemetry events throughout the CLI
 */
export class TelemetryService {
	static instance = null
	client = null
	isInitialized = false
	sessionStartTime = 0
	currentMode = "code"
	currentCIMode = false
	currentWorkspace = ""
	constructor() {
		// Private constructor for singleton
	}
	/**
	 * Get singleton instance
	 */
	static getInstance() {
		if (!TelemetryService.instance) {
			TelemetryService.instance = new TelemetryService()
		}
		return TelemetryService.instance
	}
	/**
	 * Initialize telemetry service
	 */
	async initialize(config, options) {
		if (this.isInitialized) {
			logs.warn("Telemetry service already initialized", "TelemetryService")
			return
		}
		try {
			// Store session info
			this.sessionStartTime = Date.now()
			this.currentMode = options.mode
			this.currentCIMode = options.ciMode
			this.currentWorkspace = options.workspace
			// Check if telemetry is enabled
			if (!config.telemetry) {
				logs.info("Telemetry is disabled in config", "TelemetryService")
				this.isInitialized = true
				return
			}
			// Get API key from environment
			const apiKey = KILOCODE_POSTHOG_API_KEY
			if (!apiKey) {
				logs.warn("KILOCODE_POSTHOG_API_KEY not set, telemetry disabled", "TelemetryService")
				this.isInitialized = true
				return
			}
			// Initialize identity
			const identityManager = getIdentityManager()
			const identity = await identityManager.initialize()
			// Update Kilocode user ID if token is available
			const provider = config.providers.find((p) => p.id === config.provider)
			if (provider && provider.kilocodeToken && typeof provider.kilocodeToken === "string") {
				await identityManager.updateKilocodeUserId(provider.kilocodeToken)
			}
			// Create telemetry client
			const telemetryConfig = {
				enabled: true,
				apiKey,
				host: "https://us.i.posthog.com",
				debug: process.env.KILO_TELEMETRY_DEBUG === "true",
			}
			this.client = new TelemetryClient(telemetryConfig)
			this.client.setIdentity(identity)
			this.isInitialized = true
			// Track session start
			this.trackSessionStart(options)
			logs.info("Telemetry service initialized", "TelemetryService")
		} catch (error) {
			logs.error("Failed to initialize telemetry service", "TelemetryService", { error })
			this.isInitialized = true // Mark as initialized even on error to prevent retries
		}
	}
	/**
	 * Shutdown telemetry service
	 */
	async shutdown() {
		if (!this.isInitialized || !this.client) {
			return
		}
		try {
			// Track session end
			this.trackSessionEnd()
			// Send final performance metrics
			this.client.sendPerformanceMetrics()
			// Shutdown client
			await this.client.shutdown()
			logs.info("Telemetry service shut down", "TelemetryService")
		} catch (error) {
			logs.error("Error shutting down telemetry service", "TelemetryService", { error })
		}
	}
	/**
	 * Update mode
	 */
	setMode(mode) {
		this.currentMode = mode
	}
	/**
	 * Update CI mode
	 */
	setCIMode(ciMode) {
		this.currentCIMode = ciMode
	}
	/**
	 * Update Kilocode user ID
	 */
	async updateKilocodeUserId(kilocodeToken) {
		if (this.client) {
			await this.client.updateKilocodeUserId(kilocodeToken)
		}
	}
	/**
	 * Clear Kilocode user ID
	 */
	clearKilocodeUserId() {
		if (this.client) {
			this.client.clearKilocodeUserId()
		}
	}
	// ============================================================================
	// Session Tracking
	// ============================================================================
	trackSessionStart(options) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.SESSION_STARTED, {
			mode: options.mode,
			ciMode: options.ciMode,
			initialMode: options.mode,
			initialWorkspace: this.anonymizeWorkspace(options.workspace),
			hasPrompt: false, // Will be updated by CLI
			hasTimeout: false,
		})
	}
	trackSessionEnd() {
		if (!this.client) return
		const sessionDuration = Date.now() - this.sessionStartTime
		this.client.capture(TelemetryEvent.SESSION_ENDED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			sessionDuration,
		})
	}
	// ============================================================================
	// Command Tracking
	// ============================================================================
	trackCommandExecuted(commandType, args, executionTime, success) {
		if (!this.client) return
		this.client.trackCommand(commandType, executionTime, success)
		this.client.capture(TelemetryEvent.COMMAND_EXECUTED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			commandType,
			commandArgs: args,
			executionTime,
			success,
		})
	}
	trackCommandFailed(commandType, errorMessage) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.COMMAND_FAILED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			commandType,
			errorMessage,
		})
	}
	// ============================================================================
	// Message Tracking
	// ============================================================================
	trackUserMessageSent(messageLength, hasImages, isFollowup, taskId) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.USER_MESSAGE_SENT, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			messageLength,
			hasImages,
			imageCount: hasImages ? 1 : 0,
			isFollowup,
			taskId,
		})
	}
	trackAssistantMessageReceived(messageLength, taskId) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.ASSISTANT_MESSAGE_RECEIVED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			messageLength,
			isFollowup: false,
			hasImages: false,
			taskId,
		})
	}
	// ============================================================================
	// Task Tracking
	// ============================================================================
	trackTaskCreated(taskId) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.TASK_CREATED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			taskId,
		})
	}
	trackTaskCompleted(taskId, duration, stats) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.TASK_COMPLETED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			taskId,
			taskDuration: duration,
			...stats,
		})
	}
	trackTaskFailed(taskId, errorMessage) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.TASK_FAILED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			taskId,
			errorMessage,
		})
	}
	trackTaskCancelled(taskId) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.TASK_CANCELLED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			taskId,
		})
	}
	// ============================================================================
	// Configuration Tracking
	// ============================================================================
	trackConfigLoaded(config) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.CONFIG_LOADED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			configVersion: config.version,
			providerCount: config.providers.length,
			selectedProvider: config.provider,
			telemetryEnabled: config.telemetry,
			autoApprovalEnabled: config.autoApproval?.enabled ?? false,
		})
	}
	trackConfigSaved(config) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.CONFIG_SAVED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			configVersion: config.version,
			providerCount: config.providers.length,
			selectedProvider: config.provider,
			telemetryEnabled: config.telemetry,
			autoApprovalEnabled: config.autoApproval?.enabled ?? false,
		})
	}
	trackProviderChanged(previousProvider, newProvider, newModel) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.PROVIDER_CHANGED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			previousProvider,
			newProvider,
			newModel,
		})
	}
	trackModeChanged(previousMode, newMode) {
		if (!this.client) return
		this.currentMode = newMode
		this.client.capture(TelemetryEvent.MODE_CHANGED, {
			mode: newMode,
			ciMode: this.currentCIMode,
			previousMode,
		})
	}
	trackThemeChanged(previousTheme, newTheme) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.THEME_CHANGED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			previousTheme,
			newTheme,
		})
	}
	// ============================================================================
	// Tool Tracking
	// ============================================================================
	trackToolExecuted(toolName, executionTime, success, metadata) {
		if (!this.client) return
		this.client.trackToolExecution(toolName, executionTime, success)
		this.client.capture(TelemetryEvent.TOOL_EXECUTED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			toolName,
			toolCategory: this.getToolCategory(toolName),
			executionTime,
			success,
			...metadata,
		})
	}
	// ============================================================================
	// Approval Tracking
	// ============================================================================
	trackApprovalRequested(approvalType, toolName) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.APPROVAL_REQUESTED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			approvalType,
			toolName,
			autoApproved: false,
			autoRejected: false,
		})
	}
	trackApprovalAutoApproved(approvalType, toolName, responseTime) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.APPROVAL_AUTO_APPROVED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			approvalType,
			toolName,
			autoApproved: true,
			autoRejected: false,
			responseTime,
		})
	}
	trackApprovalAutoRejected(approvalType, toolName) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.APPROVAL_AUTO_REJECTED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			approvalType,
			toolName,
			autoApproved: false,
			autoRejected: true,
		})
	}
	trackApprovalManualApproved(approvalType, toolName, responseTime) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.APPROVAL_MANUAL_APPROVED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			approvalType,
			toolName,
			autoApproved: false,
			autoRejected: false,
			responseTime,
		})
	}
	trackApprovalManualRejected(approvalType, toolName, responseTime) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.APPROVAL_MANUAL_REJECTED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			approvalType,
			toolName,
			autoApproved: false,
			autoRejected: false,
			responseTime,
		})
	}
	// ============================================================================
	// Error Tracking
	// ============================================================================
	trackError(errorType, errorMessage, errorStack, isFatal = false) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.ERROR_OCCURRED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			errorType,
			errorMessage,
			errorStack,
			isFatal,
		})
	}
	trackException(error, context, isFatal = false) {
		if (!this.client) return
		this.client.captureException(error, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			errorContext: context,
			isFatal,
		})
	}
	// ============================================================================
	// Performance Tracking
	// ============================================================================
	trackApiRequest(provider, model, responseTime, tokens) {
		if (!this.client) return
		this.client.trackApiRequest(provider, model, responseTime, tokens)
	}
	sendPerformanceMetrics() {
		if (!this.client) return
		this.client.sendPerformanceMetrics()
	}
	// ============================================================================
	// Extension Communication Tracking
	// ============================================================================
	trackExtensionInitialized(success) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.EXTENSION_INITIALIZED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			success,
		})
	}
	trackExtensionMessageSent(messageType) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.EXTENSION_MESSAGE_SENT, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			messageType,
			direction: "sent",
			success: true,
		})
	}
	trackExtensionMessageReceived(messageType) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.EXTENSION_MESSAGE_RECEIVED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			messageType,
			direction: "received",
			success: true,
		})
	}
	// ============================================================================
	// CI Mode Tracking
	// ============================================================================
	trackCIModeStarted(promptLength, timeoutSeconds) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.CI_MODE_STARTED, {
			mode: this.currentMode,
			ciMode: true,
			promptLength,
			timeoutSeconds,
		})
	}
	trackCIModeCompleted(stats) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.CI_MODE_COMPLETED, {
			mode: this.currentMode,
			ciMode: true,
			...stats,
		})
	}
	trackCIModeTimeout() {
		if (!this.client) return
		this.client.capture(TelemetryEvent.CI_MODE_TIMEOUT, {
			mode: this.currentMode,
			ciMode: true,
		})
	}
	// ============================================================================
	// Parallel Mode Tracking
	// ============================================================================
	parallelModeStart = 0
	trackParallelModeStarted(isExistingBranch, promptLength, timeoutSeconds) {
		if (!this.client) return
		this.parallelModeStart = Date.now()
		this.client.capture(TelemetryEvent.PARALLEL_MODE_STARTED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			isExistingBranch,
			promptLength,
			timeoutSeconds,
		})
	}
	trackParallelModeCompleted() {
		if (!this.client) return
		const duration = Date.now() - this.parallelModeStart
		this.client.capture(TelemetryEvent.PARALLEL_MODE_COMPLETED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			duration,
		})
	}
	trackParallelModeErrored(errorMessage) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.PARALLEL_MODE_ERRORED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			errorMessage,
		})
	}
	// ============================================================================
	// MCP Tracking
	// ============================================================================
	trackMCPToolUsed(serverName, toolName, executionTime, success, errorMessage) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.MCP_TOOL_USED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			serverName,
			toolName,
			executionTime,
			success,
			errorMessage,
		})
	}
	trackMCPResourceAccessed(serverName, resourceUri, executionTime, success, errorMessage) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.MCP_RESOURCE_ACCESSED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			serverName,
			resourceUri,
			executionTime,
			success,
			errorMessage,
		})
	}
	// ============================================================================
	// Authentication Tracking
	// ============================================================================
	trackAuthTokenUpdated(success) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.AUTH_TOKEN_UPDATED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			authMethod: "kilocode_token",
			success,
		})
	}
	trackAuthFailed(errorMessage) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.AUTH_FAILED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			authMethod: "kilocode_token",
			success: false,
			errorMessage,
		})
	}
	// ============================================================================
	// Feature Usage Tracking
	// ============================================================================
	trackFeatureUsed(featureName, usageCount, firstUsed) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.FEATURE_USED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			featureName,
			usageCount,
			firstUsed,
		})
	}
	// ============================================================================
	// Workflow Pattern Tracking
	// ============================================================================
	trackWorkflowPattern(patternType, commandSequence, frequency, duration) {
		if (!this.client) return
		this.client.capture(TelemetryEvent.WORKFLOW_PATTERN_DETECTED, {
			mode: this.currentMode,
			ciMode: this.currentCIMode,
			patternType,
			commandSequence,
			frequency,
			duration,
		})
	}
	// ============================================================================
	// Helper Methods
	// ============================================================================
	anonymizeWorkspace(workspace) {
		// Return a hash of the workspace path for privacy
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const crypto = require("crypto")
		return crypto.createHash("sha256").update(workspace).digest("hex").substring(0, 16)
	}
	getToolCategory(toolName) {
		const readTools = ["readFile", "listFiles", "searchFiles", "listCodeDefinitionNames"]
		const writeTools = ["editedExistingFile", "appliedDiff", "newFileCreated", "insertContent", "searchAndReplace"]
		const browserTools = ["browser_action"]
		const mcpTools = ["use_mcp_tool", "access_mcp_resource"]
		if (readTools.includes(toolName)) return "read"
		if (writeTools.includes(toolName)) return "write"
		if (browserTools.includes(toolName)) return "browser"
		if (mcpTools.includes(toolName)) return "mcp"
		return "other"
	}
	/**
	 * Check if telemetry is enabled
	 */
	isEnabled() {
		return this.client?.isEnabled() ?? false
	}
}
/**
 * Get the singleton telemetry service instance
 */
export function getTelemetryService() {
	return TelemetryService.getInstance()
}
