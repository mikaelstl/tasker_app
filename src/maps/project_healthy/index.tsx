import { DangerTriangle as ExclamationTriangleIconSolid, ShieldCheck as ShieldCheckIconSolid, ShieldWarning as ShieldExclamationIcon } from "@/components/icons/solar-icons";
import Palette from "../../assets/palette";

export const ProjectHealthIcon = {
  'SAFE': <ShieldCheckIconSolid fill={Palette.green} width={22}/>,
  'WARNING': <ShieldExclamationIcon fill={Palette.yellow} width={22}/>,
  'CRITICAL': <ExclamationTriangleIconSolid fill={Palette.red} width={22}/>,
}
