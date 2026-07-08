"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TerminalIcon, AppWindow, Inbox, FolderOpen } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

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
  }

  return (
    <Sidebar className="tskr-sidebar bg-foreground" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <TerminalIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Tasker</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.pages} />
        <NavProjects items={data.project} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}
