"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { teams } from "@/lib/mock-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TeamSwitcher({ collapsed = false }: { collapsed?: boolean }) {
  const [active, setActive] = React.useState(teams[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "hover:bg-sidebar-accent flex w-full items-center gap-2.5 rounded-lg p-2 text-left transition-colors outline-none",
          collapsed && "justify-center",
        )}
      >
        <Avatar className="size-8 rounded-md">
          <AvatarFallback className="bg-primary/15 text-primary rounded-md text-xs font-semibold">
            {active.initials}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-foreground truncate text-sm font-medium">{active.name}</span>
              <span className="text-muted-foreground truncate text-xs">{active.plan}</span>
            </div>
            <ChevronsUpDown className="text-muted-foreground size-4 shrink-0" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60" sideOffset={8}>
        <DropdownMenuLabel className="text-muted-foreground text-xs">Teams</DropdownMenuLabel>
        <DropdownMenuGroup>
          {teams.map((team) => (
            <DropdownMenuItem
              key={team.id}
              onClick={() => setActive(team)}
              className="gap-2.5"
            >
              <Avatar className="size-6 rounded-md">
                <AvatarFallback className="bg-muted rounded-md text-[10px] font-semibold">
                  {team.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <span className="text-sm">{team.name}</span>
                <span className="text-muted-foreground text-xs">{team.plan}</span>
              </div>
              {active.id === team.id && <Check className="text-primary size-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-muted-foreground gap-2.5">
          <div className="bg-muted flex size-6 items-center justify-center rounded-md">
            <Plus className="size-4" />
          </div>
          Create team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
