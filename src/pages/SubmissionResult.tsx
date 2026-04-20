import { useParams, Link } from 'react-router-dom'
import { Card, GlassCard } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

// Mock result data
const results: Record<string, ResultData> = {
  '1': {
    taskTitle: 'Build a Real-Time Chat Component',
    company: 'StreamLine Inc.',
    overallScore: 82,
    grade: 'A-',
    prizeEarned: 500,
    timeSpent: '2h 34m',
    submittedAt: '2 hours ago',
    integrityStatus: 'clean',
    rubricScores: [
      { criterion: 'Functionality', weight: 30, score: 88, maxScore: 100, feedback: 'All core features implemented. Typing indicators work correctly. Read receipts need minor fixes for edge cases with concurrent users.' },
      { criterion: 'Code Quality', weight: 25, score: 85, maxScore: 100, feedback: 'Clean TypeScript with good type coverage. Error handling is solid. Consider extracting WebSocket logic into a custom hook for better separation of concerns.' },
      { criterion: 'Performance', weight: 20, score: 78, maxScore: 100, feedback: 'Efficient rendering with proper memoization. Minor memory leak detected in WebSocket cleanup on unmount. Consider using AbortController.' },
      { criterion: 'UI/UX', weight: 15, score: 80, maxScore: 100, feedback: 'Polished interface with smooth animations. Responsive design works well. Message bubble grouping could be improved for consecutive messages.' },
      { criterion: 'Documentation', weight: 10, score: 72, maxScore: 100, feedback: 'README covers setup and usage. Component API docs are minimal — add prop descriptions and usage examples for better developer experience.' },
    ],
    strengths: [
      'Excellent WebSocket implementation with reconnection logic',
      'Clean component architecture with proper TypeScript types',
      'Smooth scroll-to-bottom behavior and typing indicators',
    ],
    improvements: [
      'Memory leak in WebSocket cleanup needs attention',
      'Message grouping for consecutive messages from same sender',
      'Add comprehensive unit tests for core messaging logic',
    ],
    skillScoreImpact: '+3',
  },
  '2': {
    taskTitle: 'Design REST API for E-Commerce',
    company: 'ShopBase',
    overallScore: 91,
    grade: 'A',
    prizeEarned: 750,
    timeSpent: '4h 12m',
    submittedAt: '5 hours ago',
    integrityStatus: 'clean',
    rubricScores: [
      { criterion: 'API Design', weight: 30, score: 95, maxScore: 100, feedback: 'Excellent RESTful design with consistent naming and proper HTTP method usage. Pagination and filtering are well-implemented.' },
      { criterion: 'Database Schema', weight: 25, score: 92, maxScore: 100, feedback: 'Well-normalized schema with proper indexing. Migration scripts are clean. Consider adding soft-delete support for order records.' },
      { criterion: 'Auth & Security', weight: 20, score: 88, maxScore: 100, feedback: 'Strong JWT implementation with refresh tokens. Input validation is thorough. Add rate limiting to prevent abuse on checkout endpoints.' },
      { criterion: 'Testing', weight: 15, score: 90, maxScore: 100, feedback: 'Good integration test coverage (85%). Edge cases well-handled. Consider adding load tests for concurrent checkout scenarios.' },
      { criterion: 'Documentation', weight: 10, score: 85, maxScore: 100, feedback: 'OpenAPI spec is complete and accurate. Setup guide is clear. Add environment variable documentation.' },
    ],
    strengths: [
      'Production-grade API design with excellent RESTful conventions',
      'Comprehensive error handling with proper HTTP status codes',
      'High test coverage with meaningful integration tests',
    ],
    improvements: [
      'Add rate limiting on sensitive endpoints',
      'Consider implementing soft-delete for order audit trail',
      'Load testing for concurrent checkout scenarios',
    ],
    skillScoreImpact: '+5',
  },
}

type RubricScore = {
  criterion: string
  weight: number
  score: number
  maxScore: number
  feedback: string
}

type ResultData = {
  taskTitle: string
  company: string
  overallScore: number
  grade: string
  prizeEarned: number
  timeSpent: string
  submittedAt: string
  integrityStatus: string
  rubricScores: RubricScore[]
  strengths: string[]
  improvements: string[]
  skillScoreImpact: string
}

// Score ring component
function ScoreRing({ score, size = 140 }: { score: number; size?: number }) {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color = score >= 90 ? '#22d3ee' : score >= 70 ? '#8b5cf6' : score >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-border-subtle)" strokeWidth={strokeWidth} opacity={0.3} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{score}</span>
        <span className="text-xs text-[var(--color-text-muted)]">/ 100</span>
      </div>
    </div>
  )
}

// Score bar for individual criteria
function ScoreBar({ score, maxScore }: { score: number; maxScore: number }) {
  const pct = (score / maxScore) * 100
  const color = pct >= 90 ? 'from-cyan-400 to-emerald-400' : pct >= 70 ? 'from-violet-500 to-cyan-400' : pct >= 50 ? 'from-amber-400 to-orange-500' : 'from-rose-500 to-red-600'

  return (
    <div className="h-2 w-full rounded-full bg-[var(--color-background-elevated)] overflow-hidden">
      <div className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700', color)} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function SubmissionResult() {
  const { id } = useParams<{ id: string }>()
  const result = results[id || ''] || results['1']

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
        <Link to="/dashboard" className="hover:text-[var(--color-accent-primary)] transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)] font-medium truncate">Submission Result</span>
      </div>

      {/* Hero Score Section */}
      <GlassCard className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ScoreRing score={result.overallScore} />

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <h1 className="text-2xl font-bold">{result.taskTitle}</h1>
              <span className="px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] text-sm font-bold">
                {result.grade}
              </span>
            </div>
            <p className="text-[var(--color-text-muted)] mb-4">{result.company} · Submitted {result.submittedAt}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Prize Earned</p>
                <p className="text-lg font-bold text-[var(--color-accent-secondary)]">${result.prizeEarned}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Time Spent</p>
                <p className="text-lg font-bold">{result.timeSpent}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">SkillScore</p>
                <p className="text-lg font-bold text-emerald-400">{result.skillScoreImpact}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Integrity</p>
                <p className="text-lg font-bold text-emerald-400">✓ {result.integrityStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Rubric Breakdown */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Score Breakdown</h2>
        <div className="space-y-3">
          {result.rubricScores.map((item) => (
            <Card key={item.criterion} className="p-5 hover:border-[var(--color-accent-primary)]/20 transition-all">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-background-elevated)] flex flex-col items-center justify-center shrink-0">
                  <span className="text-xl font-bold">{item.score}</span>
                  <span className="text-[8px] text-[var(--color-text-muted)] uppercase">/ {item.maxScore}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{item.criterion}</h3>
                    <span className="text-xs text-[var(--color-text-muted)] shrink-0">{item.weight}% weight</span>
                  </div>
                  <ScoreBar score={item.score} maxScore={item.maxScore} />
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pl-[4.5rem]">
                {item.feedback}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-emerald-400">✓</span> Strengths
          </h3>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-emerald-400 mt-0.5 shrink-0">•</span>
                <span className="text-[var(--color-text-secondary)]">{s}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-amber-400">↑</span> Areas for Improvement
          </h3>
          <ul className="space-y-2">
            {result.improvements.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-amber-400 mt-0.5 shrink-0">•</span>
                <span className="text-[var(--color-text-secondary)]">{s}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/tasks" className="flex-1">
          <Button variant="outline" className="w-full">Browse More Tasks</Button>
        </Link>
        <Link to="/dashboard" className="flex-1">
          <Button variant="primary" className="w-full">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
