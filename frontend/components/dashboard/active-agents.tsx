import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusDot } from "@/components/shared/status-badge"
import { agents } from "@/lib/mock-data"

export function ActiveAgents() {
  const active = agents.filter((a) => a.status === "active")

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Active Agents</CardTitle>
        <CardDescription>{active.length} agents currently running</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {active.map((agent) => (
          <div
            key={agent.id}
            className="hover:bg-accent/40 flex items-center gap-3 rounded-lg p-2 transition-colors"
          >
            <div className="bg-muted/60 relative flex size-9 items-center justify-center rounded-lg text-base">
              {agent.emoji}
              <StatusDot status={agent.status} className="absolute -bottom-0.5 -right-0.5 ring-2 ring-card" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium">{agent.name}</span>
                <span className="text-muted-foreground text-xs tabular-nums">{agent.runtime}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      agent.cpu > 75 ? "bg-danger" : agent.cpu > 50 ? "bg-warning" : "bg-primary",
                    )}
                    style={{ width: `${agent.cpu}%` }}
                  />
                </div>
                <span className="text-muted-foreground w-10 text-right text-xs tabular-nums">
                  {agent.cpu}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
