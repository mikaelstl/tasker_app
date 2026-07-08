
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export function NavMain({
  items,
}: {
  items: {
    name: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [path, setPath] = useState('');

  function isActive(path: string) {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              type="button"
              isActive={isActive(item.url)}
              onClick={() => navigate(item.url)}
            >
              {item.icon}
              <span>{item.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
