import { HTMLAttributes } from "react"
import { type Keys, type RooCodeSettings } from "@roo-code/types"
export declare const ROO_CODE_SETTINGS_KEYS: Keys<RooCodeSettings>[]
type SettingsDiffProps = HTMLAttributes<HTMLDivElement> & {
	defaultSettings: RooCodeSettings
	customSettings: RooCodeSettings
}
export declare function SettingsDiff({
	customSettings: { experiments: customExperiments, ...customSettings },
	defaultSettings: { experiments: defaultExperiments, ...defaultSettings },
	className,
	...props
}: SettingsDiffProps): import("react").JSX.Element
type SettingDiffProps = HTMLAttributes<HTMLDivElement> & {
	name: string
	defaultValue?: string
	customValue?: string
}
export declare function SettingDiff({
	name,
	defaultValue,
	customValue,
	...props
}: SettingDiffProps): import("react").JSX.Element
export {}
//# sourceMappingURL=settings-diff.d.ts.map
