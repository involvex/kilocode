import { type TelemetryEvent } from "@roo-code/types"
import { BaseTelemetryClient } from "./BaseTelemetryClient"
/**
 * PostHogTelemetryClient handles telemetry event tracking for the Roo Code extension.
 * Uses PostHog analytics to track user interactions and system events.
 * Respects user privacy settings and VSCode's global telemetry configuration.
 */
export declare class PostHogTelemetryClient extends BaseTelemetryClient {
	private client
	private distinctId
	private readonly gitPropertyNames
	constructor(debug?: boolean)
	/**
	 * Filter out git repository properties for PostHog telemetry
	 * @param propertyName The property name to check
	 * @returns Whether the property should be included in telemetry events
	 */
	protected isPropertyCapturable(propertyName: string): boolean
	capture(event: TelemetryEvent): Promise<void>
	/**
	 * Updates the telemetry state based on user preferences and VSCode settings.
	 * Only enables telemetry if both VSCode global telemetry is enabled and
	 * user has opted in.
	 * @param didUserOptIn Whether the user has explicitly opted into telemetry
	 */
	updateTelemetryState(didUserOptIn: boolean): void
	shutdown(): Promise<void>
	captureException(error: Error, properties?: Record<string | number, unknown>): Promise<void>
	private counter
	private kilocodeToken
	updateIdentity(kilocodeToken: string): Promise<void>
}
//# sourceMappingURL=PostHogTelemetryClient.d.ts.map
