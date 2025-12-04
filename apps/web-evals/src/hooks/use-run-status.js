import { useState, useCallback, useRef } from "react"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { RooCodeEventName, taskEventSchema } from "@roo-code/types"
import { getHeartbeat } from "@/actions/heartbeat"
import { getRunners } from "@/actions/runners"
import { getTasks } from "@/actions/tasks"
import { useEventSource } from "@/hooks/use-event-source"
export const useRunStatus = (run) => {
	const [tasksUpdatedAt, setTasksUpdatedAt] = useState()
	const [usageUpdatedAt, setUsageUpdatedAt] = useState()
	const tokenUsage = useRef(new Map())
	const startTimes = useRef(new Map())
	const { data: heartbeat } = useQuery({
		queryKey: ["getHeartbeat", run.id],
		queryFn: () => getHeartbeat(run.id),
		refetchInterval: 10_000,
	})
	const { data: runners } = useQuery({
		queryKey: ["getRunners", run.id],
		queryFn: () => getRunners(run.id),
		refetchInterval: 10_000,
	})
	const { data: tasks } = useQuery({
		queryKey: ["getTasks", run.id, tasksUpdatedAt],
		queryFn: async () => getTasks(run.id),
		placeholderData: keepPreviousData,
		refetchInterval: 30_000,
	})
	const url = `/api/runs/${run.id}/stream`
	const onMessage = useCallback((messageEvent) => {
		let data
		try {
			data = JSON.parse(messageEvent.data)
		} catch (_) {
			console.log(`invalid JSON: ${messageEvent.data}`)
			return
		}
		const result = taskEventSchema.safeParse(data)
		if (!result.success) {
			console.log(`unrecognized messageEvent.data: ${messageEvent.data}`)
			return
		}
		const { eventName, payload, taskId } = result.data
		if (!taskId) {
			console.log(`no taskId: ${messageEvent.data}`)
			return
		}
		switch (eventName) {
			case RooCodeEventName.TaskStarted:
				startTimes.current.set(taskId, Date.now())
				break
			case RooCodeEventName.TaskTokenUsageUpdated: {
				const startTime = startTimes.current.get(taskId)
				const duration = startTime ? Date.now() - startTime : undefined
				tokenUsage.current.set(taskId, { ...payload[1], duration })
				setUsageUpdatedAt(Date.now())
				break
			}
			case RooCodeEventName.EvalPass:
			case RooCodeEventName.EvalFail:
				setTasksUpdatedAt(Date.now())
				break
		}
	}, [])
	const sseStatus = useEventSource({ url, onMessage })
	return {
		sseStatus,
		heartbeat,
		runners,
		tasks,
		tokenUsage: tokenUsage.current,
		usageUpdatedAt,
	}
}
