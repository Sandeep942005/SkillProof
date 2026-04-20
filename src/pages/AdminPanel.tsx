import { useState } from 'react'
import { Card, GlassCard } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

type AdminTab = 'overview' | 'users' | 'tasks' | 'disputes'

const statCards = [
  { label: 'Total Users',       value: '12,481', delta: '+3.2%', icon: '👥', color: 'text-blue-400' },
  { label: 'Active Tasks',      value: '324',    delta: '+12%',  icon: '📋', color: 'text-violet-400' },
  { label: 'Total Payouts',     value: '$284k',  delta: '+8.5%', icon: '💰', color: 'text-emerald-400' },
  { label: 'Open Disputes',     value: '7',      delta: '-2',    icon: '⚖',  color: 'text-amber-400' },
]

const recentUsers = [
  { name: 'Sarah Kim',      email: 'sarah@example.com',  role: 'candidate', score: 98, status: 'active',   joined: '2d ago' },
  { name: 'TechCorp Inc.',  email: 'hr@techcorp.io',     role: 'company',   score: null, status: 'active',  joined: '3d ago' },
  { name: 'Priya Sharma',   email: 'priya@example.com',  role: 'candidate', score: 96, status: 'active',   joined: '5d ago' },
  { name: 'ShopBase',       email: 'ops@shopbase.com',   role: 'company',   score: null, status: 'active',  joined: '1w ago' },
  { name: 'Jamal Okafor',   email: 'jamal@example.com',  role: 'candidate', score: 91, status: 'flagged',  joined: '1w ago' },
]

const recentTasks = [
  { title: 'Full-Stack E-Commerce Module', company: 'ShopBase',  prize: '$2,000', submissions: 34, status: 'active' },
  { title: 'ML Model Serving API',         company: 'DataLens',  prize: '$1,200', submissions: 12, status: 'review' },
  { title: 'Auth Flow with OAuth2',        company: 'AuthBase',  prize: '$600',   submissions: 8,  status: 'closed' },
  { title: 'React Native App Prototype',   company: 'MobileCo',  prize: '$900',   submissions: 0,  status: 'draft'  },
]

const statusBadge: Record<string, string> = {
  active:   'bg-emerald-500/15 text-emerald-400',
  review:   'bg-blue-500/15 text-blue-400',
  closed:   'bg-[var(--color-border-subtle)] text-[var(--color-text-muted)]',
  draft:    'bg-violet-500/15 text-violet-400',
  flagged:  'bg-rose-500/15 text-rose-400',
}

export default function AdminPanel() {
  const [tab, setTab] = useState<AdminTab>('overview')

  const tabs: { key: AdminTab; label: string }[] = [
    { key: 'overview',  label: 'Overview'  },
    { key: 'users',     label: 'Users'     },
    { key: 'tasks',     label: 'Tasks'     },
    { key: 'disputes',  label: 'Disputes'  },
  ]

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-[var(--color-text-muted)] mt-1">Platform management and oversight</p>
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-rose-500/15 text-rose-400 font-semibold">🔑 Admin Access</span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <GlassCard key={s.label} className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.icon}</span>
              <span className={cn('text-xs font-medium', s.delta.startsWith('+') ? 'text-emerald-400' : 'text-rose-400')}>{s.delta}</span>
            </div>
            <p className={cn('text-2xl font-bold', s.color)}>{s.value}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--color-background-elevated)] rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-all',
              tab === t.key ? 'bg-[var(--color-background-surface)] shadow-sm text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'
            )}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-5">
            <h2 className="font-semibold mb-4">Recent Registrations</h2>
            <div className="space-y-3">
              {recentUsers.slice(0, 4).map(u => (
                <div key={u.email} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {u.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{u.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{u.role} · {u.joined}</p>
                  </div>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', statusBadge[u.status])}>{u.status}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-semibold mb-4">Health Metrics</h2>
            {[
              { label: 'Platform Uptime',        value: 99.8,  suffix: '%' },
              { label: 'Avg Task Completion',     value: 73,    suffix: '%' },
              { label: 'Dispute Resolution Rate', value: 91,    suffix: '%' },
              { label: 'Escrow Success Rate',     value: 99.2,  suffix: '%' },
            ].map(m => (
              <div key={m.label} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{m.label}</span>
                  <span className="font-bold text-emerald-400">{m.value}{m.suffix}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--color-background-elevated)] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
                    style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Users */}
      {tab === 'users' && (
        <Card className="overflow-hidden">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              <span className="col-span-4">User</span>
              <span className="col-span-2">Role</span>
              <span className="col-span-2">Score</span>
              <span className="col-span-2">Joined</span>
              <span className="col-span-2 text-right">Actions</span>
            </div>
            {recentUsers.map(u => (
              <div key={u.email} className="grid grid-cols-12 items-center px-5 py-4 hover:bg-[var(--color-background-elevated)] text-sm">
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {u.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{u.email}</p>
                  </div>
                </div>
                <span className="col-span-2 capitalize text-[var(--color-text-muted)]">{u.role}</span>
                <span className="col-span-2 font-bold text-[var(--color-accent-secondary)]">{u.score ?? '—'}</span>
                <span className="col-span-2 text-[var(--color-text-muted)]">{u.joined}</span>
                <div className="col-span-2 flex justify-end gap-2">
                  <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', statusBadge[u.status])}>{u.status}</span>
                  {u.status === 'flagged' && <Button variant="outline" size="sm" className="text-xs text-rose-400 border-rose-500/30">Ban</Button>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tasks */}
      {tab === 'tasks' && (
        <Card className="overflow-hidden">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              <span className="col-span-4">Task</span>
              <span className="col-span-3">Company</span>
              <span className="col-span-2">Prize</span>
              <span className="col-span-1">Subs</span>
              <span className="col-span-2 text-right">Status</span>
            </div>
            {recentTasks.map(t => (
              <div key={t.title} className="grid grid-cols-12 items-center px-5 py-4 hover:bg-[var(--color-background-elevated)] text-sm">
                <span className="col-span-4 font-medium truncate pr-2">{t.title}</span>
                <span className="col-span-3 text-[var(--color-text-muted)]">{t.company}</span>
                <span className="col-span-2 font-semibold text-[var(--color-accent-secondary)]">{t.prize}</span>
                <span className="col-span-1 text-[var(--color-text-muted)]">{t.submissions}</span>
                <div className="col-span-2 text-right">
                  <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', statusBadge[t.status])}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Disputes */}
      {tab === 'disputes' && (
        <Card className="p-6">
          <div className="space-y-4">
            {[
              { id: 'D-001', user: 'Alex Chen',  task: 'Real-Time Chat',     type: 'Score',   priority: 'medium', age: '3d' },
              { id: 'D-003', user: 'Maria R.',   task: 'ML API Serving',     type: 'Payment', priority: 'high',   age: '1d' },
              { id: 'D-004', user: 'Tom Wilson', task: 'CI/CD Pipeline',     type: 'Score',   priority: 'low',    age: '5d' },
            ].map(d => (
              <div key={d.id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-background-elevated)]">
                <span className="font-mono text-xs text-[var(--color-text-muted)] shrink-0">{d.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{d.user} — {d.task}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{d.type} dispute · {d.age} old</p>
                </div>
                <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium shrink-0',
                  d.priority === 'high' ? 'bg-rose-500/15 text-rose-400' : d.priority === 'medium' ? 'bg-amber-500/15 text-amber-400' : 'bg-blue-500/15 text-blue-400'
                )}>
                  {d.priority}
                </span>
                <Button variant="outline" size="sm" className="shrink-0">Review</Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
