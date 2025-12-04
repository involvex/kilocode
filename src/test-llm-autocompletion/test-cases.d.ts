export declare const CURSOR_MARKER = "<<<AUTOCOMPLETE_HERE>>>"
interface CategoryTestCase {
	name: string
	input: string
	description: string
}
export interface TestCase extends CategoryTestCase {
	category: string
}
export interface Category {
	name: string
	testCases: CategoryTestCase[]
}
export declare const categories: Category[]
export declare const testCases: TestCase[]
export declare function getTestCasesByCategory(categoryName: string): TestCase[]
export declare function getCategories(): string[]
export {}
//# sourceMappingURL=test-cases.d.ts.map
