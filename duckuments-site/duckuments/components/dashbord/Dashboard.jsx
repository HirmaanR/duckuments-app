"use client";
import { useState, useEffect } from "react";
import { Command, File, Inbox, Trash2 } from "lucide-react";
import Link from "next/link";

import { NavUser } from "@/components/nav-user";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarGroupLabel,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// This is example data
const data = {
  user: {
    name: "Hirmaan",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "All Projects",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
      isActive: false,
    },
  ],
  changes: [
    {
      file: "README.md",
      state: "M",
    },
    {
      file: "api/hello/route.ts",
      state: "U",
    },
    {
      file: "app/layout.tsx",
      state: "M",
    },
  ],
};

import { getAccessToken } from "@/server/cookies";
import ModeToggle from "@/components/theme-toggle";
import { useAllUserProjects, useGetFileContent } from "@/server/server";
import { DialogDemo } from "@/components/Modal";
import { Plus } from "lucide-react";
import { NewProjectCard } from "@/components/NewProjectCard";
import MarkdownEditor from "@/components/codeMirror";
import { Button } from "../ui/button";

import TreeFileSidebar from "./TreeFileSidebar";

const Dashboard = () => {
  const { UserProjectFunc, loading, error, userData } = useAllUserProjects();
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(null);

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    if (userData) {
      console.log("get data done", userData);
    }
  }, [userData]);

  useEffect(() => {
    if (error) {
      console.log("error in Dashboard is :", error);
    }
  }, [error]);

  const handleLoad = async () => {
    const token = await getAccessToken();
    await UserProjectFunc(token["value"]);
  };

  function ProjectSidebar() {
    const [activeItem, setActiveItem] = useState(data.navMain[0]);
    const { setOpen } = useSidebar();

    return (
      <Sidebar
        collapsible="icon"
        className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      >
        {/* <Sidebar
          collapsible="none"
          className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
        >
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                  <Link href="#">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <Command className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Acme Inc</span>
                      <span className="truncate text-xs">Enterprise</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                  {data.navMain.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveItem(item);
                          const mail = data.mails.sort(
                            () => Math.random() - 0.5
                          );
                          setMails(
                            mail.slice(
                              0,
                              Math.max(5, Math.floor(Math.random() * 10) + 1)
                            )
                          );
                          setOpen(true);
                        }}
                        isActive={activeItem?.title === item.title}
                        className="px-2.5 md:px-2"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <NavUser user={data.user} />
          </SidebarFooter>
        </Sidebar> */}
        {/* This is the second sidebar */}
        {/* We disable collapsible and let it fill remaining space */}
        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
          <SidebarHeader className="gap-3.5 border-b p-4">
            <div className="flex w-full items-center justify-between">
              <div className="text-foreground text-base font-medium">
                {activeItem?.title}
              </div>
              <DialogDemo btnTitle={<Plus />} btnStyle="ghost">
                <NewProjectCard />
              </DialogDemo>
            </div>
            <SidebarInput placeholder="Type to search..." />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="px-0">
              <SidebarGroupContent>
                {userData.map((item) => (
                  <Link
                    href=""
                    onClick={() => {
                      setSelectedProjectSlug(item.slug);
                    }}
                    key={item.id}
                    className="hover:bg-sidebar-accent bg-sidebar hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                  >
                    <div className="flex w-full items-center gap-2">
                      <span className="text-sm">{item.title}</span>{" "}
                      <span className="ml-auto text-xs">
                        {item.create_date}
                      </span>
                    </div>
                    <span className="font-medium">{item.language}</span>
                    <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </Sidebar>
    );
  }

  return (
    <div>
      <SidebarProvider
        style={{
          "--sidebar-width": "350px",
        }}
      >
        <ProjectSidebar />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inbox</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="gap-4 p-3 items-center justify-center">
            {markdown !== "" ? (
              <MarkdownEditor markdown={markdown} />
            ) : (
              <p>plesase select a file or project for show content</p>
            )}
          </div>
        </SidebarInset>
        {/* <TreeFileSidebar slug={selectedProjectSlug} setMarkdown={setMarkdown} /> */}
        {selectedProjectSlug ? <TreeFileSidebar slug={selectedProjectSlug} setMarkdown={setMarkdown} />: null}
      </SidebarProvider>
    </div>
  );
};
export default Dashboard;
