import { UserIcon } from "@heroicons/react/16/solid";
import { Container, Image, Indicator } from "./style.ts";
import Palette from "../../../assets/palette.ts";

interface AvatarProps {
  image: string;
  size: 'small' | 'medium' | 'large';
  online?: boolean;
}

export function Avatar(props: AvatarProps) {
  return (
    <Indicator className="task-avatar" online={props.online ?? false}>
      <Container className={`avatar ${props.size}`}>
        { props.image !== "" ? <Image src={props.image}/> : <UserIcon fill={Palette.items}/>}
      </Container>
    </Indicator>
  )
}