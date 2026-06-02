import { Outlet, useLocation } from "react-router-dom";
import { AppBar } from "../../components/toolbars/AppBar";
import { NavBar } from "../../components/toolbars/NavBar";
import { Content, Page } from "./style";
import { useEffect, useState } from "react";

export function Home() {
  const location = useLocation();

  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <Page>
      <AppBar />
      <NavBar onProject={path.includes('project') && !path.includes('projects') ? true : false} />
      <Content className="content">
        <Outlet />
      </Content>
    </Page>
  )
}