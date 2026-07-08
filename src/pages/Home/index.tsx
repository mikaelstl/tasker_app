import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import ProfileDropdown from "@/components/shadcn-studio/blocks/dropdown-profile";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from "lucide-react";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider>
        <AppSidebar/>
        <div className='flex flex-1 flex-col w-full'>
          <header className='bg-foreground sticky top-0 z-50 border-b'>
            <div className='w-full flex items-center justify-between gap-6 px-6 py-4 sm:px-8'>
              <div className='flex items-center gap-4'>
                <SidebarTrigger className='[&_svg]:size-5!' />
                <Separator orientation='vertical' className='hidden h-4! data-vertical:self-center sm:block' />
              </div>
              <div className='flex items-center gap-1.5'>
                <ProfileDropdown
                  trigger={
                    <Button variant='ghost' size='icon-lg'>
                      <Avatar className='size-[inherit] rounded-full'>
                        <AvatarFallback className='rounded-full'><User/></AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
              </div>
            </div>
          </header>
          <main className='size-full flex-1'>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}