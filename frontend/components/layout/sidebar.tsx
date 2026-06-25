"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { navSections } from "@/lib/constants"
import { Logo } from "./logo"
import { TeamSwitcher } from "./team-switcher"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean
  onToggle: () => void
}) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "bg-sidebar border-sidebar-border fixed inset-y-0 left-0 z-40 flex flex-col border-r transition-[width] duration-200 ease-in-out",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "border-sidebar-border flex h-16 items-center border-b px-3",
          collapsed && "justify-center px-0",
        )}
      >
        <Logo collapsed={collapsed} />
      </div>

      {/* Navigation */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
        <div className="flex flex-col gap-6">
          {navSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-1">
              {!collapsed && (
                <p className="text-muted-foreground px-2 pb-1 text-[11px] font-semibold tracking-wider uppercase">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/")
                const link = (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-sidebar-accent text-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                      collapsed && "justify-center px-0",
                    )}
                  >
                    {active && (
                      <span className="bg-primary absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full" />
                    )}
                    <item.icon className="size-[18px] shrink-0" />
                    {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                    {!collapsed && item.badge !== undefined && (
                      <span className="bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
                return collapsed ? (
                  <Tooltip key={item.href}>
                    <TooltipTrigger render={link} />
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                ) : (
                  link
                )
              })}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-sidebar-border flex flex-col gap-1 border-t p-3">
        <TeamSwitcher collapsed={collapsed} />
        <button
          onClick={onToggle}
          className={cn(
            "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors",
            collapsed && "justify-center px-0",
          )}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-[18px]" />
          ) : (
            <>
              <PanelLeftClose className="size-[18px]" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
