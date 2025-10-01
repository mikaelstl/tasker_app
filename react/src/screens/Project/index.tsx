import { Outlet } from "react-router-dom";
import { Content } from "./style.ts";

export function Project() {
  return (
    <Content className="projects-content">
      <Outlet />
    </Content>
  )
}