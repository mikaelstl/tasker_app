import { Container, Image } from "./style"

interface LogoIconProps {
  source: string
}

export function LogoIcon(props: LogoIconProps) {
  return (
    <Container>
      <Image src={props.source}></Image>
    </Container>
  )
}