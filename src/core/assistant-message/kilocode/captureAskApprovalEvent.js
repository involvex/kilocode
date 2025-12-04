import { TelemetryEventName } from "@roo-code/types"
import { TelemetryService } from "@roo-code/telemetry"
export function captureAskApproval(tool, isApproved) {
	TelemetryService.instance.captureEvent(TelemetryEventName.ASK_APPROVAL, { tool, isApproved })
}
//# sourceMappingURL=captureAskApprovalEvent.js.map
