import { Card, GlassCard } from '../components/ui/Card'
import { cn } from '../components/ui/Button'

const leaders = [
  { rank: 1,  name: 'Sarah Kim',       avatar: 'SK', score: 98, tasks: 31, location: 'Seattle, WA',   delta: '+2', skills: ['React', 'GraphQL'] },
  { rank: 2,  name: 'Priya Sharma',    avatar: 'PS', score: 96, tasks: 24, location: 'Remote',        delta: '+1', skills: ['Python', 'ML'] },
  { rank: 3,  name: 'Alex Chen',       avatar: 'AC', score: 94, tasks: 18, location: 'San Francisco', delta: '—',  skills: ['React', 'Node.js'], isMe: true },
  { rank: 4,  name: 'Jamal Okafor',    avatar: 'JO', score: 91, tasks: 22, location: 'New York',      delta: '+3', skills: ['Go', 'Docker'] },
  { rank: 5,  name: 'Maria Rodriguez', avatar: 'MR', score: 89, tasks: 19, location: 'Austin, TX',    delta: '-1', skills: ['Python', 'AWS'] },
  { rank: 6,  name: 'Tom Wilson',      avatar: 'TW', score: 86, tasks: 16, location: 'Chicago, IL',   delta: '+2', skills: ['Node.js', 'Redis'] },
  { rank: 7,  name: 'Chen Wei',        avatar: 'CW', score: 84, tasks: 21, location: 'Remote',        delta: '—',  skills: ['Java', 'Spring'] },
  { rank: 8,  name: 'Aisha Patel',     avatar: 'AP', score: 82, tasks: 14, location: 'London, UK',    delta: '+4', skills: ['Vue.js', 'Django'] },
  { rank: 9,  name: 'Ethan Moore',     avatar: 'EM', score: 81, tasks: 17, location: 'Austin, TX',    delta: '-2', skills: ['TypeScript', 'GraphQL'] },
  { rank: 10, name: 'Lily Zhang',      avatar: 'LZ', score: 79, tasks: 20, location: 'Remote',        delta: '+1', skills: ['React', 'Python'] },
]

const podiumColors = ['from-amber-400 to-yellow-300', 'from-zinc-400 to-zinc-300', 'from-amber-700 to-amber-600']
const podiumH = ['h-24', 'h-16', 'h-12']
const podiumOrder = [1, 0, 2] // silver, gold, bronze left-to-right display order

export default function Leaderboard() {
  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Global Leaderboard</h1>
        <p className="text-[var(--color-text-muted)] mt-1">Top performers ranked by SkillScore™ this month</p>
      </div>

      {/* Podium */}
      <GlassCard className="p-6">
        <div className="flex items-end justify-center gap-4">
          {podiumOrder.map(idx => {
            const leader = leaders[idx]
            return (
              <div key={leader.rank} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white font-bold">
                  {leader.avatar}
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold">{leader.name.split(' ')[0]}</p>
                  <p className="text-xs text-[var(--color-accent-secondary)] font-bold">{leader.score}</p>
                </div>
                <div className={cn('w-20 rounded-t-lg bg-gradient-to-t flex items-center justify-center text-white font-bold text-lg', podiumH[idx], podiumColors[idx])}>
                  {['🥇', '🥈', '🥉'][idx]}
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Full Leaderboard Table */}
      <Card className="overflow-hidden">
        <div className="divide-y divide-[var(--color-border-subtle)]">
          <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
            <span className="col-span-1">#</span>
            <span className="col-span-4">Candidate</span>
            <span className="col-span-2">Score</span>
            <span className="col-span-2">Tasks</span>
            <span className="col-span-2">Change</span>
            <span className="col-span-1 hidden sm:block">Skills</span>
          </div>
          {leaders.map(l => (
            <div key={l.rank}
              className={cn('grid grid-cols-12 items-center px-5 py-4 transition-colors',
                l.isMe ? 'bg-[var(--color-accent-primary)]/5 border-l-2 border-[var(--color-accent-primary)]' : 'hover:bg-[var(--color-background-elevated)]'
              )}>
              <span className={cn('col-span-1 font-bold text-lg',
                l.rank === 1 ? 'text-amber-400' : l.rank === 2 ? 'text-zinc-400' : l.rank === 3 ? 'text-amber-700' : 'text-[var(--color-text-muted)]'
              )}>
                {l.rank <= 3 ? ['🥇', '🥈', '🥉'][l.rank - 1] : l.rank}
              </span>
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {l.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{l.name} {l.isMe && <span className="text-xs text-[var(--color-accent-primary)]">(you)</span>}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{l.location}</p>
                </div>
              </div>
              <span className="col-span-2 font-bold text-[var(--color-accent-secondary)]">{l.score}</span>
              <span className="col-span-2 text-sm text-[var(--color-text-muted)]">{l.tasks}</span>
              <span className={cn('col-span-2 text-sm font-medium',
                l.delta.startsWith('+') ? 'text-emerald-400' : l.delta.startsWith('-') ? 'text-rose-400' : 'text-[var(--color-text-muted)]'
              )}>
                {l.delta}
              </span>
              <div className="col-span-1 hidden sm:flex flex-wrap gap-1">
                {l.skills.slice(0, 1).map(s => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-background-elevated)] text-[var(--color-text-secondary)]">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
