"use client"

import * as React from "react"
import { Search, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StatusDot } from "@/components/shared/status-badge"
import type { Agent } from "@/types"

export function AgentList({
  agents,
  selectedId,
  onSelect,
}: {
  agents: Agent[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  const [query, setQuery] = React.useState("")
  const filtered = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="bg-card flex w-[280px] shrink-0 flex-col rounded-xl border">
      <div className="flex flex-col gap-3 border-b p-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Agents</h2>
          <Button size="sm" variant="outline" className="h-7 gap-1 px-2">
            <Plus data-icon="inline-start" />
            New
          </Button>
        </div>
        <div className="relative">
          <Search className="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents..."
            className="h-9 pl-8"
          />
        </div>
      </div>
      <div className="scrollbar-thin flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-1">
          {filtered.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onSelect(agent.id)}
              className={cn(
                "flex items-start gap-3 rounded-lg p-2.5 text-left transition-colors",
                agent.id === selectedId ? "bg-accent" : "hover:bg-accent/50",
              )}
            >
              <div className="bg-muted/60 relative flex size-9 shrink-0 items-center justify-center rounded-lg text-base">
                {agent.emoji}
                <StatusDot status={agent.status} className="ring-card absolute -bottom-0.5 -right-0.5 ring-2" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">{agent.name}</span>
                <span className="text-muted-foreground truncate text-xs">{agent.description}</span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted-foreground py-8 text-center text-sm">No agents found</p>
          )}
        </div>
      </div>
    </div>
  )
}
