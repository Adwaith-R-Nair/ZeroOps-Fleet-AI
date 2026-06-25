import Link from "next/link"
import { Bot, GitBranch, UserPlus, BookOpen, ArrowUpRight, type LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Action {
  title: string
  description: string
  icon: LucideIcon
  href: string
}

const actions: Action[] = [
  { title: "Create Agent", description: "Configure a new AI agent", icon: Bot, href: "/agents" },
  { title: "New Workflow", description: "Orchestrate multiple agents", icon: GitBranch, href: "/workflows" },
  { title: "Invite Team", description: "Add collaborators", icon: UserPlus, href: "/team" },
  { title: "View Docs", description: "Read the platform guide", icon: BookOpen, href: "/settings" },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {actions.map((action) => (
        <Link key={action.title} href={action.href}>
          <Card className="group hover:border-primary/50 hover:bg-accent/30 relative flex flex-row items-center gap-3 p-4 transition-all duration-150 hover:-translate-y-0.5">
            <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
              <action.icon className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground text-sm font-medium">{action.title}</span>
              <span className="text-muted-foreground text-xs">{action.description}</span>
            </div>
            <ArrowUpRight className="text-muted-foreground group-hover:text-foreground absolute right-3 top-3 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </Card>
        </Link>
      ))}
    </div>
  )
}
