import { MoreHorizontal, Home, ClipboardCheck, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const quickActions = [
  { label: "Home", path: "/", icon: Home },
  { label: "Test Skills", path: "/test-skills", icon: ClipboardCheck },
  { label: "Career Roadmap", path: "/roadmap", icon: Map },
];

export function QuickMenu() {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {quickActions.map((action) => (
          <DropdownMenuItem
            key={action.path}
            onClick={() => navigate(action.path)}
            className="cursor-pointer gap-2"
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
