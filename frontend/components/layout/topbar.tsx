"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Search, Bell, Plus, Bot, GitBranch, UserPlus, ChevronRight } from "lucide-react"
import { pageTitles } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Topbar({
  onOpenSearch,
  onOpenNotifications,
  unreadCount,
}: {
  onOpenSearch: () => void
  onOpenNotifications: () => void
  unreadCount: number
}) {
  const pathname = usePathname()
  const router = useRouter()
  const title = pageTitles[pathname] ?? "AgentSphere"

  return (
    <header className="bg-background/80 border-border sticky top-0 z-30 flex h-16 items-center gap-4 border-b px-6 backdrop-blur-md">
      {/* Title + breadcrumb */}
      <div className="flex min-w-0 items-center gap-2">
        <span className="text-muted-foreground hidden text-sm md:inline">AgentSphere</span>
        <ChevronRight className="text-muted-foreground hidden size-4 md:inline" />
        <h1 className="text-foreground truncate text-base font-semibold tracking-tight">
          {title}
        </h1>
      </div>

      {/* Search */}
      <div className="mx-auto hidden w-full max-w-md lg:block">
        <button
          onClick={onOpenSearch}
          className="border-border bg-muted/40 text-muted-foreground hover:bg-muted flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors"
        >
          <Search className="size-4" />
          <span className="flex-1 text-left">Search agents, workflows, executions...</span>
          <kbd className="border-border bg-background text-muted-foreground rounded border px-1.5 py-0.5 text-[10px] font-medium">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-1 lg:ml-0">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenSearch} aria-label="Search">
          <Search />
        </Button>
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onOpenNotifications}
          aria-label="Notifications"
        >
          <Bell />
          {unreadCount > 0 && (
            <span className="bg-danger absolute right-2 top-2 size-2 rounded-full ring-2 ring-background" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button className="ml-1 gap-1.5">
                <Plus data-icon="inline-start" />
                Create
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/agents")}>
                <Bot />
                Agent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/workflows")}>
                <GitBranch />
                Workflow
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/team")}>
                <UserPlus />
                Team Invite
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar className="ml-2 size-8">
          <AvatarFallback className="bg-muted text-xs font-semibold">JT</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
