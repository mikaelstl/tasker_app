import { ExclamationTriangleIcon, ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/react/24/solid";
import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";
import { Title } from "../../components/base/Title";

export const ProjectHealthyBadge = {
  'SAFE': <Badge color={Palette.transparent}>
            <ShieldCheckIcon fill={Palette.green} width={22}/>
            <Title>SAFE</Title>
          </Badge>,
  'WARNING': <Badge color={Palette.transparent}>
              <ShieldExclamationIcon fill={Palette.yellow} width={22}/>
              <Title>WARNING</Title>
            </Badge>,
  'CRITICAL': <Badge color={Palette.transparent}>
                <ExclamationTriangleIcon fill={Palette.red} width={22}/>
                <Title>CRITICAL</Title>
              </Badge>,
}