export function isWriteToolAction(tool) {
	return ["editedExistingFile", "appliedDiff", "newFileCreated", "insertContent", "generateImage"].includes(tool.tool)
}
export function isReadOnlyToolAction(tool) {
	return [
		"readFile",
		"listFiles",
		"listFilesTopLevel",
		"listFilesRecursive",
		"listCodeDefinitionNames",
		"searchFiles",
		"codebaseSearch",
		"runSlashCommand",
	].includes(tool.tool)
}
//# sourceMappingURL=tools.js.map
