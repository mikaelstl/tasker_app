import { Text } from "../../components/base/Text/index.ts";
import { Title } from "../../components/base/Title/index.ts";
import { ProjectCard } from "../../components/cards/ProjectCard/index.tsx";
import { TaskCard } from "../../components/cards/TaskCard/index.tsx";
import { Margin } from "../../components/misc/Margin/index.ts";
import { Scroller } from "../../components/misc/Scroller/index.ts";
import { User } from "../../components/misc/User/index.tsx";
import { Content, Friends, Recent, ToThisWeek } from "./style.ts";

export function Profile() {
  return (
    <Content className="workspace-content">
      <Text>Profile</Text>
    </Content>
  )
}