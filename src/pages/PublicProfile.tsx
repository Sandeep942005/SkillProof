import { useParams, Link } from 'react-router-dom'
import { Card, GlassCard } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const profile = {
  name: 'Alex Chen',
  username: 'alexchen',
  avatar: 'AC',
  headline: 'Senior Full-Stack Engineer',
  location: 'San Francisco, CA',
  bio: 'Full-stack engineer specializing in React and TypeScript. 18 tasks completed with a 94% success rate. Open to full-time roles.',
  skillScore: 94,
  tasksCompleted: 18,
  successRate: 94,
  rank: '#12',
  skills: [
    { name: 'React', score: 95 },
    { name: 'TypeScript', score: 92 },
    { name: 'Node.js', score: 88 },
    { name: 'PostgreSQL', score: 80 },
  ],
  recentWork: [
    { title: 'Real-Time Chat Component', company: 'StreamLine Inc.', score: 88 },
    { title: 'E-Commerce REST API', company: 'ShopBase', score: 91 },
    { title: 'CI/CD Pipeline Setup', company: 'DevOpsly', score: 94 },
  ],
  badges: ['🔥 Top 5%', '⚡ Fast Submitter', '🎯 Precision', '💎 Elite'],
}

export default function PublicProfile() {
  const { username } = useParams()
  void username

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Public badge */}
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        <span className="px-2 py-1 rounded-full border border-[var(--color-border-subtle)]">🌐 Public Profile</span>
        <span>skillproof.app/u/{profile.username}</span>
      </div>

      {/* Hero */}
      <GlassCard className="p-7 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
          {profile.avatar}
        </div>
        <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
        <p className="text-[var(--color-text-muted)] mb-2">{profile.headline} · {profile.location}</p>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-lg mx-auto mb-4">{profile.bio}</p>
        <div className="flex justify-center gap-3 flex-wrap">
          {profile.badges.map(b => (
            <span key={b} className="text-xs px-3 py-1 rounded-full bg-[var(--color-background-elevated)] text-[var(--color-text-secondary)]">{b}</span>
          ))}
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'SkillScore™', value: profile.skillScore, accent: true },
          { label: 'Tasks Done', value: profile.tasksCompleted, accent: false },
          { label: 'Success Rate', value: `${profile.successRate}%`, accent: false },
          { label: 'Global Rank', value: profile.rank, accent: false },
        ].map(s => (
          <Card key={s.label} className="p-4 text-center">
            <p className={s.accent ? 'text-3xl font-bold text-gradient' : 'text-2xl font-bold'}>{s.value}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Skills + Recent Work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5">
          <h2 className="font-semibold mb-4">Verified Skills</h2>
          <div className="space-y-3">
            {profile.skills.map(s => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.name}</span>
                  <span className="text-[var(--color-accent-secondary)] font-bold">{s.score}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--color-background-elevated)] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
                    style={{ width: `${s.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold mb-4">Recent Task Work</h2>
          <div className="space-y-3">
            {profile.recentWork.map(w => (
              <div key={w.title} className="p-3 rounded-xl bg-[var(--color-background-elevated)]">
                <p className="text-sm font-medium">{w.title}</p>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-[var(--color-text-muted)]">{w.company}</p>
                  <p className="text-xs font-bold text-[var(--color-accent-primary)]">Score: {w.score}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-[var(--color-text-muted)] text-sm mb-3">Interested in working with {profile.name}?</p>
        <Link to="/register?role=company">
          <Button variant="primary">Post a Task for This Candidate</Button>
        </Link>
      </div>
    </div>
  )
}
