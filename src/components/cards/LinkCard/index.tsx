import { Link2, X } from "@/components/icons"
import { Close, Container, Leading, Link } from "./style";


interface LinkCardProps {
  link: string,
  remove: () => void
}

export function LinkCard({
  link,
  remove
}: LinkCardProps) {
  return (
    <Container className="tskr-link-card">
      <Leading>
        <Link2 />
        <Link href={link}>{link}</Link>
      </Leading>
      <Close onClick={remove}><X/></Close>
    </Container>
  )
}