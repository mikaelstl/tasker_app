import { cn } from "@/lib/utils";
import * as React from "react"

type ScrollerAxis = "horizontal" | "vertical";

type ScrollerVariantType = {
  [k in ScrollerAxis]: string
}

const variant: ScrollerVariantType = {
  horizontal: "w-full flex-row overflow-x-scroll overflow-y-hidden",
  vertical: "h-full flex-col overflow-y-scroll overflow-x-hidden",
} as const;

export interface ScrollerProps extends React.ComponentPropsWithoutRef<"div"> {
  orientation?: ScrollerAxis
}

export const Scroller = React.forwardRef<HTMLDivElement, ScrollerProps>(
  ({ className, orientation = "vertical", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex border", variant[orientation], className)}
        {...props}
      />
    )
  }
)

export default Scroller;
