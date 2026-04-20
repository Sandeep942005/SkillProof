import { Card, GlassCard } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

// Mock data
const pipelineStages = [
  { label: 'Open Tasks', count: 5, color: 'bg-violet-500' },
  { label: 'In Progress', count: 12, color: 'bg-cyan-500' },
  { label: 'Under Review', count: 8, color: 'bg-amber-500' },
  { label: 'Completed', count: 34, color: 'bg-emerald-500' },
]

const escrowSummary = {
  locked: '$12,400',
  released: '$28,750',
  pending: '$3,200',
}

const activePosts = [
  {
    id: '101',
    title: 'Full-Stack E-Commerce Module',
    submissions: 24,
    reviewed: 18,
    prizePool: '$2,000',
    deadline: '3d 10h',
    status: 'active',
  },
  {
    id: '102',
    title: 'Cloud Infrastructure Migration Plan',
    submissions: 8,
    reviewed: 8,
    prizePool: '$1,500',
    deadline: '1d 5h',
    status: 'review',
  },
  {
    id: '103',
    title: 'Mobile App UI Component Library',
    submissions: 15,
    reviewed: 3,
    prizePool: '$1,200',
    deadline: '6d 0h',
    status: 'active',
  },
]

const topCandidates = [
  { name: 'Alex Chen', score: 96, skills: ['React', 'TypeScript', 'Node.js'], tasks: 5, avatar: 'AC' },
  { name: 'Maria Rodriguez', score: 93, skills: ['Python', 'AWS', 'Docker'], tasks: 4, avatar: 'MR' },
  { name: 'Jamal Okafor', score: 91, skills: ['Go', 'Kubernetes', 'gRPC'], tasks: 3, avatar: 'JO' },
  { name: 'Sarah Kim', score: 89, skills: ['React', 'GraphQL', 'CSS'], tasks: 6, avatar: 'SK' },
]

const recentHires = [
  { candidate: 'Priya Sharma', task: 'API Redesign', cost: '$800', date: '2d ago', rating: 4.9 },
  { candidate: 'Tom Wilson', task: 'Data Pipeline', cost: '$1,200', date: '5d ago', rating: 4.7 },
  { candidate: 'Lin Wei', task: 'Auth System', cost: '$600', date: '1w ago', rating: 5.0 },
]

// Funnel bar component
function FunnelBar({ stage, maxCount }: { stage: typeof pipelineStages[0]; maxCount: number }) {
  const width = Math.max(20, (stage.count / maxCount) * 100)
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[var(--color-text-muted)] w-28 shrink-0">{stage.label}</span>
      <div className="flex-1 h-8 bg-[var(--color-background-elevated)] rounded-lg overflow-hidden">
        <div
          className={`h-full ${stage.color} rounded-lg flex items-center justify-end pr-3 transition-all duration-700`}
          style={{ width: `${width}%` }}
        >
          <span className="text-xs font-bold text-white">{stage.count}</span>
        </div>
      </div>
    </div>
  )
}

export default function CompanyDashboard() {
  const maxCount = Math.max(...pipelineStages.map((s) => s.count))

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Company Dashboard</h1>
          <p className="text-[var(--color-text-muted)] mt-1">Manage your hiring pipeline & escrow</p>
        </div>
        <Button variant="primary">
          + Post New Task
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Tasks', value: '5', change: '+2', icon: '📋', accent: 'text-violet-400' },
          { label: 'Total Submissions', value: '47', change: '+12 this week', icon: '📥', accent: 'text-cyan-400' },
          { label: 'Avg Review Time', value: '1.8d', change: '-0.3d vs avg', icon: '⏱', accent: 'text-amber-400' },
          { label: 'Hires Made', value: '11', change: '92% retention', icon: '✅', accent: 'text-emerald-400' },
        ].map((kpi) => (
          <Card key={kpi.label} className="p-5 hover:border-[var(--color-accent-primary)]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent-primary)]/5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">{kpi.label}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                <p className={`text-xs mt-1 ${kpi.accent}`}>{kpi.change}</p>
              </div>
              <span className="text-2xl">{kpi.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Pipeline + Escrow Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Funnel */}
        <GlassCard className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Hiring Pipeline</h2>
          <div className="space-y-3">
            {pipelineStages.map((stage) => (
              <FunnelBar key={stage.label} stage={stage} maxCount={maxCount} />
            ))}
          </div>
        </GlassCard>

        {/* Escrow Summary */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold mb-4">Escrow Overview</h2>
          <div className="space-y-5">
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Locked in Escrow</p>
              <p className="text-3xl font-bold text-amber-400 mt-1">{escrowSummary.locked}</p>
            </div>
            <div className="h-px bg-[var(--color-border-subtle)]" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">Released</p>
                <p className="text-xl font-semibold text-emerald-400">{escrowSummary.released}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">Pending Review</p>
                <p className="text-xl font-semibold text-cyan-400">{escrowSummary.pending}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Billing →
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* Active Task Posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Active Tasks</h2>
          <Link to="/company/tasks/new" className="text-sm text-[var(--color-accent-primary)] hover:underline">
            Post New Task →
          </Link>
        </div>
        <div className="space-y-3">
          {activePosts.map((task) => (
            <Card
              key={task.id}
              className="p-5 hover:border-[var(--color-accent-primary)]/30 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {task.title}
                    </h3>
                    <span
                      className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                        task.status === 'review'
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-emerald-500/15 text-emerald-400'
                      }`}
                    >
                      {task.status === 'review' ? 'Under Review' : 'Active'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {task.reviewed}/{task.submissions} reviewed · Prize: {task.prizePool}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-medium">{task.submissions} submissions</p>
                    <p className="text-xs text-[var(--color-text-muted)]">⏱ {task.deadline} left</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-[var(--color-border-subtle)] flex items-center justify-center">
                    <span className="text-sm font-bold text-[var(--color-accent-secondary)]">
                      {Math.round((task.reviewed / task.submissions) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Row: Top Candidates + Recent Hires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Candidates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Top Candidates</h2>
            <Link to="/company/talent" className="text-sm text-[var(--color-accent-primary)] hover:underline">
              View Talent Pool →
            </Link>
          </div>
          <Card className="divide-y divide-[var(--color-border-subtle)]">
            {topCandidates.map((c) => (
              <div key={c.name} className="p-4 flex items-center gap-4 hover:bg-[var(--color-background-elevated)] transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{c.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {c.skills.map((s) => (
                      <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-[var(--color-background-elevated)] text-[var(--color-text-muted)]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-[var(--color-accent-primary)]">{c.score}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{c.tasks} tasks</p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Recent Hires */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Hires</h2>
          <Card className="divide-y divide-[var(--color-border-subtle)]">
            {recentHires.map((hire) => (
              <div key={hire.candidate} className="p-4 flex items-center justify-between hover:bg-[var(--color-background-elevated)] transition-colors">
                <div>
                  <p className="font-medium">{hire.candidate}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{hire.task}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[var(--color-accent-secondary)]">{hire.cost}</p>
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-amber-400 text-xs">★ {hire.rating}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">· {hire.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
