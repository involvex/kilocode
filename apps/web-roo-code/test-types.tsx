// Test script to verify TypeScript compilation
import { Button } from "./src/components/ui/button"
import { Table } from "./src/components/ui/table"
import { DialogHeader } from "./src/components/ui/modal"

// Test that components accept style props without TypeScript errors
const TestComponent = () => {
	return (
		<div>
			<Button style={{ color: "red" }}>Test Button</Button>
			<Table style={{ marginTop: "10px" }}>
				<tbody>
					<tr>
						<td>Test</td>
					</tr>
				</tbody>
			</Table>
			<DialogHeader style={{ padding: "20px" }}>Test Header</DialogHeader>
		</div>
	)
}

export default TestComponent
