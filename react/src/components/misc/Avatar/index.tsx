import { Container, Image, Indicator } from "./style.ts";

interface AvatarProps {
  image: string;
  size: 'small' | 'medium' | 'large';
  online: boolean;
}

export function Avatar(props: AvatarProps) {
  return (
    <Indicator online={props.online}>
      <Container className={`avatar ${props.size}`}>
        { props.image !== "" ? <Image src={props.image}/> : <></>}
      </Container>
    </Indicator>
  )
}