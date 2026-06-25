import { cn } from "@/lib/utils"

export function Logo({
  collapsed = false,
  className,
}: {
  collapsed?: boolean
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg shadow-sm shadow-primary/30">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="12" cy="12" r="2.4" fill="currentColor" />
        </svg>
      </div>
      {!collapsed && (
        <span className="text-foreground text-[15px] font-semibold tracking-tight">
          AgentSphere
        </span>
      )}
    </div>
  )
}
