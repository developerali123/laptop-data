import { Home, LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom"; // Add Link import for react-router

export default function Sidebar() {
    const { pathname } = useLocation();

  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isIntegration = pathname === "/integration" || pathname.startsWith("/integration/");

  return (
    <aside className="hidden sm:block">
      <div className="sticky top-16 space-y-1 rounded-xl border bg-card p-2">
        <nav className="space-y-1" aria-label="Primary">
          <SidebarItem
            icon={<Home className="h-4 w-4" />}
            label="Dashboard"
            to="/dashboard"
            active={isDashboard}
          />
          <SidebarItem
            icon={<LinkIcon className="h-4 w-4" />}
            label="Integrations"
            to="/integration"
            active={isIntegration}
          />
        </nav>
      </div>
    </aside>
  );
}

function SidebarItem({
    icon,
    label,
    badge,
    active = false,
    to
}: { 
    icon: React.ReactNode; 
    label: string; 
    badge?: string; 
    active?: boolean; 
    to: string; // Add to for the link destination
}) {
    return (
        <Link to={to} aria-current={active ? "page" : undefined}>
            <Button
                variant={active ? "secondary" : "ghost"}
                className="flex w-full items-center justify-between rounded-lg"
            >
                <span className="flex items-center gap-2">
                    {icon}
                    {label}
                </span>
                {badge ? (
                    <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-[#873EFF]">
                        {badge}
                    </span>
                ) : null}
            </Button>
        </Link>
    );
}
