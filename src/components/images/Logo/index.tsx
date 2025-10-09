import { Container, Image, Label } from "./style"

interface LogoProps {
  source: string
}

export function Logo(props: LogoProps) {
  return (
    <Container>
      <Image src={props.source}></Image>
      <Label>PROJECT MANAGER</Label>
    </Container>
  )
}