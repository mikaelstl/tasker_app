import { Image } from "./style";
import image from "../../../assets/images/logo.svg";

export function Logo(
  props: {
    width: number
  }
) {
  return (<Image src={image} width={props.width}></Image>)
}