import React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Mode } from "@roo/modes"
interface WrapperProps {
	value?: Mode
	customModes?: any
	modeShortcutText?: string
	title?: string
	disabled?: boolean
	initiallyOpen?: boolean
}
declare const KiloModeSelectorWrapper: (props: WrapperProps) => React.JSX.Element
declare const meta: Meta<typeof KiloModeSelectorWrapper>
export default meta
type Story = StoryObj<typeof meta>
export declare const Default: Story
export declare const Architect: Story
export declare const Disabled: Story
export declare const Open: Story
//# sourceMappingURL=KiloModeSelector.stories.d.ts.map
