import * as vscode from "vscode"
export interface VscGenerationRequest {
	inputBox: {
		value: string
	}
	rootUri?: vscode.Uri
}
export declare const VSCodeMessageTypeMap: {
	readonly info: "showInformationMessage"
	readonly error: "showErrorMessage"
	readonly warning: "showWarningMessage"
}
//# sourceMappingURL=vscode.d.ts.map
