import { cn } from "@/lib/utils"

interface ScreenProps extends React.ComponentProps<"div"> {}

export const Screen = ({
  className,
  ...props
}: ScreenProps) => {
  return (
    <div
      className={cn("tskr-application-screen w-dvw h-dvh", className)} {...props}
    />
  )
}