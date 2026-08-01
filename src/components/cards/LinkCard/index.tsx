import { Link as LinkIcon, CloseCircle as XMarkIcon } from "@/components/icons/solar-icons"
import { Close, Container, Leading, Link } from "./style"

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
        <LinkIcon width={20}/>
        <Link href={link}>{link}</Link>
      </Leading>
      <Close onClick={remove}><XMarkIcon width={20}/></Close>
    </Container>
  )
}
