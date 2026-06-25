"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { executionVolume } from "@/lib/mock-data"

const config = {
  executions: { label: "Executions", color: "var(--chart-1)" },
  success: { label: "Success", color: "var(--chart-3)" },
} satisfies ChartConfig

export function ExecutionChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Execution Volume</CardTitle>
        <CardDescription>Total runs vs. successful runs over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[260px] w-full">
          <AreaChart data={executionVolume} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="fillExec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-executions)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-executions)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              className="text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              className="text-xs"
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="executions"
              type="monotone"
              fill="url(#fillExec)"
              stroke="var(--color-executions)"
              strokeWidth={2}
            />
            <Area
              dataKey="success"
              type="monotone"
              fill="url(#fillSuccess)"
              stroke="var(--color-success)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
