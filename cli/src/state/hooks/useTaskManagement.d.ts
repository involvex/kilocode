/**
 * Hook for managing tasks and todos
 * Provides access to current task, todos, and task actions
 */
import type { HistoryItem, TodoItem } from "../../types/messages.js"
/**
 * Todo filter function type
 */
export type TodoFilter = (todo: TodoItem) => boolean
/**
 * Return type for useTaskManagement hook
 */
export interface UseTaskManagementReturn {
	/** The current task (null if no active task) */
	currentTask: HistoryItem | null
	/** All todos for the current task */
	todos: TodoItem[]
	/** Whether there is an active task */
	hasActiveTask: boolean
	/** Count of pending todos */
	pendingCount: number
	/** Count of completed todos */
	completedCount: number
	/** Count of in-progress todos */
	inProgressCount: number
	/** Total count of todos */
	totalCount: number
	/** Get todos by status */
	getTodosByStatus: (status: "pending" | "in_progress" | "completed") => TodoItem[]
	/** Filter todos with a custom function */
	filterTodos: (filter: TodoFilter) => TodoItem[]
	/** Get the next pending todo */
	getNextPendingTodo: () => TodoItem | null
	/** Get the current in-progress todo */
	getCurrentTodo: () => TodoItem | null
	/** Calculate completion percentage */
	completionPercentage: number
}
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
export declare function useTaskManagement(): UseTaskManagementReturn
//# sourceMappingURL=useTaskManagement.d.ts.map
