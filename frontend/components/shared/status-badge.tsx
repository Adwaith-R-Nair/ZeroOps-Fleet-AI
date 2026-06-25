import { cn } from "@/lib/utils"
import type { AgentStatus, ExecutionStatus, SandboxStatus } from "@/types"

type AnyStatus = AgentStatus | ExecutionStatus | SandboxStatus

const config: Record<
  AnyStatus,
  { label: string; dot: string; text: string; pulse?: boolean }
> = {
  active: { label: "Active", dot: "bg-success", text: "text-success", pulse: true },
  idle: { label: "Idle", dot: "bg-warning", text: "text-warning" },
  error: { label: "Error", dot: "bg-danger", text: "text-danger" },
  offline: { label: "Offline", dot: "bg-offline", text: "text-muted-foreground" },
  success: { label: "Success", dot: "bg-success", text: "text-success" },
  failed: { label: "Failed", dot: "bg-danger", text: "text-danger" },
  running: { label: "Running", dot: "bg-warning", text: "text-warning", pulse: true },
  provisioning: { label: "Provisioning", dot: "bg-warning", text: "text-warning", pulse: true },
  terminated: { label: "Terminated", dot: "bg-offline", text: "text-muted-foreground" },
}

export function StatusDot({ status, className }: { status: AnyStatus; className?: string }) {
  const c = config[status]
  return (
    <span
      className={cn(
        "inline-block size-2 rounded-full",
        c.dot,
        c.pulse && "animate-pulse-ring",
        className,
      )}
    />
  )
}

export function StatusBadge({
  status,
  className,
}: {
  status: AnyStatus
  className?: string
}) {
  const c = config[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-xs font-medium",
        c.text,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", c.dot, c.pulse && "animate-pulse-ring")} />
      {c.label}
    </span>
  )
}
