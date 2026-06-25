import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendUp,
  hint,
  livePulse,
  className,
}: {
  label: string
  value: string
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  hint?: string
  livePulse?: boolean
  className?: string
}) {
  return (
    <Card className={cn("transition-all duration-150 hover:-translate-y-0.5", className)}>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm font-medium">{label}</span>
          <div className="bg-muted/60 text-muted-foreground flex size-9 items-center justify-center rounded-lg">
            <Icon className="size-[18px]" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="text-foreground text-3xl font-semibold tracking-tight tabular-nums">
              {value}
            </span>
            {livePulse && <span className="bg-success size-2.5 rounded-full animate-pulse-ring" />}
          </div>
          <div className="flex items-center gap-2">
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-medium",
                  trendUp ? "text-success" : "text-danger",
                )}
              >
                {trendUp ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {trend}
              </span>
            )}
            {hint && <span className="text-muted-foreground text-xs">{hint}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
