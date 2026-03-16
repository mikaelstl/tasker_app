import { UserIcon } from "@heroicons/react/16/solid";
import { Container, Image } from "./style.ts";
import Palette from "../../../assets/palette.ts";

interface AvatarProps {
  image: string;
  size: 'small' | 'medium' | 'large';
  online?: boolean;
}

export function Avatar(props: AvatarProps) {
  return (
    <Container className={`tskr-avatar ${props.size}`}>
      { props.image !== "" ? <Image src={props.image}/> : <UserIcon fill={Palette.items}/>}
    </Container>
  )
}