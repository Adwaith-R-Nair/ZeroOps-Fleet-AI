"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { CommandPalette } from "./command-palette"
import { NotificationPanel } from "./notification-panel"
import { notifications } from "@/lib/mock-data"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [notifOpen, setNotifOpen] = React.useState(false)

  const unread = notifications.filter((n) => !n.read).length

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="bg-background min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <div
        className={cn(
          "flex min-h-screen flex-col transition-[padding] duration-200 ease-in-out",
          collapsed ? "pl-16" : "pl-60",
        )}
      >
        <Topbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenNotifications={() => setNotifOpen(true)}
          unreadCount={unread}
        />
        <main className="scrollbar-thin flex-1 p-6">{children}</main>
      </div>

      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      <NotificationPanel open={notifOpen} onOpenChange={setNotifOpen} />
    </div>
  )
}
