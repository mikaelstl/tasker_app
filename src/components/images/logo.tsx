import { TaskerLogoImage } from "./logo-image";

type LogoProps = React.ComponentProps<"div">;

export function Logo({
  className,
  ...props
}: LogoProps) {
  return (
    <div
      className={`tskr-logo ${className}`}
      {...props}
    >
      <TaskerLogoImage/>
      <p className="tskr-logo-label tracking-widest">ORGANIZE. EXECUTE. COMPLETE</p>
    </div>
  )
}