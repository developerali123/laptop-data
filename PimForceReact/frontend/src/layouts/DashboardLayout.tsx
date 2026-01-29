import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Header */}
      <Header />

      {/* Grid layout: Sidebar on left, Main content on right */}
      <div className="grid items-start gap-6 px-4 py-6 sm:grid-cols-[240px_1fr] sm:px-6 lg:px-8">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content from the page */}
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  )
}
