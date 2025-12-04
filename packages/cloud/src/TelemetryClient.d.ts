import {
	type TelemetryClient,
	type TelemetryEvent,
	type ClineMessage,
	type AuthService,
	type SettingsService,
	TelemetryEventName,
	TelemetryPropertiesProvider,
	TelemetryEventSubscription,
} from "@roo-code/types"
import type { RetryQueue } from "./retry-queue/index.js"
declare abstract class BaseTelemetryClient implements TelemetryClient {
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
	abstract captureException(error: Error, properties?: Record<string | number, unknown>): void
	abstract updateIdentity(kilocodeToken: string): Promise<void>
	isTelemetryEnabled(): boolean
	abstract shutdown(): Promise<void>
}
export declare class CloudTelemetryClient extends BaseTelemetryClient {
	private authService
	private settingsService
	private retryQueue
	constructor(authService: AuthService, settingsService: SettingsService, retryQueue?: RetryQueue)
	private fetch
	capture(event: TelemetryEvent): Promise<void>
	backfillMessages(messages: ClineMessage[], taskId: string): Promise<void>
	updateTelemetryState(_didUserOptIn: boolean): void
	isTelemetryEnabled(): boolean
	protected isEventCapturable(eventName: TelemetryEventName): boolean
	captureException(error: Error, properties?: Record<string | number, unknown>): void
	updateIdentity(kilocodeToken: string): Promise<void>
	shutdown(): Promise<void>
}
export {}
//# sourceMappingURL=TelemetryClient.d.ts.map
