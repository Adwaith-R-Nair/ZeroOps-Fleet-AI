"use client"

import { cn } from "@/lib/utils"

export function Sparkline({
  data,
  color = "var(--primary)",
  width = 120,
  height = 36,
  className,
}: {
  data: { value: number }[]
  color?: string
  width?: number
  height?: number
  className?: string
}) {
  if (data.length === 0) return null

  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const stepX = width / (data.length - 1)
  const points = data.map((d, i) => {
    const x = i * stepX
    const y = height - ((d.value - min) / range) * (height - 4) - 2
    return [x, y] as const
  })

  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ")
  const area = `${line} L${width},${height} L0,${height} Z`
  const id = `spark-${Math.round(points[0][1] * 1000)}-${data.length}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}
