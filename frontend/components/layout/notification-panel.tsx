"use client"

import * as React from "react"
import { CheckCircle2, AlertTriangle, XCircle, Info, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { notifications as initial } from "@/lib/mock-data"
import type { NotificationItem } from "@/types"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const icons: Record<NotificationItem["type"], { icon: LucideIcon; color: string }> = {
  success: { icon: CheckCircle2, color: "text-success" },
  warning: { icon: AlertTriangle, color: "text-warning" },
  error: { icon: XCircle, color: "text-danger" },
  info: { icon: Info, color: "text-primary" },
}

export function NotificationPanel({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [items, setItems] = React.useState<NotificationItem[]>(initial)
  const unread = items.filter((i) => !i.read).length

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <div className="flex items-center justify-between gap-2">
            <SheetTitle>Notifications</SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setItems((prev) => prev.map((i) => ({ ...i, read: true })))}
              disabled={unread === 0}
            >
              Mark all read
            </Button>
          </div>
          <SheetDescription>
            {unread > 0 ? `${unread} unread notifications` : "You're all caught up"}
          </SheetDescription>
        </SheetHeader>
        <div className="scrollbar-thin flex-1 overflow-y-auto">
          {items.map((item) => {
            const { icon: Icon, color } = icons[item.type]
            return (
              <button
                key={item.id}
                onClick={() =>
                  setItems((prev) =>
                    prev.map((i) => (i.id === item.id ? { ...i, read: true } : i)),
                  )
                }
                className={cn(
                  "hover:bg-accent/50 flex w-full items-start gap-3 border-b px-5 py-4 text-left transition-colors",
                  !item.read && "bg-primary/5",
                )}
              >
                <Icon className={cn("mt-0.5 size-5 shrink-0", color)} />
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-foreground text-sm font-medium">{item.title}</span>
                  <span className="text-muted-foreground text-sm">{item.description}</span>
                  <span className="text-muted-foreground mt-1 text-xs">{item.timeAgo}</span>
                </div>
                {!item.read && <span className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" />}
              </button>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
