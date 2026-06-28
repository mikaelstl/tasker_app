import Palette from "../../assets/palette";

export const ProjectHealthIcon = {
  'SAFE': <ShieldCheckIcon fill={Palette.green} width={22}/>,
  'WARNING': <ShieldExclamationIcon fill={Palette.yellow} width={22}/>,
  'CRITICAL': <ExclamationTriangleIcon fill={Palette.red} width={22}/>,
}