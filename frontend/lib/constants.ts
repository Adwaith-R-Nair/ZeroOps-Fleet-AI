import {
  LayoutDashboard,
  Bot,
  GitBranch,
  Activity,
  BarChart3,
  ScrollText,
  Users,
  Settings,
  Key,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: number
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navSections: NavSection[] = [
  {
    title: "Primary",
    items: [
      { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { label: "Agents", href: "/agents", icon: Bot, badge: 8 },
      { label: "Workflows", href: "/workflows", icon: GitBranch, badge: 3 },
      { label: "Monitor", href: "/monitor", icon: Activity },
    ],
  },
  {
    title: "Analytics",
    items: [
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "Logs", href: "/logs", icon: ScrollText },
    ],
  },
  {
    title: "Manage",
    items: [
      { label: "Team", href: "/team", icon: Users },
      { label: "Settings", href: "/settings", icon: Settings },
      { label: "API Keys", href: "/api-keys", icon: Key },
    ],
  },
]

export const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/agents": "Agent Studio",
  "/workflows": "Workflow Builder",
  "/monitor": "Live Monitor",
  "/analytics": "Analytics",
  "/logs": "Logs",
  "/team": "Team",
  "/settings": "Settings",
  "/api-keys": "API Keys",
}
