import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";
import { Title } from "../../components/base/Title";
import { CircleAlert, ShieldAlert, ShieldCheck } from "@/components/icons";

export const ProjectHealthBadge = {
  'SAFE': <Badge color={Palette.transparent}>
            <ShieldCheck fill={Palette.green}/>
            <Title>SAFE</Title>
          </Badge>,
  'WARNING': <Badge color={Palette.transparent}>
              <CircleAlert fill={Palette.yellow}/>
              <Title>WARNING</Title>
            </Badge>,
  'CRITICAL': <Badge color={Palette.transparent}>
                <ShieldAlert fill={Palette.red}/>
                <Title>CRITICAL</Title>
              </Badge>,
}