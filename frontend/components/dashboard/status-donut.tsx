"use client"

import { Cell, Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { statusDistribution } from "@/lib/mock-data"

const colorMap: Record<string, string> = {
  active: "var(--success)",
  idle: "var(--warning)",
  error: "var(--danger)",
  offline: "var(--offline)",
}

const config = {
  value: { label: "Agents" },
  active: { label: "Active", color: "var(--success)" },
  idle: { label: "Idle", color: "var(--warning)" },
  error: { label: "Error", color: "var(--danger)" },
  offline: { label: "Offline", color: "var(--offline)" },
} satisfies ChartConfig

export function StatusDonut() {
  const total = statusDistribution.reduce((acc, d) => acc + d.value, 0)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Agent Status</CardTitle>
        <CardDescription>Distribution across all agents</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <ChartContainer config={config} className="aspect-square h-[180px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="name" hideLabel />} />
            <Pie
              data={statusDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={80}
              strokeWidth={2}
              stroke="var(--card)"
            >
              {statusDistribution.map((entry) => (
                <Cell key={entry.key} fill={colorMap[entry.key]} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-semibold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 18}
                          className="fill-muted-foreground text-xs"
                        >
                          Agents
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="grid w-full grid-cols-2 gap-2">
          {statusDistribution.map((d) => (
            <div key={d.key} className="flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: colorMap[d.key] }} />
              <span className="text-muted-foreground text-xs">{d.name}</span>
              <span className="text-foreground ml-auto text-xs font-medium tabular-nums">{d.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
