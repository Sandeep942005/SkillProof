import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, GlassCard } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

const rubric = [
  { criterion: 'Functionality', weight: 30 },
  { criterion: 'Code Quality', weight: 25 },
  { criterion: 'Performance', weight: 20 },
  { criterion: 'UI/UX', weight: 15 },
  { criterion: 'Documentation', weight: 10 },
]

type Scores = Record<string, number>

const candidates = [
  { id: 'sub-1', name: 'Alex Chen', avatar: 'AC', loc: 342, timeSpent: '3h 12m', submittedAt: '30m ago' },
  { id: 'sub-4', name: 'Sarah Kim', avatar: 'SK', loc: 401, timeSpent: '4h 05m', submittedAt: '5h ago' },
  { id: 'sub-6', name: 'Tom Wilson', avatar: 'TW', loc: 362, timeSpent: '2h 48m', submittedAt: '8h ago' },
]

export default function ReviewDashboard() {
  const { id } = useParams()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [scores, setScores] = useState<Record<string, Scores>>({})
  const [feedback, setFeedback] = useState<Record<string, string>>({})
  const [decisions, setDecisions] = useState<Record<string, 'approve' | 'reject' | null>>({})

  const candidate = candidates[currentIdx]
  const candScores: Scores = scores[candidate.id] || {}
  const totalScore = rubric.reduce((sum, r) => sum + ((candScores[r.criterion] || 0) * r.weight) / 100, 0)
  const allScored = rubric.every(r => candScores[r.criterion] !== undefined)

  const setScore = (criterion: string, val: number) =>
    setScores(s => ({ ...s, [candidate.id]: { ...s[candidate.id], [criterion]: val } }))

  const reviewed = Object.keys(decisions).length

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex gap-2 text-sm text-[var(--color-text-muted)] mb-1">
            <Link to={`/company/tasks/${id}/live`} className="hover:text-[var(--color-accent-primary)] transition-colors">Live Task</Link>
            <span>/</span><span>Batch Review</span>
          </div>
          <h1 className="text-2xl font-bold">Review Dashboard</h1>
        </div>
        <div className="text-sm text-[var(--color-text-muted)]">
          {reviewed} / {candidates.length} reviewed
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 w-full rounded-full bg-[var(--color-background-elevated)] overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] transition-all duration-500"
          style={{ width: `${(reviewed / candidates.length) * 100}%` }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Switcher */}
        <Card className="p-4 lg:col-span-1 self-start">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Queue</p>
          <div className="space-y-2">
            {candidates.map((c, i) => (
              <button key={c.id} onClick={() => setCurrentIdx(i)}
                className={cn('w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all',
                  i === currentIdx ? 'bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/20' : 'hover:bg-[var(--color-background-elevated)]'
                )}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{c.submittedAt}</p>
                </div>
                {decisions[c.id] && (
                  <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium shrink-0',
                    decisions[c.id] === 'approve' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                  )}>
                    {decisions[c.id] === 'approve' ? '✓' : '✕'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Scoring Panel */}
        <div className="lg:col-span-2 space-y-4">
          <GlassCard className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-sm font-bold">
                {candidate.avatar}
              </div>
              <div>
                <p className="font-semibold">{candidate.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{candidate.loc} lines · {candidate.timeSpent}</p>
              </div>
              {allScored && (
                <div className="ml-auto text-center">
                  <p className="text-2xl font-bold text-gradient">{Math.round(totalScore)}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">/ 100</p>
                </div>
              )}
            </div>
          </GlassCard>

          <Card className="p-5 space-y-4">
            <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Score by Criterion</p>
            {rubric.map(r => (
              <div key={r.criterion}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{r.criterion}</span>
                  <span className="text-[var(--color-text-muted)]">{r.weight}% weight</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="range" min={0} max={100} value={candScores[r.criterion] ?? 50}
                    onChange={e => setScore(r.criterion, parseInt(e.target.value))}
                    className="flex-1 accent-[var(--color-accent-primary)]" />
                  <span className="w-8 text-center text-sm font-bold text-[var(--color-accent-secondary)]">
                    {candScores[r.criterion] ?? '—'}
                  </span>
                </div>
              </div>
            ))}
          </Card>

          <Card className="p-5">
            <label className="text-sm font-medium block mb-2">Feedback for Candidate</label>
            <textarea value={feedback[candidate.id] || ''} rows={3}
              onChange={e => setFeedback(f => ({ ...f, [candidate.id]: e.target.value }))}
              placeholder="Leave constructive feedback..."
              className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl text-sm resize-none focus:outline-none focus:border-[var(--color-accent-primary)]" />
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
              onClick={() => { setDecisions(d => ({ ...d, [candidate.id]: 'reject' })); if (currentIdx < candidates.length - 1) setCurrentIdx(i => i + 1) }}>
              ✕ Reject
            </Button>
            <Button variant="primary" className="flex-1" disabled={!allScored}
              onClick={() => { setDecisions(d => ({ ...d, [candidate.id]: 'approve' })); if (currentIdx < candidates.length - 1) setCurrentIdx(i => i + 1) }}>
              ✓ Approve & Release Escrow
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
