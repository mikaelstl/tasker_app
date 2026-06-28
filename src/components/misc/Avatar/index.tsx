import { Container, Image } from "./style.ts";
import Palette from "@/assets/palette.ts";
import { User } from "@/components/icons";

interface AvatarProps {
  image: string;
  size: 'small' | 'medium' | 'large';
  online?: boolean;
}

export function Avatar(props: AvatarProps) {
  return (
    <Container className={`tskr-avatar ${props.size}`}>
      { props.image !== "" ? <Image src={props.image}/> : <User color={Palette.items}/>}
    </Container>
  )
}