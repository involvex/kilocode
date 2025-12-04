import { useCallback, useEffect, useRef, useState } from "react"
export function useEventSource({ url, withCredentials, onMessage }) {
	const sourceRef = useRef(null)
	const statusRef = useRef("waiting")
	const [status, setStatus] = useState("waiting")
	const reconnectTimeoutRef = useRef(null)
	const isUnmountedRef = useRef(false)
	const handleMessage = useCallback((event) => onMessage(event), [onMessage])
	const cleanup = useCallback(() => {
		if (reconnectTimeoutRef.current) {
			clearTimeout(reconnectTimeoutRef.current)
			reconnectTimeoutRef.current = null
		}
		if (sourceRef.current) {
			sourceRef.current.close()
			sourceRef.current = null
		}
	}, [])
	const createEventSource = useCallback(() => {
		if (isUnmountedRef.current) {
			return
		}
		cleanup()
		statusRef.current = "waiting"
		setStatus("waiting")
		sourceRef.current = new EventSource(url, { withCredentials })
		sourceRef.current.onopen = () => {
			if (isUnmountedRef.current) {
				return
			}
			statusRef.current = "connected"
			setStatus("connected")
		}
		sourceRef.current.onmessage = (event) => {
			if (isUnmountedRef.current) {
				return
			}
			handleMessage(event)
		}
		sourceRef.current.onerror = () => {
			if (isUnmountedRef.current) {
				return
			}
			statusRef.current = "error"
			setStatus("error")
			// Clean up current connection.
			cleanup()
			// Attempt to reconnect after a delay.
			reconnectTimeoutRef.current = setTimeout(() => {
				if (!isUnmountedRef.current) {
					createEventSource()
				}
			}, 1000)
		}
	}, [url, withCredentials, handleMessage, cleanup])
	useEffect(() => {
		isUnmountedRef.current = false
		createEventSource()
		// Initial connection timeout.
		const initialTimeout = setTimeout(() => {
			if (statusRef.current === "waiting" && !isUnmountedRef.current) {
				createEventSource()
			}
		}, 5000)
		return () => {
			isUnmountedRef.current = true
			clearTimeout(initialTimeout)
			cleanup()
		}
	}, [createEventSource, cleanup])
	return status
}
