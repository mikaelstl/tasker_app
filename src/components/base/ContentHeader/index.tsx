import { SectionTitle } from "../SectionTitle";
import { Actions, Container } from "./style";

interface HeaderProps {
  title: string
  children?: React.ReactNode
}

export function ContentHeader({
  title,
  children
}: HeaderProps) {
  return (
    <Container className="tskr-content-header">
      <SectionTitle>{title}</SectionTitle>
      <Actions>
        {children}
      </Actions>
    </Container>
  )
}