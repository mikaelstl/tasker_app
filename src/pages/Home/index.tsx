import { Outlet } from "react-router-dom";
import { Screen } from "../../components/base/Screen";
import { AppBar } from "../../components/toolbars/AppBar";
import { NavBar } from "../../components/toolbars/NavBar";
import { Content, Page } from "./style";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
  }, []);

  return (
    <Screen>
      <Page>
        <AppBar/>
        <NavBar/>
        <Content className="content">
          <Outlet/>
        </Content>
      </Page>
    </Screen>
  )
}