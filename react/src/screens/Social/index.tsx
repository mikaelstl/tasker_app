import { Text } from "../../components/base/Text/index.ts";
import { Title } from "../../components/base/Title/index.ts";
import { ProjectCard } from "../../components/cards/ProjectCard/index.tsx";
import { TaskCard } from "../../components/cards/TaskCard/index.tsx";
import { Scroller } from "../../components/misc/Scroller/index.ts";
import { User } from "../../components/misc/User/index.tsx";
import { Content, Friends, Recent, ToThisWeek } from "./style.ts";

export function Social() {
  const projects = Array.from({ length: 10 }, (_, i) => i);
  const users = Array.from({ length: 30 }, (_, i) => i);

  return (
    <Content className="social-content">
      <Text>Social</Text>
    </Content>
  )
}