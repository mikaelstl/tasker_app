import { ExclamationTriangleIconSolid, ShieldCheckIconSolid, ShieldExclamationIcon } from "@/components/icons/heroicons";
import Palette from "../../assets/palette";

export const ProjectHealthIcon = {
  'SAFE': <ShieldCheckIconSolid fill={Palette.green} width={22}/>,
  'WARNING': <ShieldExclamationIcon fill={Palette.yellow} width={22}/>,
  'CRITICAL': <ExclamationTriangleIconSolid fill={Palette.red} width={22}/>,
}
