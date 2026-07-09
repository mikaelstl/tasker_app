import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from "lucide-react";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <SidebarProvider>
      <div className="grid h-dvh w-full grid-cols-[auto_1fr] grid-rows-[61px_1fr] bg-background text-foreground">
        <AppSidebar />

        <header className="col-start-2 row-start-1 flex items-center justify-between border-b bg-foreground px-8">
          <div className="flex items-center gap-5">
            <SidebarTrigger className="size-8 text-muted-foreground" />

            <Separator orientation="vertical" />
          </div>

          <Avatar className="size-9 border bg-muted">
            <AvatarFallback>
              <User className="size-4 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </header>

        <main className="col-start-2 row-start-2 overflow-auto bg-background">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
