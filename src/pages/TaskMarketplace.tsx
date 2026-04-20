import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

// Mock task data
const allTasks = [
  {
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
    description: 'Build a fully functional real-time chat widget with typing indicators, read receipts, and message history.',
  },
  {
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
    description: 'Design and implement a scalable REST API with auth, product CRUD, cart management, and checkout flow.',
  },
  {
    id: '3',
    title: 'Dashboard Analytics Widget',
    company: 'MetricsHub',
    companyAvatar: 'MH',
    prize: 350,
    difficulty: 'Beginner',
    deadline: '1d 3h',
    category: 'Frontend',
    tags: ['React', 'D3.js', 'CSS'],
    submissions: 15,
    maxSubmissions: 40,
    description: 'Create an interactive analytics dashboard widget with charts, KPIs, and date range filtering.',
  },
  {
    id: '4',
    title: 'Auth Flow with OAuth2 & JWT',
    company: 'SecureStack',
    companyAvatar: 'SS',
    prize: 600,
    difficulty: 'Advanced',
    deadline: '4d 0h',
    category: 'Backend',
    tags: ['Auth', 'Node.js', 'JWT'],
    submissions: 12,
    maxSubmissions: 25,
    description: 'Implement a complete OAuth2 + JWT authentication system with refresh tokens and role-based access.',
  },
  {
    id: '5',
    title: 'Mobile-First Landing Page',
    company: 'LaunchPad',
    companyAvatar: 'LP',
    prize: 400,
    difficulty: 'Beginner',
    deadline: '3d 6h',
    category: 'Frontend',
    tags: ['React', 'CSS', 'Responsive'],
    submissions: 31,
    maxSubmissions: 60,
    description: 'Design and build a pixel-perfect, mobile-first landing page with animations and responsive breakpoints.',
  },
  {
    id: '6',
    title: 'GraphQL API Migration',
    company: 'DataLens',
    companyAvatar: 'DL',
    prize: 900,
    difficulty: 'Advanced',
    deadline: '7d 0h',
    category: 'Backend',
    tags: ['GraphQL', 'TypeScript', 'Apollo'],
    submissions: 5,
    maxSubmissions: 20,
    description: 'Migrate an existing REST API to GraphQL with schema design, resolvers, and subscription support.',
  },
  {
    id: '7',
    title: 'CI/CD Pipeline Setup',
    company: 'DevOpsly',
    companyAvatar: 'DO',
    prize: 550,
    difficulty: 'Intermediate',
    deadline: '6d 12h',
    category: 'DevOps',
    tags: ['Docker', 'GitHub Actions', 'AWS'],
    submissions: 9,
    maxSubmissions: 20,
    description: 'Set up a production-grade CI/CD pipeline with automated testing, staging, and blue-green deployment.',
  },
  {
    id: '8',
    title: 'ML Model Serving API',
    company: 'AIFactory',
    companyAvatar: 'AF',
    prize: 1200,
    difficulty: 'Advanced',
    deadline: '10d 0h',
    category: 'AI/ML',
    tags: ['Python', 'FastAPI', 'TensorFlow'],
    submissions: 3,
    maxSubmissions: 15,
    description: 'Build a production model-serving API with batch inference, versioning, and A/B testing support.',
  },
]

const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'AI/ML']
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Prize: High → Low', value: 'prize-desc' },
  { label: 'Prize: Low → High', value: 'prize-asc' },
  { label: 'Deadline: Soonest', value: 'deadline' },
]

const difficultyColor: Record<string, string> = {
  Beginner: 'bg-emerald-500/15 text-emerald-400',
  Intermediate: 'bg-amber-500/15 text-amber-400',
  Advanced: 'bg-rose-500/15 text-rose-400',
}

export default function TaskMarketplace() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [sort, setSort] = useState('newest')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    let tasks = [...allTasks]

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      tasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.company.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    // Category
    if (category !== 'All') {
      tasks = tasks.filter((t) => t.category === category)
    }

    // Difficulty
    if (difficulty !== 'All') {
      tasks = tasks.filter((t) => t.difficulty === difficulty)
    }

    // Sort
    switch (sort) {
      case 'prize-desc':
        tasks.sort((a, b) => b.prize - a.prize)
        break
      case 'prize-asc':
        tasks.sort((a, b) => a.prize - b.prize)
        break
      case 'deadline':
        tasks.sort((a, b) => a.deadline.localeCompare(b.deadline))
        break
      default:
        break
    }

    return tasks
  }, [search, category, difficulty, sort])

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Task Marketplace</h1>
        <p className="text-[var(--color-text-muted)] mt-1">
          Browse skill challenges, earn prizes, and build your SkillScore
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">🔍</span>
          <input
            type="text"
            placeholder="Search tasks, companies, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[var(--color-background-surface)] border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors text-sm"
          />
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {/* Categories */}
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                  category === cat
                    ? 'bg-[var(--color-accent-primary)] text-white shadow-sm'
                    : 'bg-[var(--color-background-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                )}
              >
                {cat}
              </button>
            ))}

            {/* Difficulty Dropdown */}
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-background-elevated)] text-[var(--color-text-muted)] border-none outline-none cursor-pointer"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'Difficulty' : d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-background-elevated)] text-[var(--color-text-muted)] border-none outline-none cursor-pointer"
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex bg-[var(--color-background-elevated)] rounded-lg p-0.5">
              <button
                onClick={() => setView('grid')}
                className={cn(
                  'px-2.5 py-1.5 rounded-md text-sm transition-all',
                  view === 'grid' ? 'bg-[var(--color-background-surface)] shadow-sm' : 'text-[var(--color-text-muted)]'
                )}
              >
                ▦
              </button>
              <button
                onClick={() => setView('list')}
                className={cn(
                  'px-2.5 py-1.5 rounded-md text-sm transition-all',
                  view === 'list' ? 'bg-[var(--color-background-surface)] shadow-sm' : 'text-[var(--color-text-muted)]'
                )}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--color-text-muted)]">
        {filtered.length} {filtered.length === 1 ? 'task' : 'tasks'} found
      </p>

      {/* Task Grid / List */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((task) => (
            <Link key={task.id} to={`/tasks/${task.id}`}>
              <Card className="p-5 h-full hover:border-[var(--color-accent-primary)]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent-primary)]/5 group cursor-pointer flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {task.companyAvatar}
                  </div>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', difficultyColor[task.difficulty])}>
                    {task.difficulty}
                  </span>
                </div>

                {/* Title & Company */}
                <h3 className="font-semibold mb-1 group-hover:text-[var(--color-accent-primary)] transition-colors line-clamp-2">
                  {task.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">{task.company}</p>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4 flex-1">
                  {task.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-background-elevated)] text-[var(--color-text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-subtle)]">
                  <div>
                    <p className="font-bold text-[var(--color-accent-secondary)]">${task.prize.toLocaleString()}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">⏱ {task.deadline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{task.submissions}/{task.maxSubmissions}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">submissions</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <Link key={task.id} to={`/tasks/${task.id}`}>
              <Card className="p-5 hover:border-[var(--color-accent-primary)]/30 transition-all duration-300 cursor-pointer group">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {task.companyAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate group-hover:text-[var(--color-accent-primary)] transition-colors">
                        {task.title}
                      </h3>
                      <span className={cn('shrink-0 text-xs px-2 py-0.5 rounded-full font-medium', difficultyColor[task.difficulty])}>
                        {task.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">{task.company}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {task.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-background-elevated)] text-[var(--color-text-secondary)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <p className="font-bold text-[var(--color-accent-secondary)]">${task.prize.toLocaleString()}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">⏱ {task.deadline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{task.submissions}/{task.maxSubmissions}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">submissions</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg font-medium mb-2">No tasks found</p>
          <p className="text-[var(--color-text-muted)] mb-4">Try adjusting your filters or search terms</p>
          <Button variant="outline" onClick={() => { setSearch(''); setCategory('All'); setDifficulty('All') }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
