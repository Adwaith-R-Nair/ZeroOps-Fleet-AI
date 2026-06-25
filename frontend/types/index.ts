export type AgentStatus = "active" | "idle" | "error" | "offline"
export type ExecutionStatus = "success" | "failed" | "running"
export type SandboxStatus = "running" | "provisioning" | "terminated"
export type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG"
export type ModelProvider = "AWS Bedrock" | "OpenAI" | "Ollama"

export interface Agent {
  id: string
  name: string
  emoji: string
  description: string
  status: AgentStatus
  tags: string[]
  provider: ModelProvider
  model: string
  runs: number
  cpu: number
  runtime: string
}

export interface Execution {
  id: string
  agentName: string
  agentEmoji: string
  task: string
  status: ExecutionStatus
  duration: string
  timeAgo: string
}

export interface Sandbox {
  id: string
  agentName: string
  agentEmoji: string
  status: SandboxStatus
  cpu: number
  memory: number
  runtime: string
}

export interface LogLine {
  id: string
  timestamp: string
  level: LogLevel
  message: string
}

export interface ChatMessage {
  id: string
  role: "agent" | "user"
  author: string
  emoji: string
  content: string
  timestamp: string
}

export interface LeaderboardRow {
  rank: number
  agentName: string
  agentEmoji: string
  runs: number
  successRate: number
  avgTime: string
  tokens: string
}

export interface NotificationItem {
  id: string
  title: string
  description: string
  timeAgo: string
  read: boolean
  type: "success" | "warning" | "error" | "info"
}

export interface Team {
  id: string
  name: string
  plan: string
  initials: string
}
