import { Bot, Boxes, Zap } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { ExecutionChart } from "@/components/dashboard/execution-chart"
import { StatusDonut } from "@/components/dashboard/status-donut"
import { RecentExecutions } from "@/components/dashboard/recent-executions"
import { ActiveAgents } from "@/components/dashboard/active-agents"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function OverviewPage() {
  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-3">
      {/* Row 1 — KPI cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <StatCard
          label="Total Agents"
          value="8"
          icon={Bot}
          trend="+12%"
          trendUp
          hint="from last week"
        />
        <StatCard
          label="Active Sandboxes"
          value="7"
          icon={Boxes}
          livePulse
          hint="live across 2 regions"
        />
        <StatCard
          label="Executions Today"
          value="3,482"
          icon={Zap}
          trend="97.6%"
          trendUp
          hint="success rate"
        />
      </div>

      {/* Row 2 — Charts */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ExecutionChart />
        </div>
        <div className="lg:col-span-4">
          <StatusDonut />
        </div>
      </div>

      {/* Row 3 — Tables */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <RecentExecutions />
        </div>
        <div className="lg:col-span-5">
          <ActiveAgents />
        </div>
      </div>

      {/* Row 4 — Quick actions */}
      <QuickActions />
    </div>
  )
}
