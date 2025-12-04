import { IDE, Position } from "../.."
import { AutocompleteCodeSnippet } from "../../autocomplete/snippets/types"
import { GetLspDefinitionsFunction } from "../../autocomplete/types"
import { MinimalConfigProvider } from "../../autocomplete/MinimalConfig"
import { RecentlyEditedRange } from "../types"
interface ProcessNextEditDataParams {
	filePath: string
	beforeContent: string
	afterContent: string
	cursorPosBeforeEdit: Position
	cursorPosAfterPrevEdit: Position
	ide: IDE
	configHandler: MinimalConfigProvider
	getDefinitionsFromLsp: GetLspDefinitionsFunction
	recentlyEditedRanges: RecentlyEditedRange[]
	recentlyVisitedRanges: AutocompleteCodeSnippet[]
	workspaceDir: string
	modelNameOrInstance?: string | undefined
}
export declare const processNextEditData: ({
	filePath,
	beforeContent,
	afterContent,
	cursorPosBeforeEdit,
	cursorPosAfterPrevEdit,
	ide,
	configHandler,
	getDefinitionsFromLsp,
	recentlyEditedRanges,
	recentlyVisitedRanges,
	workspaceDir,
	modelNameOrInstance: _modelNameOrInstance,
}: ProcessNextEditDataParams) => Promise<void>
export {}
//# sourceMappingURL=processNextEditData.d.ts.map
