import { CircleCheck, CircleDashed, CircleSlash, LoaderCircle } from "lucide-react"
export const TaskStatus = ({ task, running }) => {
	return task.passed === false ? (
		<CircleSlash className="size-4 text-destructive" />
	) : task.passed === true ? (
		<CircleCheck className="size-4 text-green-500" />
	) : running ? (
		<LoaderCircle className="size-4 animate-spin" />
	) : (
		<CircleDashed className="size-4" />
	)
}
