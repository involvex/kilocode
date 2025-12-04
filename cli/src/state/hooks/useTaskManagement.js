/**
 * Hook for managing tasks and todos
 * Provides access to current task, todos, and task actions
 */
import { useAtomValue } from "jotai"
import { useMemo } from "react"
import {
	currentTaskAtom,
	taskTodosAtom,
	hasActiveTaskAtom,
	pendingTodosCountAtom,
	completedTodosCountAtom,
	inProgressTodosCountAtom,
} from "../atoms/extension.js"
/**
 * Hook for managing tasks and todos
 *
 * Provides access to the current task and its associated todos with filtering
 * and status tracking utilities. Task state is automatically synchronized with
 * the extension.
 *
 * @example
 * ```tsx
 * function TaskPanel() {
 *   const {
 *     currentTask,
 *     todos,
 *     hasActiveTask,
 *     completionPercentage,
 *     getTodosByStatus
 *   } = useTaskManagement()
 *
 *   if (!hasActiveTask) {
 *     return <div>No active task</div>
 *   }
 *
 *   const pendingTodos = getTodosByStatus('pending')
 *
 *   return (
 *     <div>
 *       <h2>{currentTask.task}</h2>
 *       <progress value={completionPercentage} max={100} />
 *       <h3>Pending ({pendingTodos.length})</h3>
 *       {pendingTodos.map(todo => (
 *         <div key={todo.id}>{todo.text}</div>
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
export function useTaskManagement() {
	// Read atoms
	const currentTask = useAtomValue(currentTaskAtom)
	const todos = useAtomValue(taskTodosAtom)
	const hasActiveTask = useAtomValue(hasActiveTaskAtom)
	const pendingCount = useAtomValue(pendingTodosCountAtom)
	const completedCount = useAtomValue(completedTodosCountAtom)
	const inProgressCount = useAtomValue(inProgressTodosCountAtom)
	// Memoized filter functions
	const getTodosByStatus = useMemo(
		() => (status) => {
			return todos.filter((todo) => todo.status === status)
		},
		[todos],
	)
	const filterTodos = useMemo(
		() => (filter) => {
			return todos.filter(filter)
		},
		[todos],
	)
	const getNextPendingTodo = useMemo(
		() => () => {
			const pending = todos.filter((todo) => todo.status === "pending")
			return pending.length > 0 ? (pending[0] ?? null) : null
		},
		[todos],
	)
	const getCurrentTodo = useMemo(
		() => () => {
			const inProgress = todos.filter((todo) => todo.status === "in_progress")
			return inProgress.length > 0 ? (inProgress[0] ?? null) : null
		},
		[todos],
	)
	// Memoized counts and calculations
	const totalCount = useMemo(() => todos.length, [todos])
	const completionPercentage = useMemo(() => {
		if (totalCount === 0) return 0
		return Math.round((completedCount / totalCount) * 100)
	}, [completedCount, totalCount])
	// Memoize return value
	return useMemo(
		() => ({
			currentTask,
			todos,
			hasActiveTask,
			pendingCount,
			completedCount,
			inProgressCount,
			totalCount,
			getTodosByStatus,
			filterTodos,
			getNextPendingTodo,
			getCurrentTodo,
			completionPercentage,
		}),
		[
			currentTask,
			todos,
			hasActiveTask,
			pendingCount,
			completedCount,
			inProgressCount,
			totalCount,
			getTodosByStatus,
			filterTodos,
			getNextPendingTodo,
			getCurrentTodo,
			completionPercentage,
		],
	)
}
