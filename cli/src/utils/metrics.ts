import { cpuUsage, memoryUsage } from "node:process"
import os from "node:os"

export interface SystemMetrics {
	cpu: number
	memory: number
}

/**
 * Calculates CPU usage percentage over a time interval.
 * This measures the CPU usage of the current process.
 */
export function calculateProcessCpuUsage(
	lastUsage: NodeJS.CpuUsage,
	lastTime: number,
): { cpu: number; nextUsage: NodeJS.CpuUsage; nextTime: number } {
	const currentUsage = cpuUsage(lastUsage)
	const currentTime = Date.now()
	const deltaMs = currentTime - lastTime

	if (deltaMs === 0) {
		return { cpu: 0, nextUsage: cpuUsage(), nextTime: currentTime }
	}

	const totalUsageMicros = currentUsage.user + currentUsage.system
	const cpuPercent = Math.round((totalUsageMicros / (deltaMs * 1000)) * 100)

	return {
		cpu: Math.min(100, Math.max(0, cpuPercent)),
		nextUsage: cpuUsage(),
		nextTime: currentTime,
	}
}

/**
 * Calculates system-wide CPU usage percentage.
 * This compares idle time vs total time across all cores.
 */
export function calculateSystemCpuUsage(lastCpus: os.CpuInfo[]): { cpu: number; nextCpus: os.CpuInfo[] } {
	const currentCpus = os.cpus()

	let totalIdle = 0
	let totalTick = 0

	for (let i = 0; i < currentCpus.length; i++) {
		const start = lastCpus[i]
		const end = currentCpus[i]

		if (!start || !end) continue

		const idle = end.times.idle - start.times.idle
		let total = 0
		for (const type in end.times) {
			total += end.times[type as keyof typeof end.times] - start.times[type as keyof typeof end.times]
		}

		totalIdle += idle
		totalTick += total
	}

	if (totalTick === 0) {
		return { cpu: 0, nextCpus: currentCpus }
	}

	const cpuPercent = Math.round(((totalTick - totalIdle) / totalTick) * 100)

	return {
		cpu: Math.min(100, Math.max(0, cpuPercent)),
		nextCpus: currentCpus,
	}
}

/**
 * Calculates heap utilization percentage.
 */
export function calculateMemoryUsage(): number {
	const mem = memoryUsage()
	if (mem.heapTotal === 0) return 0
	return Math.round((mem.heapUsed / mem.heapTotal) * 100)
}
