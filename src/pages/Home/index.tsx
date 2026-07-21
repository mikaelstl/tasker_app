import { Outlet } from "react-router-dom";
import { AppBar } from "../../components/toolbars/AppBar";
import { NavBar } from "../../components/toolbars/NavBar";
import { Content, Page } from "./style";

export function Home() {
  return (
    <Page>
      <AppBar />
      <NavBar />
      <Content className="content">
        <Outlet />
      </Content>
    </Page>
  )
}
