import { DangerTriangle as ExclamationTriangleIconSolid, ShieldCheck as ShieldCheckIconSolid, ShieldWarning as ShieldExclamationIcon } from "@/components/icons/solar-icons";
import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";
import { Title } from "../../components/base/Title";

export const ProjectHealthyBadge = {
  'SAFE': <Badge bg={Palette.transparent}>
            <ShieldCheckIconSolid fill={Palette.green} width={22}/>
            <Title>SEGURO</Title>
          </Badge>,
  'WARNING': <Badge bg={Palette.transparent}>
              <ShieldExclamationIcon fill={Palette.yellow} width={22}/>
              <Title>ATENÇÃO</Title>
            </Badge>,
  'CRITICAL': <Badge bg={Palette.transparent}>
              <ExclamationTriangleIconSolid fill={Palette.red} width={22}/>
                <Title>CRÍTICO</Title>
              </Badge>,
}
