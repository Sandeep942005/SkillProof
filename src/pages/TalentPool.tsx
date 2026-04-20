import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

const candidates = [
  { id: 'c1', name: 'Alex Chen', avatar: 'AC', title: 'Full-Stack Engineer', skillScore: 96, tasks: 18, successRate: 94, skills: ['React', 'TypeScript', 'Node.js'], saved: true, location: 'San Francisco, CA' },
  { id: 'c2', name: 'Maria Rodriguez', avatar: 'MR', title: 'Backend Engineer', skillScore: 93, tasks: 14, successRate: 91, skills: ['Python', 'AWS', 'Docker'], saved: true, location: 'Austin, TX' },
  { id: 'c3', name: 'Jamal Okafor', avatar: 'JO', title: 'DevOps Engineer', skillScore: 91, tasks: 11, successRate: 88, skills: ['Go', 'Kubernetes', 'gRPC'], saved: false, location: 'New York, NY' },
  { id: 'c4', name: 'Sarah Kim', avatar: 'SK', title: 'Frontend Engineer', skillScore: 89, tasks: 22, successRate: 96, skills: ['React', 'GraphQL', 'CSS'], saved: true, location: 'Seattle, WA' },
  { id: 'c5', name: 'Priya Sharma', avatar: 'PS', title: 'AI/ML Engineer', skillScore: 87, tasks: 9, successRate: 89, skills: ['Python', 'TensorFlow', 'FastAPI'], saved: false, location: 'Remote' },
  { id: 'c6', name: 'Tom Wilson', avatar: 'TW', title: 'Backend Engineer', skillScore: 85, tasks: 16, successRate: 87, skills: ['Node.js', 'PostgreSQL', 'Redis'], saved: true, location: 'Chicago, IL' },
]

const skillFilters = ['All', 'React', 'Python', 'Node.js', 'TypeScript', 'Docker', 'Go']

export default function TalentPool() {
  const [search, setSearch] = useState('')
  const [skillFilter, setSkillFilter] = useState('All')
  const [savedOnly, setSavedOnly] = useState(false)
  const [savedState, setSavedState] = useState<Record<string, boolean>>(
    Object.fromEntries(candidates.map(c => [c.id, c.saved]))
  )

  const filtered = candidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase())
    const matchSkill = skillFilter === 'All' || c.skills.includes(skillFilter)
    const matchSaved = !savedOnly || savedState[c.id]
    return matchSearch && matchSkill && matchSaved
  })

  const toggleSave = (id: string) =>
    setSavedState(s => ({ ...s, [id]: !s[id] }))

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Talent Pool</h1>
          <p className="text-[var(--color-text-muted)] mt-1">Top verified candidates from your tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setSavedOnly(s => !s)}
            className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all',
              savedOnly ? 'bg-[var(--color-accent-primary)] text-white' : 'bg-[var(--color-background-elevated)] text-[var(--color-text-muted)]'
            )}>
            ⭐ Saved Only
          </button>
        </div>
      </div>

      {/* Search + Skill Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or title..."
            className="w-full pl-11 pr-4 py-3 bg-[var(--color-background-surface)] border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-[var(--color-accent-primary)] text-sm" />
        </div>
        <div className="flex flex-wrap gap-2">
          {skillFilters.map(s => (
            <button key={s} onClick={() => setSkillFilter(s)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                skillFilter === s ? 'bg-[var(--color-accent-primary)] text-white' : 'bg-[var(--color-background-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              )}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-[var(--color-text-muted)]">{filtered.length} candidate{filtered.length !== 1 ? 's' : ''}</p>

      {/* Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(c => (
          <Card key={c.id} className="p-5 hover:border-[var(--color-accent-primary)]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent-primary)]/5 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white font-bold shrink-0">
                  {c.avatar}
                </div>
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{c.location}</p>
                </div>
              </div>
              <button onClick={() => toggleSave(c.id)}
                className={cn('text-xl transition-all', savedState[c.id] ? 'text-amber-400' : 'text-[var(--color-border-subtle)] hover:text-amber-400')}>
                ⭐
              </button>
            </div>

            <p className="text-sm text-[var(--color-text-muted)] mb-3">{c.title}</p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-bold text-[var(--color-accent-primary)]">SkillScore™ {c.skillScore}</span>
              <span className="text-[var(--color-border-subtle)]">·</span>
              <span className="text-xs text-[var(--color-text-muted)]">{c.successRate}% success</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
              {c.skills.map(s => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-background-elevated)] text-[var(--color-text-secondary)]">{s}</span>
              ))}
            </div>

            <div className="flex gap-2 pt-3 border-t border-[var(--color-border-subtle)]">
              <Link to={`/company/candidates/${c.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">View Profile</Button>
              </Link>
              <Button variant="primary" size="sm" className="flex-1">Invite</Button>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-4xl mb-4">👥</p>
            <p className="text-lg font-medium mb-2">No candidates found</p>
            <p className="text-[var(--color-text-muted)]">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
