import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, GlassCard } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

const STEPS = ['Task Details', 'Evaluation Rubric', 'Escrow & Prize', 'Review & Post']

type RubricItem = { criterion: string; weight: number; description: string }

type FormData = {
  title: string
  category: string
  difficulty: string
  description: string
  maxSubmissions: string
  deadline: string
  tags: string
  rubric: RubricItem[]
  prizePool: string
  currency: string
}

const defaultRubric: RubricItem[] = [
  { criterion: 'Functionality', weight: 40, description: 'Core features work as required' },
  { criterion: 'Code Quality', weight: 30, description: 'Clean, maintainable, well-typed code' },
  { criterion: 'Testing', weight: 20, description: 'Tests covering key paths' },
  { criterion: 'Documentation', weight: 10, description: 'README and inline docs' },
]

export default function PostTask() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<FormData>({
    title: '',
    category: 'Frontend',
    difficulty: 'Intermediate',
    description: '',
    maxSubmissions: '50',
    deadline: '7',
    tags: '',
    rubric: defaultRubric,
    prizePool: '',
    currency: 'USD',
  })

  const set = (field: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }))

  const totalWeight = form.rubric.reduce((s, r) => s + r.weight, 0)
  const weightOk = totalWeight === 100

  const handlePost = () => {
    setSubmitting(true)
    setTimeout(() => navigate('/company/dashboard'), 1800)
  }

  return (
    <div className="max-w-3xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Post a Task</h1>
        <p className="text-[var(--color-text-muted)]">Define your challenge and fund the escrow prize pool</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all',
                i < step ? 'bg-[var(--color-accent-primary)] border-[var(--color-accent-primary)] text-white'
                  : i === step ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]'
                  : 'border-[var(--color-border-subtle)] text-[var(--color-text-muted)]'
              )}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={cn('text-xs mt-1 hidden sm:block whitespace-nowrap',
                i === step ? 'text-[var(--color-accent-primary)] font-medium' : 'text-[var(--color-text-muted)]'
              )}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn('flex-1 h-0.5 mx-2 rounded transition-all', i < step ? 'bg-[var(--color-accent-primary)]' : 'bg-[var(--color-border-subtle)]')} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Task Details */}
      {step === 0 && (
        <Card className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Task Title *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)}
              placeholder="e.g. Build a Real-Time Notification System"
              className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-[var(--color-accent-primary)] text-sm">
                {['Frontend', 'Backend', 'Full Stack', 'DevOps', 'AI/ML', 'Design'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <select value={form.difficulty} onChange={e => set('difficulty', e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-[var(--color-accent-primary)] text-sm">
                {['Beginner', 'Intermediate', 'Advanced'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description *</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)}
              rows={5} placeholder="Describe what candidates need to build, key features, and acceptance criteria..."
              className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-[var(--color-accent-primary)] resize-none text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Deadline (days)</label>
              <input type="number" min="1" max="30" value={form.deadline} onChange={e => set('deadline', e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-[var(--color-accent-primary)] text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Submissions</label>
              <input type="number" min="5" max="200" value={form.maxSubmissions} onChange={e => set('maxSubmissions', e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-[var(--color-accent-primary)] text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags (comma-separated)</label>
            <input value={form.tags} onChange={e => set('tags', e.target.value)}
              placeholder="React, TypeScript, WebSocket"
              className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-[var(--color-accent-primary)] text-sm" />
          </div>

          <Button variant="primary" className="w-full" disabled={!form.title || !form.description}
            onClick={() => setStep(1)}>
            Continue → Rubric
          </Button>
        </Card>
      )}

      {/* Step 1: Rubric */}
      {step === 1 && (
        <Card className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Evaluation Rubric</h2>
            <span className={cn('text-sm font-medium', weightOk ? 'text-emerald-400' : 'text-rose-400')}>
              Total: {totalWeight}% {weightOk ? '✓' : '(must equal 100%)'}
            </span>
          </div>

          <div className="space-y-3">
            {form.rubric.map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-[var(--color-border-subtle)] space-y-2">
                <div className="flex gap-3">
                  <input value={item.criterion}
                    onChange={e => {
                      const r = [...form.rubric]; r[i] = { ...r[i], criterion: e.target.value }
                      setForm(f => ({ ...f, rubric: r }))
                    }}
                    placeholder="Criterion name"
                    className="flex-1 px-3 py-2 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent-primary)]" />
                  <div className="flex items-center gap-2">
                    <input type="number" min="0" max="100" value={item.weight}
                      onChange={e => {
                        const r = [...form.rubric]; r[i] = { ...r[i], weight: parseInt(e.target.value) || 0 }
                        setForm(f => ({ ...f, rubric: r }))
                      }}
                      className="w-16 px-2 py-2 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-lg text-sm text-center focus:outline-none focus:border-[var(--color-accent-primary)]" />
                    <span className="text-sm text-[var(--color-text-muted)]">%</span>
                  </div>
                </div>
                <input value={item.description}
                  onChange={e => {
                    const r = [...form.rubric]; r[i] = { ...r[i], description: e.target.value }
                    setForm(f => ({ ...f, rubric: r }))
                  }}
                  placeholder="Description of what this criterion evaluates"
                  className="w-full px-3 py-2 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent-primary)]" />
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(0)}>← Back</Button>
            <Button variant="primary" className="flex-1" disabled={!weightOk} onClick={() => setStep(2)}>
              Continue → Prize Pool
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Escrow & Prize */}
      {step === 2 && (
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Prize Pool Amount *</label>
            <div className="flex gap-3">
              <select value={form.currency} onChange={e => set('currency', e.target.value)}
                className="px-3 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl text-sm focus:outline-none">
                {['USD', 'EUR', 'GBP', 'INR'].map(c => <option key={c}>{c}</option>)}
              </select>
              <input type="number" min="100" value={form.prizePool} onChange={e => set('prizePool', e.target.value)}
                placeholder="e.g. 1000"
                className="flex-1 px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-[var(--color-accent-primary)] text-sm" />
            </div>
          </div>

          <GlassCard className="p-5 space-y-3">
            <h3 className="font-semibold text-sm">Escrow Breakdown</h3>
            {[
              { label: 'Prize Pool', value: form.prizePool ? `${form.currency} ${parseInt(form.prizePool).toLocaleString()}` : '--', accent: false },
              { label: 'Platform Fee (5%)', value: form.prizePool ? `${form.currency} ${Math.round(parseInt(form.prizePool) * 0.05).toLocaleString()}` : '--', accent: false },
              { label: 'Total to Lock', value: form.prizePool ? `${form.currency} ${Math.round(parseInt(form.prizePool) * 1.05).toLocaleString()}` : '--', accent: true },
            ].map(row => (
              <div key={row.label} className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">{row.label}</span>
                <span className={cn('font-semibold', row.accent ? 'text-[var(--color-accent-secondary)]' : '')}>{row.value}</span>
              </div>
            ))}
          </GlassCard>

          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-sm text-amber-400">
            ⚠ Funds will be locked in escrow on task publish. Released to winners after review approval.
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(1)}>← Back</Button>
            <Button variant="primary" className="flex-1" disabled={!form.prizePool} onClick={() => setStep(3)}>
              Continue → Review
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Review & Post */}
      {step === 3 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-lg font-semibold">Review Your Task</h2>

          <div className="space-y-3">
            {[
              { label: 'Title', value: form.title },
              { label: 'Category', value: `${form.category} · ${form.difficulty}` },
              { label: 'Deadline', value: `${form.deadline} days` },
              { label: 'Max Submissions', value: form.maxSubmissions },
              { label: 'Prize Pool', value: `${form.currency} ${parseInt(form.prizePool || '0').toLocaleString()}` },
              { label: 'Tags', value: form.tags || 'None' },
            ].map(row => (
              <div key={row.label} className="flex justify-between py-2 border-b border-[var(--color-border-subtle)] last:border-0 text-sm">
                <span className="text-[var(--color-text-muted)]">{row.label}</span>
                <span className="font-medium">{row.value}</span>
              </div>
            ))}
          </div>

          <div>
            <p className="text-sm text-[var(--color-text-muted)] mb-2">Rubric ({form.rubric.length} criteria)</p>
            <div className="flex flex-wrap gap-2">
              {form.rubric.map(r => (
                <span key={r.criterion} className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]">
                  {r.criterion}: {r.weight}%
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(2)}>← Back</Button>
            <Button variant="primary" className="flex-1" onClick={handlePost} disabled={submitting}>
              {submitting ? 'Publishing & Locking Escrow...' : '🚀 Publish Task'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
