"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { navSections } from "@/lib/constants"
import { agents } from "@/lib/mock-data"
import { Plus, GitBranch, UserPlus } from "lucide-react"

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()

  const go = React.useCallback(
    (href: string) => {
      onOpenChange(false)
      router.push(href)
    },
    [onOpenChange, router],
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command palette"
      description="Search agents, workflows and executions"
    >
      <CommandInput placeholder="Search agents, workflows, executions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => go("/agents")}>
            <Plus />
            Create Agent
          </CommandItem>
          <CommandItem onSelect={() => go("/workflows")}>
            <GitBranch />
            New Workflow
          </CommandItem>
          <CommandItem onSelect={() => go("/team")}>
            <UserPlus />
            Invite Team Member
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          {navSections.flatMap((s) =>
            s.items.map((item) => (
              <CommandItem key={item.href} onSelect={() => go(item.href)}>
                <item.icon />
                {item.label}
              </CommandItem>
            )),
          )}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Agents">
          {agents.map((agent) => (
            <CommandItem
              key={agent.id}
              value={agent.name}
              onSelect={() => go("/agents")}
            >
              <span className="text-base leading-none">{agent.emoji}</span>
              {agent.name}
              <span className="text-muted-foreground ml-auto text-xs">{agent.model}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
