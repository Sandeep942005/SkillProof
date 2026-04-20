import { useParams, Link } from 'react-router-dom'
import { Card, GlassCard } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'
import { useState } from 'react'

// Mock task database (same IDs as TaskMarketplace)
const tasks: Record<string, TaskData> = {
  '1': {
    id: '1',
    title: 'Build a Real-Time Chat Component',
    company: 'StreamLine Inc.',
    companyAvatar: 'SI',
    prize: 500,
    difficulty: 'Intermediate',
    deadline: '2d 14h',
    category: 'Frontend',
    tags: ['React', 'WebSocket', 'TypeScript'],
    submissions: 24,
    maxSubmissions: 50,
    description:
      'Build a fully functional real-time chat widget with typing indicators, read receipts, and message history. The component should be reusable and customizable.',
    rubric: [
      { criterion: 'Functionality', weight: 30, description: 'All features work correctly: real-time messaging, typing indicators, read receipts' },
      { criterion: 'Code Quality', weight: 25, description: 'Clean, well-structured, properly typed TypeScript code with error handling' },
      { criterion: 'Performance', weight: 20, description: 'Efficient rendering, proper WebSocket management, no memory leaks' },
      { criterion: 'UI/UX', weight: 15, description: 'Polished interface, smooth animations, responsive design' },
      { criterion: 'Documentation', weight: 10, description: 'Clear README, component API docs, and usage examples' },
    ],
    requirements: [
      'React 18+ with TypeScript',
      'WebSocket-based real-time communication',
      'Typing indicators and read receipts',
      'Message history with infinite scroll',
      'Responsive design (mobile + desktop)',
      'Unit tests for core logic',
    ],
    timeline: [
      { phase: 'Setup & Architecture', duration: '4h' },
      { phase: 'Core Messaging', duration: '8h' },
      { phase: 'Real-time Features', duration: '6h' },
      { phase: 'UI Polish & Testing', duration: '6h' },
    ],
    postedDate: '3 days ago',
  },
  '2': {
    id: '2',
    title: 'Design REST API for E-Commerce',
    company: 'ShopBase',
    companyAvatar: 'SB',
    prize: 750,
    difficulty: 'Advanced',
    deadline: '5d 8h',
    category: 'Backend',
    tags: ['Node.js', 'REST', 'PostgreSQL'],
    submissions: 8,
    maxSubmissions: 30,
    description:
      'Design and implement a scalable REST API with authentication, product CRUD, cart management, and checkout flow. Must include proper error handling and database design.',
    rubric: [
      { criterion: 'API Design', weight: 30, description: 'RESTful principles, proper HTTP methods, consistent naming' },
      { criterion: 'Database Schema', weight: 25, description: 'Normalized schema, proper indexing, migration scripts' },
      { criterion: 'Auth & Security', weight: 20, description: 'JWT auth, input validation, rate limiting, SQL injection prevention' },
      { criterion: 'Testing', weight: 15, description: 'Integration tests, edge cases covered, test coverage > 80%' },
      { criterion: 'Documentation', weight: 10, description: 'OpenAPI/Swagger spec, setup guide, environment docs' },
    ],
    requirements: [
      'Node.js with Express or Fastify',
      'PostgreSQL with Prisma or Knex',
      'JWT-based authentication',
      'Input validation with Zod or Joi',
      'Comprehensive error handling',
      'Docker Compose for local dev',
    ],
    timeline: [
      { phase: 'Schema Design', duration: '4h' },
      { phase: 'Auth & Users', duration: '8h' },
      { phase: 'Products & Cart', duration: '10h' },
      { phase: 'Checkout & Testing', duration: '8h' },
    ],
    postedDate: '1 day ago',
  },
}

// Fallback for unknown IDs
const fallbackTask: TaskData = {
  id: '0',
  title: 'Task Not Found',
  company: 'Unknown',
  companyAvatar: '??',
  prize: 0,
  difficulty: 'Beginner',
  deadline: '--',
  category: 'Other',
  tags: [],
  submissions: 0,
  maxSubmissions: 0,
  description: 'This task could not be found.',
  rubric: [],
  requirements: [],
  timeline: [],
  postedDate: '--',
}

type RubricItem = { criterion: string; weight: number; description: string }
type TimelineItem = { phase: string; duration: string }
type TaskData = {
  id: string
  title: string
  company: string
  companyAvatar: string
  prize: number
  difficulty: string
  deadline: string
  category: string
  tags: string[]
  submissions: number
  maxSubmissions: number
  description: string
  rubric: RubricItem[]
  requirements: string[]
  timeline: TimelineItem[]
  postedDate: string
}

const difficultyColor: Record<string, string> = {
  Beginner: 'bg-emerald-500/15 text-emerald-400',
  Intermediate: 'bg-amber-500/15 text-amber-400',
  Advanced: 'bg-rose-500/15 text-rose-400',
}

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>()
  const task = tasks[id || ''] || fallbackTask
  const [joined, setJoined] = useState(false)

  if (task.id === '0') {
    return (
      <div className="text-center py-20 animate-[fadeIn_0.5s_ease-out]">
        <p className="text-5xl mb-4">🔍</p>
        <h2 className="text-2xl font-bold mb-2">Task Not Found</h2>
        <p className="text-[var(--color-text-muted)] mb-6">The task you're looking for doesn't exist or has been removed.</p>
        <Link to="/tasks">
          <Button variant="outline">← Back to Marketplace</Button>
        </Link>
      </div>
    )
  }

  const spotsLeft = task.maxSubmissions - task.submissions
  const fillPercent = (task.submissions / task.maxSubmissions) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
        <Link to="/tasks" className="hover:text-[var(--color-accent-primary)] transition-colors">Marketplace</Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)] font-medium truncate">{task.title}</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {task.companyAvatar}
            </div>
            <div>
              <p className="font-medium">{task.company}</p>
              <p className="text-xs text-[var(--color-text-muted)]">Posted {task.postedDate}</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-3">{task.title}</h1>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', difficultyColor[task.difficulty])}>
              {task.difficulty}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-background-elevated)] text-[var(--color-text-muted)]">
              {task.category}
            </span>
            {task.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-[var(--color-background-elevated)] text-[var(--color-text-secondary)]">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-[var(--color-text-secondary)] leading-relaxed">{task.description}</p>
        </div>

        {/* Prize / Join Card */}
        <GlassCard className="p-6 w-full md:w-72 shrink-0 self-start">
          <div className="text-center mb-4">
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Prize Pool</p>
            <p className="text-4xl font-bold text-gradient">${task.prize.toLocaleString()}</p>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">Deadline</span>
              <span className="font-medium">⏱ {task.deadline}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">Spots Left</span>
              <span className="font-medium">{spotsLeft} / {task.maxSubmissions}</span>
            </div>
            <div>
              <div className="h-2 w-full rounded-full bg-[var(--color-background-elevated)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] transition-all duration-500"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 text-right">{task.submissions} submitted</p>
            </div>
          </div>

          {joined ? (
            <div className="space-y-2">
              <Link to={`/tasks/${task.id}/submit`}>
                <Button variant="primary" className="w-full">
                  Open Workspace →
                </Button>
              </Link>
              <p className="text-xs text-center text-emerald-400">✓ You've joined this task</p>
            </div>
          ) : (
            <Button variant="primary" className="w-full" onClick={() => setJoined(true)}>
              Join This Task
            </Button>
          )}
        </GlassCard>
      </div>

      {/* Rubric Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Evaluation Rubric</h2>
        <Card className="overflow-hidden">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {task.rubric.map((item) => (
              <div key={item.criterion} className="p-4 flex items-start gap-4 hover:bg-[var(--color-background-elevated)] transition-colors">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-primary)]/10 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-[var(--color-accent-primary)]">{item.weight}%</span>
                </div>
                <div>
                  <p className="font-medium mb-0.5">{item.criterion}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Requirements */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Requirements</h2>
        <Card className="p-5">
          <ul className="space-y-2">
            {task.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="text-[var(--color-accent-secondary)] mt-0.5 shrink-0">✓</span>
                <span className="text-[var(--color-text-secondary)]">{req}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Suggested Timeline */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Suggested Timeline</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {task.timeline.map((item, i) => (
            <Card key={i} className="p-4 text-center hover:border-[var(--color-accent-primary)]/30 transition-all group">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent-primary)]/10 flex items-center justify-center mx-auto mb-2 text-sm font-bold text-[var(--color-accent-primary)] group-hover:bg-[var(--color-accent-primary)] group-hover:text-white transition-all">
                {i + 1}
              </div>
              <p className="font-medium text-sm mb-1">{item.phase}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{item.duration}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
