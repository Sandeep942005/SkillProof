import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, GlassCard } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

const taskMeta = {
  title: 'Full-Stack E-Commerce Module',
  prize: 2000,
  deadline: '3d 10h',
  totalSlots: 50,
}

const submissions = [
  { id: 'sub-1', candidate: 'Alex Chen', avatar: 'AC', score: null, status: 'pending', submittedAt: '30m ago', loc: 342 },
  { id: 'sub-2', candidate: 'Maria R.', avatar: 'MR', score: 91, status: 'approved', submittedAt: '2h ago', loc: 518 },
  { id: 'sub-3', candidate: 'Jamal O.', avatar: 'JO', score: 74, status: 'rejected', submittedAt: '3h ago', loc: 289 },
  { id: 'sub-4', candidate: 'Sarah K.', avatar: 'SK', score: null, status: 'pending', submittedAt: '5h ago', loc: 401 },
  { id: 'sub-5', candidate: 'Priya S.', avatar: 'PS', score: 88, status: 'approved', submittedAt: '7h ago', loc: 476 },
  { id: 'sub-6', candidate: 'Tom W.', avatar: 'TW', score: null, status: 'in-review', submittedAt: '8h ago', loc: 362 },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  pending:   { label: 'Pending',   color: 'bg-[var(--color-border-subtle)] text-[var(--color-text-muted)]' },
  'in-review': { label: 'In Review', color: 'bg-amber-500/15 text-amber-400' },
  approved:  { label: 'Approved',  color: 'bg-emerald-500/15 text-emerald-400' },
  rejected:  { label: 'Rejected',  color: 'bg-rose-500/15 text-rose-400' },
}

export default function LiveTaskManagement() {
  const { id } = useParams()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = submissions.filter(s => {
    const matchStatus = filter === 'all' || s.status === filter
    const matchSearch = s.candidate.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const counts = {
    all: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    'in-review': submissions.filter(s => s.status === 'in-review').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
  }

  const approvedCount = counts.approved
  const fillPct = (submissions.length / taskMeta.totalSlots) * 100

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
            <Link to="/company/dashboard" className="hover:text-[var(--color-accent-primary)] transition-colors">Dashboard</Link>
            <span>/</span><span>Live Task</span>
          </div>
          <h1 className="text-2xl font-bold">{taskMeta.title}</h1>
        </div>
        <div className="flex gap-2">
          <Link to={`/company/tasks/${id}/review`}>
            <Button variant="outline" size="sm">Batch Review</Button>
          </Link>
          <Button variant="primary" size="sm">Close Task</Button>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Submissions', value: submissions.length, icon: '📥' },
          { label: 'Prize Pool', value: `$${taskMeta.prize.toLocaleString()}`, icon: '💰' },
          { label: 'Approved', value: approvedCount, icon: '✅' },
          { label: 'Deadline', value: taskMeta.deadline, icon: '⏱' },
        ].map(stat => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">{stat.label}</p>
                <p className="text-xl font-bold mt-1">{stat.value}</p>
              </div>
              <span className="text-xl">{stat.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Submission Fill Meter */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-[var(--color-text-muted)]">Submission Capacity</span>
          <span className="font-medium">{submissions.length} / {taskMeta.totalSlots}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--color-background-elevated)] overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] transition-all duration-700"
            style={{ width: `${fillPct}%` }} />
        </div>
      </GlassCard>

      {/* Filter Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 bg-[var(--color-background-elevated)] rounded-xl p-1 flex-wrap">
          {(['all', 'pending', 'in-review', 'approved', 'rejected'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize',
                filter === f ? 'bg-[var(--color-background-surface)] text-[var(--color-text-primary)] shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              )}>
              {f} ({counts[f as keyof typeof counts]})
            </button>
          ))}
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search candidates..."
          className="px-4 py-2 bg-[var(--color-background-surface)] border border-[var(--color-border-subtle)] rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent-primary)]" />
      </div>

      {/* Submissions Table */}
      <Card className="overflow-hidden">
        <div className="divide-y divide-[var(--color-border-subtle)]">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
            <span className="col-span-4">Candidate</span>
            <span className="col-span-2">LoC</span>
            <span className="col-span-2">Submitted</span>
            <span className="col-span-2">Score</span>
            <span className="col-span-2">Status</span>
          </div>
          {filtered.map(sub => (
            <div key={sub.id} className="grid grid-cols-12 items-center px-5 py-4 hover:bg-[var(--color-background-elevated)] transition-colors">
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {sub.avatar}
                </div>
                <Link to={`/company/candidates/${sub.id}`} className="font-medium hover:text-[var(--color-accent-primary)] transition-colors text-sm">
                  {sub.candidate}
                </Link>
              </div>
              <span className="col-span-2 text-sm text-[var(--color-text-muted)]">{sub.loc}</span>
              <span className="col-span-2 text-sm text-[var(--color-text-muted)]">{sub.submittedAt}</span>
              <span className="col-span-2 text-sm font-semibold">
                {sub.score !== null ? <span className="text-[var(--color-accent-secondary)]">{sub.score}</span> : <span className="text-[var(--color-text-muted)]">—</span>}
              </span>
              <div className="col-span-2">
                <span className={cn('text-xs px-2 py-1 rounded-full font-medium', statusConfig[sub.status].color)}>
                  {statusConfig[sub.status].label}
                </span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center text-[var(--color-text-muted)]">No submissions match your filter</div>
          )}
        </div>
      </Card>
    </div>
  )
}
