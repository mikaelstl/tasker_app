import { CircleAlert, ShieldAlert, ShieldCheck } from "@/components/icons";
import Palette from "../../assets/palette";

export const ProjectHealthIcon = {
  'SAFE': <ShieldCheck color={Palette.green}/>,
  'WARNING': <CircleAlert color={Palette.yellow}/>,
  'CRITICAL': <ShieldAlert color={Palette.red}/>,
}