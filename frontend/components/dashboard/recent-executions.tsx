import { Check, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { executions } from "@/lib/mock-data"
import type { ExecutionStatus } from "@/types"

function StatusCell({ status }: { status: ExecutionStatus }) {
  const map = {
    success: { icon: Check, color: "text-success bg-success/10", label: "Success" },
    failed: { icon: X, color: "text-danger bg-danger/10", label: "Failed" },
    running: { icon: Loader2, color: "text-warning bg-warning/10", label: "Running" },
  }
  const { icon: Icon, color, label } = map[status]
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium", color)}>
      <Icon className={cn("size-3.5", status === "running" && "animate-spin")} />
      {label}
    </span>
  )
}

export function RecentExecutions() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Executions</CardTitle>
        <CardDescription>Latest agent runs across your workspace</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Agent</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Duration</TableHead>
              <TableHead className="pr-6 text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {executions.map((exec) => (
              <TableRow key={exec.id}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{exec.agentEmoji}</span>
                    <span className="font-medium">{exec.agentName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-[220px] truncate">
                  {exec.task}
                </TableCell>
                <TableCell>
                  <StatusCell status={exec.status} />
                </TableCell>
                <TableCell className="text-right tabular-nums">{exec.duration}</TableCell>
                <TableCell className="text-muted-foreground pr-6 text-right text-xs">
                  {exec.timeAgo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
