import { SVGProps } from "react"
type LogoProps = Omit<SVGProps<SVGSVGElement>, "xmlns" | "viewBox" | "onClick">
export declare const Logo: ({ width, height, fill, className, ...props }: LogoProps) => import("react").JSX.Element
export declare const HoppingLogo: (
	props: LogoProps,
) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>
export {}
//# sourceMappingURL=logo.d.ts.map
