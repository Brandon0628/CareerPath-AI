import { Chrome as Home, ClipboardCheck, Map, Brain, Search, Heart, MessageCircle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "AI Advisor", url: "/advisor", icon: MessageCircle },
  { title: "Discover Strengths", url: "/discover", icon: Brain },
  { title: "Test Skills", url: "/test-skills", icon: ClipboardCheck },
  { title: "Find Careers", url: "/find-careers", icon: Search },
  { title: "Career Roadmap", url: "/roadmap", icon: Map },
  { title: "Our Mission", url: "/mission", icon: Heart },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-5 border-b border-sidebar-border">
            <span className="text-sm font-bold text-white">GuidePost</span>
            <span className="text-sm font-bold text-primary">Genius</span>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/50">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="text-white/70 hover:text-white hover:bg-white/10"
                      activeClassName="bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:text-primary-foreground"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
