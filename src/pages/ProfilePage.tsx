import { useState } from 'react'
import { Card, GlassCard } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

const skillHistory = [
  { month: 'Oct', score: 62 }, { month: 'Nov', score: 70 }, { month: 'Dec', score: 75 },
  { month: 'Jan', score: 79 }, { month: 'Feb', score: 83 }, { month: 'Mar', score: 88 },
  { month: 'Apr', score: 94 },
]

const skills = [
  { name: 'React / Frontend', score: 95, tasks: 8 },
  { name: 'TypeScript', score: 92, tasks: 12 },
  { name: 'Node.js / Backend', score: 88, tasks: 6 },
  { name: 'System Design', score: 80, tasks: 4 },
  { name: 'Testing', score: 74, tasks: 5 },
]

const badges = [
  { icon: '🔥', label: 'Top 5%', desc: 'Ranked in top 5% globally' },
  { icon: '⚡', label: 'Speed Runner', desc: '5+ tasks within deadline with top score' },
  { icon: '🎯', label: 'Precision', desc: '90%+ average score across all tasks' },
  { icon: '💎', label: 'Elite', desc: '50+ submissions reviewed' },
  { icon: '🤝', label: 'Hired', desc: 'Accepted a job offer via SkillProof' },
  { icon: '🌟', label: 'First Task', desc: 'Completed your first task' },
]

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState('Full-stack engineer specializing in React and Node.js. Building products that scale.')
  const [headline, setHeadline] = useState('Senior Full-Stack Engineer')

  const currentScore = 94

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button variant={editing ? 'primary' : 'outline'} onClick={() => setEditing(e => !e)}>
          {editing ? '✓ Save Profile' : '✎ Edit Profile'}
        </Button>
      </div>

      {/* Profile Hero */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-3xl font-bold">
              AC
            </div>
            {editing && (
              <button className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[var(--color-accent-primary)] text-white text-xs flex items-center justify-center">
                📷
              </button>
            )}
          </div>
          <div className="flex-1">
            {editing ? (
              <input value={headline} onChange={e => setHeadline(e.target.value)}
                className="w-full text-xl font-bold bg-transparent border-b border-[var(--color-accent-primary)] focus:outline-none mb-2 pb-1" />
            ) : (
              <h2 className="text-xl font-bold mb-1">{headline}</h2>
            )}
            <p className="text-[var(--color-text-muted)] text-sm mb-2">Alex Chen · San Francisco, CA</p>
            {editing ? (
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={2}
                className="w-full text-sm bg-[var(--color-background-elevated)] rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-primary)]" />
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">{bio}</p>
            )}
          </div>
          <div className="text-center shrink-0">
            <p className="text-4xl font-bold text-gradient">{currentScore}</p>
            <p className="text-xs text-[var(--color-text-muted)]">SkillScore™</p>
          </div>
        </div>
      </GlassCard>

      {/* SkillScore History Chart */}
      <Card className="p-5">
        <h2 className="text-base font-semibold mb-4">SkillScore™ Progress</h2>
        <div className="flex items-end gap-3 h-24">
          {skillHistory.map(({ month, score }, i) => {
            const isLast = i === skillHistory.length - 1
            const pct = (score / 100) * 100
            return (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-[var(--color-text-muted)]">{score}</span>
                <div className="w-full rounded-t-md" style={{ height: `${pct}%` }}>
                  <div className={cn('w-full h-full rounded-t-md',
                    isLast ? 'bg-gradient-to-t from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]' : 'bg-[var(--color-accent-primary)]/30'
                  )} />
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)]">{month}</span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Skill Breakdown */}
      <Card className="p-5">
        <h2 className="text-base font-semibold mb-4">Skill Breakdown</h2>
        <div className="space-y-4">
          {skills.map(s => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{s.name}</span>
                <span className="text-[var(--color-text-muted)]">{s.tasks} tasks · {s.score}/100</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[var(--color-background-elevated)] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
                  style={{ width: `${s.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Badges */}
      <Card className="p-5">
        <h2 className="text-base font-semibold mb-4">Badges & Achievements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {badges.map(b => (
            <div key={b.label} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-background-elevated)] hover:bg-[var(--color-background-surface)] transition-colors">
              <span className="text-2xl shrink-0">{b.icon}</span>
              <div>
                <p className="text-sm font-semibold">{b.label}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
