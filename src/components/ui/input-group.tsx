import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const inputGroupVariants = cva(
  "group/input-group flex w-full items-stretch overflow-hidden rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
  {
    variants: {
      align: {
        start: "flex-row-reverse",
        end: "flex-row",
      },
    },
    defaultVariants: {
      align: "end",
    },
  }
)

function InputGroup({
  className,
  align,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupVariants>) {
  return (
    <div
      data-slot="input-group"
      data-align={align}
      className={cn(inputGroupVariants({ align }), className)}
      {...props}
    />
  )
}

function InputGroupAddon({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupVariants> & {
    align?: "start" | "end"
  }) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "flex shrink-0 items-center justify-center bg-input/30 px-3 text-muted-foreground",
        align === "start" ? "border-r border-input" : "border-l border-input",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-input"
      className={cn(
        "h-8 min-w-0 flex-1 rounded-none border-0 bg-transparent px-2.5 shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export { InputGroup, InputGroupAddon, InputGroupInput }
