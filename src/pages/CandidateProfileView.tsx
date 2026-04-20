import { useParams, Link } from 'react-router-dom'
import { Card, GlassCard } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const profile = {
  name: 'Alex Chen',
  avatar: 'AC',
  title: 'Full-Stack Engineer',
  location: 'San Francisco, CA',
  skillScore: 91,
  tasksCompleted: 18,
  successRate: 94,
  totalEarned: '$6,200',
  memberSince: 'Jan 2024',
  skills: [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 92 },
    { name: 'Node.js', level: 88 },
    { name: 'PostgreSQL', level: 82 },
    { name: 'Docker', level: 75 },
    { name: 'GraphQL', level: 78 },
  ],
  recentTasks: [
    { title: 'Real-Time Chat Component', company: 'StreamLine Inc.', score: 88, prize: '$500', date: '2w ago' },
    { title: 'E-Commerce REST API', company: 'ShopBase', score: 91, prize: '$750', date: '1mo ago' },
    { title: 'CI/CD Pipeline Setup', company: 'DevOpsly', score: 94, prize: '$550', date: '2mo ago' },
  ],
  badges: ['🔥 Top 5%', '⚡ Fast Submitter', '🎯 High Accuracy', '💎 Premium Candidate'],
}

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-[var(--color-text-secondary)]">{name}</span>
        <span className="font-medium text-[var(--color-accent-secondary)]">{level}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[var(--color-background-elevated)] overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] transition-all duration-700"
          style={{ width: `${level}%` }} />
      </div>
    </div>
  )
}

export default function CandidateProfileView() {
  const { id } = useParams()
  void id

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
        <Link to="/company/talent" className="hover:text-[var(--color-accent-primary)] transition-colors">Talent Pool</Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)] font-medium">{profile.name}</span>
      </div>

      {/* Profile Hero */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {profile.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] font-bold">
                SkillScore™ {profile.skillScore}
              </span>
            </div>
            <p className="text-[var(--color-text-muted)] mb-3">{profile.title} · {profile.location}</p>
            <div className="flex flex-wrap gap-2">
              {profile.badges.map(b => (
                <span key={b} className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-background-elevated)] text-[var(--color-text-secondary)]">{b}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Button variant="primary">Invite to Task</Button>
            <Button variant="outline" size="sm">Save to Pool</Button>
          </div>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Tasks Done', value: profile.tasksCompleted, icon: '🏆' },
          { label: 'Success Rate', value: `${profile.successRate}%`, icon: '📈' },
          { label: 'Total Earned', value: profile.totalEarned, icon: '💰' },
          { label: 'Member Since', value: profile.memberSince, icon: '📅' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <span>{s.icon}</span>
              <span className="text-xs text-[var(--color-text-muted)]">{s.label}</span>
            </div>
            <p className="text-xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <Card className="p-5 space-y-4">
          <h2 className="text-lg font-semibold">Skill Proficiency</h2>
          {profile.skills.map(s => <SkillBar key={s.name} name={s.name} level={s.level} />)}
        </Card>

        {/* Recent Performance */}
        <Card className="p-5">
          <h2 className="text-lg font-semibold mb-4">Task History</h2>
          <div className="space-y-3">
            {profile.recentTasks.map(t => (
              <div key={t.title} className="p-3 rounded-xl bg-[var(--color-background-elevated)] hover:bg-[var(--color-background-surface)] transition-colors">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium">{t.title}</p>
                  <span className="text-sm font-bold text-[var(--color-accent-secondary)] shrink-0 ml-2">{t.prize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[var(--color-text-muted)]">{t.company} · {t.date}</p>
                  <span className="text-xs font-semibold text-[var(--color-accent-primary)]">Score: {t.score}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
