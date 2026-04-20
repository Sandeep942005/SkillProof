import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, GlassCard } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

// Mock data
const skillScoreData = {
  overall: 82,
  breakdown: [
    { label: 'React/TypeScript', score: 91, color: 'from-violet-500 to-cyan-400' },
    { label: 'System Design', score: 78, color: 'from-cyan-400 to-emerald-400' },
    { label: 'API Integration', score: 85, color: 'from-emerald-400 to-amber-400' },
    { label: 'UI/UX Execution', score: 74, color: 'from-pink-500 to-violet-500' },
  ],
}

const activeTasks = [
  {
    id: '1',
    title: 'Build a Real-Time Chat Component',
    company: 'StreamLine Inc.',
    prize: '$500',
    deadline: '2d 14h',
    status: 'in-progress',
    progress: 65,
    tags: ['React', 'WebSocket', 'TypeScript'],
  },
  {
    id: '2',
    title: 'Design REST API for E-Commerce',
    company: 'ShopBase',
    prize: '$750',
    deadline: '5d 8h',
    status: 'submitted',
    progress: 100,
    tags: ['Node.js', 'REST', 'PostgreSQL'],
  },
  {
    id: '3',
    title: 'Dashboard Analytics Widget',
    company: 'MetricsHub',
    prize: '$350',
    deadline: '1d 3h',
    status: 'in-progress',
    progress: 30,
    tags: ['React', 'D3.js', 'CSS'],
  },
]

const recommendations = [
  {
    id: '10',
    title: 'Auth Flow with OAuth2 & JWT',
    company: 'SecureStack',
    prize: '$600',
    match: 94,
    tags: ['Auth', 'Node.js', 'JWT'],
  },
  {
    id: '11',
    title: 'Mobile-First Landing Page',
    company: 'LaunchPad',
    prize: '$400',
    match: 88,
    tags: ['React', 'CSS', 'Responsive'],
  },
  {
    id: '12',
    title: 'GraphQL API Migration',
    company: 'DataLens',
    prize: '$900',
    match: 82,
    tags: ['GraphQL', 'TypeScript', 'Apollo'],
  },
]

const recentActivity = [
  { icon: '✅', text: 'Submitted "REST API Design" task', time: '2h ago' },
  { icon: '⭐', text: 'SkillScore updated: +3 points', time: '5h ago' },
  { icon: '💰', text: 'Earned $500 from "Chat Widget" task', time: '1d ago' },
  { icon: '📋', text: 'Joined "Dashboard Analytics" task', time: '2d ago' },
]

// Circular progress component
function SkillScoreRing({ score, size = 160 }: { score: number; size?: number }) {
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border-subtle)"
          strokeWidth={strokeWidth}
          opacity={0.3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-primary)" />
            <stop offset="100%" stopColor="var(--color-accent-secondary)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-gradient">{score}</span>
        <span className="text-xs text-[var(--color-text-muted)] mt-1">/ 100</span>
      </div>
    </div>
  )
}

// Progress bar component
function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-1.5 w-full rounded-full bg-[var(--color-background-elevated)] overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default function CandidateDashboard() {
  const [greeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  })

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{greeting}, Developer 👋</h1>
        <p className="text-[var(--color-text-muted)] mt-1">Here's your performance overview</p>
      </div>

      {/* Top Row: SkillScore + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SkillScore Widget */}
        <GlassCard className="p-6 lg:col-span-1 flex flex-col items-center">
          <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
            SkillScore™
          </h2>
          <SkillScoreRing score={skillScoreData.overall} />
          <div className="w-full mt-6 space-y-3">
            {skillScoreData.breakdown.map((skill) => (
              <div key={skill.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--color-text-secondary)]">{skill.label}</span>
                  <span className="font-medium">{skill.score}</span>
                </div>
                <ProgressBar value={skill.score} />
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {[
            { label: 'Tasks Completed', value: '14', sub: '+3 this month', icon: '🏆' },
            { label: 'Total Earnings', value: '$4,250', sub: '+$750 pending', icon: '💰' },
            { label: 'Success Rate', value: '92%', sub: '13/14 approved', icon: '📈' },
            { label: 'Leaderboard Rank', value: '#47', sub: 'Top 5%', icon: '🥇' },
          ].map((stat) => (
            <Card key={stat.label} className="p-5 hover:border-[var(--color-accent-primary)]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent-primary)]/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-[var(--color-accent-secondary)] mt-1">{stat.sub}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Tasks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Active Tasks</h2>
          <Link to="/tasks" className="text-sm text-[var(--color-accent-primary)] hover:underline">
            Browse Marketplace →
          </Link>
        </div>
        <div className="space-y-3">
          {activeTasks.map((task) => (
            <Card
              key={task.id}
              className="p-5 hover:border-[var(--color-accent-primary)]/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {task.title}
                    </h3>
                    <span
                      className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                        task.status === 'submitted'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {task.status === 'submitted' ? 'Submitted' : 'In Progress'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">{task.company}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-background-elevated)] text-[var(--color-text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <p className="font-semibold text-[var(--color-accent-secondary)]">{task.prize}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">⏱ {task.deadline}</p>
                  </div>
                  <div className="w-16">
                    <div className="text-xs text-center text-[var(--color-text-muted)] mb-1">{task.progress}%</div>
                    <ProgressBar value={task.progress} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Row: Recommendations + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recommended Tasks */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
          <div className="space-y-3">
            {recommendations.map((task) => (
              <Card
                key={task.id}
                className="p-5 hover:border-[var(--color-accent-primary)]/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold truncate group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {task.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{task.company}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-background-elevated)] text-[var(--color-text-secondary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-semibold text-[var(--color-accent-secondary)]">{task.prize}</p>
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] font-medium">
                      {task.match}% match
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <Card className="p-4">
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
              <Button variant="ghost" size="sm" className="w-full text-[var(--color-text-muted)]">
                View All Activity →
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
