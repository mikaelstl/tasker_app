import { SectionTitle } from "../SectionTitle";
import { Actions, Container } from "./style";

interface HeaderProps {
  title: string;
  titleId?: string;
  children?: React.ReactNode
}

export function ContentHeader({
  title,
  titleId,
  children
}: HeaderProps) {
  return (
    <Container className="tskr-content-header">
      <SectionTitle id={titleId}>{title}</SectionTitle>
      <Actions>
        {children}
      </Actions>
    </Container>
  )
}
