import { describe, it, expect, vi } from "vitest"
import { calculateProcessCpuUsage, calculateMemoryUsage } from "./metrics.js"
import { cpuUsage, memoryUsage } from "node:process"

vi.mock("node:process", () => ({
	cpuUsage: vi.fn(),
	memoryUsage: vi.fn(),
}))

describe("metrics utils", () => {
	describe("calculateProcessCpuUsage", () => {
		it("should calculate correct CPU percentage", () => {
			const lastUsage = { user: 1000, system: 500 }
			const lastTime = Date.now() - 1000 // 1 second ago

			// Mock 100ms of CPU time used over 1000ms real time = 10%
			vi.mocked(cpuUsage).mockReturnValue({ user: 80000, system: 20000 })

			const result = calculateProcessCpuUsage(lastUsage, lastTime)
			expect(result.cpu).toBe(10)
		})

		it("should handle zero delta time", () => {
			const lastUsage = { user: 1000, system: 500 }
			const lastTime = Date.now()

			const result = calculateProcessCpuUsage(lastUsage, lastTime)
			expect(result.cpu).toBe(0)
		})
	})

	describe("calculateMemoryUsage", () => {
		it("should calculate correct heap utilization percentage", () => {
			vi.mocked(memoryUsage).mockReturnValue({
				heapUsed: 50,
				heapTotal: 100,
				rss: 200,
				external: 10,
				arrayBuffers: 5,
			})

			expect(calculateMemoryUsage()).toBe(50)
		})

		it("should handle zero total memory", () => {
			vi.mocked(memoryUsage).mockReturnValue({
				heapUsed: 0,
				heapTotal: 0,
				rss: 0,
				external: 0,
				arrayBuffers: 0,
			})

			expect(calculateMemoryUsage()).toBe(0)
		})
	})
})
