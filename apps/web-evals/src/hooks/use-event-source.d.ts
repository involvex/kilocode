export type EventSourceStatus = "waiting" | "connected" | "error"
export type EventSourceEvent = Event & {
	data: string
}
type UseEventSourceOptions = {
	url: string
	withCredentials?: boolean
	onMessage: (event: MessageEvent) => void
}
export declare function useEventSource({ url, withCredentials, onMessage }: UseEventSourceOptions): EventSourceStatus
export {}
//# sourceMappingURL=use-event-source.d.ts.map
