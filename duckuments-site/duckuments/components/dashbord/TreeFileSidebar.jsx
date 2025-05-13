"use client";

import { useGetFileContent } from "@/server/server";
import { getAccessToken } from "@/server/cookies";
import { useEffect, useState } from "react";

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

import { File, Folder } from "lucide-react";
import { Button } from "../ui/button";

const TreeFileSidebar = ({ slug,setMarkdown }) => {
  const { getFileContentFunc, loading, error, ProjectData } =
    useGetFileContent();

  const [path, setPath] = useState("");
  // const [markdown, setMarkdown] = useState("");

  const handleLoad = async () => {
    const token = await getAccessToken();
    await getFileContentFunc(token["value"], slug, path);
  };

  const handleFileContent = () => {
    if (ProjectData) {
      if (ProjectData.type == "file") {
        console.log("content is ", ProjectData.content);
        setMarkdown(ProjectData.content)
      } else {
        console.log("two else", ProjectData.type, typeof ProjectData.type);
      }
    } else {
      console.log("i cant run");
    }
  };

  useEffect(() => {
    console.log("why im run!?");
  }, []);

  // useEffect(() => {
  //   console.log("markdown is :", markdown);
  // }, [markdown]);

  useEffect(() => {
    handleLoad();
  }, [slug, path]);

  useEffect(() => {
    console.log("project data is : ", ProjectData);
    handleFileContent();
  }, [ProjectData]);

  useEffect(() => {
    console.log("error in tree :", error);
  }, [error]);

  useEffect(() => {
    console.log("path changed:", path);
  }, [path]);

  function Tree({ item, icon }) {
    const [name, ...items] = Array.isArray(item) ? item : [item];
    if (!items.length) {
      return (
        <SidebarMenuButton
          isActive={name === "button.jsx"}
          className="data-[active=true]:bg-transparent"
          onClick={(e) => {
            if (path !== "") {
              setPath(path + "/" + name);
            } else {
              setPath(name);
            }
          }}
        >
          {icon}
          {name}
        </SidebarMenuButton>
      );
    }
  }

  return (
    <>
      <Sidebar
        collapsible="none"
        className="sticky hidden lg:flex top-0 h-svh border-l"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="my-2">
              <h1 className="capitalize text-lg">project structure</h1>
            </SidebarGroupLabel>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Files</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <Button
                  className="data-[active=true]:bg-transparent"
                  variant="ghost"
                  onClick={(e) => {
                    setPath("");
                  }}
                >
                  <Folder />
                  ...
                </Button>
                {ProjectData && ProjectData.type === "folder"
                  ? ProjectData.folders.map((item, index) => (
                      <Tree key={index} item={item} icon={<Folder />} />
                    ))
                  : null}
                {ProjectData && ProjectData.type === "folder"
                  ? ProjectData.files.map((item, index) => (
                      <Tree key={index} item={item} icon={<File />} />
                    ))
                  : null}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </>
  );
};

export default TreeFileSidebar;
