/**
 * Telemetry Event Types
 * All events are prefixed with 'cli_' to distinguish from extension telemetry
 */
/**
 * Telemetry event names
 */
export var TelemetryEvent
;(function (TelemetryEvent) {
	// Session Events
	TelemetryEvent["SESSION_STARTED"] = "cli_session_started"
	TelemetryEvent["SESSION_ENDED"] = "cli_session_ended"
	// Command Events
	TelemetryEvent["COMMAND_EXECUTED"] = "cli_command_executed"
	TelemetryEvent["COMMAND_FAILED"] = "cli_command_failed"
	// Message Events
	TelemetryEvent["USER_MESSAGE_SENT"] = "cli_user_message_sent"
	TelemetryEvent["ASSISTANT_MESSAGE_RECEIVED"] = "cli_assistant_message_received"
	// Task Events
	TelemetryEvent["TASK_CREATED"] = "cli_task_created"
	TelemetryEvent["TASK_COMPLETED"] = "cli_task_completed"
	TelemetryEvent["TASK_FAILED"] = "cli_task_failed"
	TelemetryEvent["TASK_CANCELLED"] = "cli_task_cancelled"
	// Configuration Events
	TelemetryEvent["CONFIG_LOADED"] = "cli_config_loaded"
	TelemetryEvent["CONFIG_SAVED"] = "cli_config_saved"
	TelemetryEvent["PROVIDER_CHANGED"] = "cli_provider_changed"
	TelemetryEvent["MODEL_CHANGED"] = "cli_model_changed"
	TelemetryEvent["MODE_CHANGED"] = "cli_mode_changed"
	TelemetryEvent["THEME_CHANGED"] = "cli_theme_changed"
	// Tool Usage Events
	TelemetryEvent["TOOL_EXECUTED"] = "cli_tool_executed"
	TelemetryEvent["TOOL_APPROVED"] = "cli_tool_approved"
	TelemetryEvent["TOOL_REJECTED"] = "cli_tool_rejected"
	// MCP Events
	TelemetryEvent["MCP_TOOL_USED"] = "cli_mcp_tool_used"
	TelemetryEvent["MCP_RESOURCE_ACCESSED"] = "cli_mcp_resource_accessed"
	// Approval Events
	TelemetryEvent["APPROVAL_REQUESTED"] = "cli_approval_requested"
	TelemetryEvent["APPROVAL_AUTO_APPROVED"] = "cli_approval_auto_approved"
	TelemetryEvent["APPROVAL_AUTO_REJECTED"] = "cli_approval_auto_rejected"
	TelemetryEvent["APPROVAL_MANUAL_APPROVED"] = "cli_approval_manual_approved"
	TelemetryEvent["APPROVAL_MANUAL_REJECTED"] = "cli_approval_manual_rejected"
	// CI Mode Events
	TelemetryEvent["CI_MODE_STARTED"] = "cli_ci_mode_started"
	TelemetryEvent["CI_MODE_COMPLETED"] = "cli_ci_mode_completed"
	TelemetryEvent["CI_MODE_TIMEOUT"] = "cli_ci_mode_timeout"
	// Parallel Mode Events
	TelemetryEvent["PARALLEL_MODE_STARTED"] = "cli_parallel_mode_started"
	TelemetryEvent["PARALLEL_MODE_COMPLETED"] = "cli_parallel_mode_completed"
	TelemetryEvent["PARALLEL_MODE_ERRORED"] = "cli_parallel_mode_errored"
	// Error Events
	TelemetryEvent["ERROR_OCCURRED"] = "cli_error_occurred"
	TelemetryEvent["EXCEPTION_CAUGHT"] = "cli_exception_caught"
	// Performance Events
	TelemetryEvent["PERFORMANCE_METRICS"] = "cli_performance_metrics"
	TelemetryEvent["API_REQUEST_COMPLETED"] = "cli_api_request_completed"
	// Extension Communication Events
	TelemetryEvent["EXTENSION_INITIALIZED"] = "cli_extension_initialized"
	TelemetryEvent["EXTENSION_MESSAGE_SENT"] = "cli_extension_message_sent"
	TelemetryEvent["EXTENSION_MESSAGE_RECEIVED"] = "cli_extension_message_received"
	// Authentication Events
	TelemetryEvent["AUTH_TOKEN_UPDATED"] = "cli_auth_token_updated"
	TelemetryEvent["AUTH_FAILED"] = "cli_auth_failed"
	// Workflow Events
	TelemetryEvent["WORKFLOW_PATTERN_DETECTED"] = "cli_workflow_pattern_detected"
	TelemetryEvent["FEATURE_USED"] = "cli_feature_used"
})(TelemetryEvent || (TelemetryEvent = {}))
/**
 * Type guard to check if properties are valid
 */
export function isValidEventProperties(properties) {
	return (
		typeof properties === "object" &&
		properties !== null &&
		typeof properties.cliVersion === "string" &&
		typeof properties.sessionId === "string" &&
		typeof properties.mode === "string" &&
		typeof properties.ciMode === "boolean"
	)
}
