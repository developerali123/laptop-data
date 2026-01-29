import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
    const { pathname } = useLocation();
    const { theme } = useTheme();

    const mobileTitle = (() => {
        if (pathname === "/dashboard" || pathname.startsWith("/dashboard")) return "Dashboard";
        if (pathname === "/integration") return "Create integration";
        if (pathname.startsWith("/integration/")) return "Integration details";
        return "PimForce";
    })();

    return (
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-md focus:bg-primary focus:px-3 focus:py-1.5 focus:text-primary-foreground">Skip to content</a>
                <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
                    <img
                        src={theme === "dark" ? "/logos/pimforce-white.svg" : "/logos/pimforce-black.svg"}
                        alt="PimForce"
                        className="h-[28px] w-auto select-none"
                        aria-label="PimForce"
                        draggable={false}
                    />

                    <div className="ml-auto hidden items-center gap-2 sm:flex">
                        <div className="relative">
                            <Input placeholder="Search…" aria-label="Search" className="w-56 pl-9" />
                            <Search aria-hidden className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        <ThemeToggle />
                        <Avatar className="h-8 w-8">
                            <AvatarImage alt="User avatar" />
                            <AvatarFallback aria-label="User">DU</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                {/* Mobile header actions */}
                <div className="flex items-center justify-between px-4 pb-3 sm:hidden">
                    <h1 className="text-xl font-semibold">{mobileTitle}</h1>
                    <div className="flex items-center gap-1">
                        <ThemeToggle />
                        <Avatar className="h-8 w-8">
                            <AvatarFallback aria-label="User">DU</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>
    )
}