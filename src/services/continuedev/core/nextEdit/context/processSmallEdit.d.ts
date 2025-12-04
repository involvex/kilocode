import { IDE, Position } from "../.."
import { GetLspDefinitionsFunction } from "../../autocomplete/types"
import { MinimalConfigProvider } from "../../autocomplete/MinimalConfig"
import { BeforeAfterDiff } from "./diffFormatting"
export declare const processSmallEdit: (
	beforeAfterdiff: BeforeAfterDiff,
	cursorPosBeforeEdit: Position,
	cursorPosAfterPrevEdit: Position,
	configHandler: MinimalConfigProvider,
	getDefsFromLspFunction: GetLspDefinitionsFunction,
	ide: IDE,
) => Promise<void>
//# sourceMappingURL=processSmallEdit.d.ts.map
