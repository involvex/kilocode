#!/usr/bin/env node
import { TestCase } from "./test-cases.js"
interface TestResult {
	testCase: TestCase
	isApproved: boolean
	completion: string
	error?: string
	actualValue?: string
	newOutput?: boolean
	llmRequestDuration?: number
	strategyName?: string
}
export declare class TestRunner {
	private llmClient
	private tester
	private verbose
	private results
	private skipApproval
	private useFim
	constructor(verbose?: boolean, skipApproval?: boolean, useFim?: boolean)
	runTest(testCase: TestCase): Promise<TestResult>
	private isUnknownResult
	runAllTests(): Promise<void>
	private printSummary
	runSingleTest(testName: string): Promise<void>
	cleanApprovals(): Promise<void>
}
export {}
//# sourceMappingURL=runner.d.ts.map
