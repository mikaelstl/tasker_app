"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AppWindow, Inbox, FolderOpen } from "lucide-react";
import { LogoIcon } from "./images/logo-icon";
import { NavSecondary } from "./nav-secondary";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    pages: [
      {
        name: "Workspace",
        url: "workspace",
        icon: (<AppWindow />),
      },
      {
        name: "Projects",
        url: "projects",
        icon: (<Inbox />),
      },
    ],
    project: [
      {
        id: "abcde",
        title: "Project",
        url: "#",
        icon: (
          <FolderOpen />
        ),
        items: [
          {
            title: "Overview",
            url: "#",
          },
          {
            title: "Tasks",
            url: "#",
          },
          {
            title: "Calendar",
            url: "#",
          },
          {
            title: "Members",
            url: "#",
          },
          {
            title: "Stats",
            url: "#",
          },
        ],
      },
    ],
    secondary: [
      {
        title: "Trocar",
        url: "workspaces",
        icon: (<AppWindow />),
      },
    ],
  }

  return (
    <Sidebar className="tskr-sidebar bg-foreground" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 font-medium p-2">
              <LogoIcon className="size-8" />
              Tasker
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.pages} />
        <NavProjects items={data.project} />
        <NavSecondary items={data.secondary} className="mt-auto" />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}
