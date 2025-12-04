import { IDE, RangeInFileWithContents } from "../.."
import { PrecalculatedLruCache } from "../../util/LruCache"
interface FileInfo {
	imports: {
		[key: string]: RangeInFileWithContents[]
	}
}
export declare class ImportDefinitionsService {
	private readonly ide
	static N: number
	cache: PrecalculatedLruCache<FileInfo>
	constructor(ide: IDE)
	get(filepath: string): FileInfo | undefined
	private _getFileInfo
}
export {}
//# sourceMappingURL=ImportDefinitionsService.d.ts.map
