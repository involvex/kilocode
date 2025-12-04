import {
	TelemetryEvent,
	TelemetryEventName,
	TelemetryClient,
	TelemetryPropertiesProvider,
	TelemetryEventSubscription,
} from "@roo-code/types"
export declare abstract class BaseTelemetryClient implements TelemetryClient {
	readonly subscription?: TelemetryEventSubscription | undefined
	protected readonly debug: boolean
	protected providerRef: WeakRef<TelemetryPropertiesProvider> | null
	protected telemetryEnabled: boolean
	constructor(subscription?: TelemetryEventSubscription | undefined, debug?: boolean)
	protected isEventCapturable(eventName: TelemetryEventName): boolean
	/**
	 * Determines if a specific property should be included in telemetry events
	 * Override in subclasses to filter specific properties
	 */
	protected isPropertyCapturable(_propertyName: string): boolean
	protected getEventProperties(event: TelemetryEvent): Promise<TelemetryEvent["properties"]>
	abstract capture(event: TelemetryEvent): Promise<void>
	setProvider(provider: TelemetryPropertiesProvider): void
	abstract updateTelemetryState(didUserOptIn: boolean): void
	captureException(_error: Error, _properties?: Record<string | number, unknown>): Promise<void>
	updateIdentity(_kilocodeToken: string): Promise<void>
	isTelemetryEnabled(): boolean
	abstract shutdown(): Promise<void>
}
//# sourceMappingURL=BaseTelemetryClient.d.ts.map
