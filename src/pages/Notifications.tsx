import { useState } from 'react'
import { Button, cn } from '../components/ui/Button'

type Notification = {
  id: string
  type: 'offer' | 'result' | 'review' | 'system' | 'payment'
  title: string
  body: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: 'n1', type: 'offer',   title: 'New Job Offer',           body: 'StreamLine Inc. sent you a full-time offer based on your Chat task score.',   time: '2h ago',  read: false },
  { id: 'n2', type: 'result',  title: 'Submission Scored',       body: 'Your "Real-Time Chat Component" submission scored 88/100.',                    time: '5h ago',  read: false },
  { id: 'n3', type: 'payment', title: 'Payment Received',        body: '$500 has been added to your wallet for the Chat Component task.',              time: '6h ago',  read: false },
  { id: 'n4', type: 'review',  title: 'Submission Under Review', body: 'ShopBase is reviewing your E-Commerce API submission.',                        time: '1d ago',  read: true  },
  { id: 'n5', type: 'system',  title: 'New Task Available',      body: 'A new ML Model Serving API task matches your skills — $1,200 prize.',          time: '2d ago',  read: true  },
  { id: 'n6', type: 'offer',   title: 'Offer Expiring Soon',     body: 'Your DataLens Full-Stack Engineer offer expires in 2 days.',                   time: '2d ago',  read: true  },
  { id: 'n7', type: 'result',  title: 'Submission Scored',       body: 'Your "CI/CD Pipeline" submission scored 94/100 — excellent work!',            time: '5d ago',  read: true  },
]

const typeIcon: Record<string, string> = {
  offer:   '💼',
  result:  '🏆',
  review:  '🔍',
  system:  '🔔',
  payment: '💰',
}

const typeBg: Record<string, string> = {
  offer:   'bg-violet-500/10 text-violet-400',
  result:  'bg-amber-500/10 text-amber-400',
  review:  'bg-blue-500/10 text-blue-400',
  system:  'bg-[var(--color-background-elevated)] text-[var(--color-text-muted)]',
  payment: 'bg-emerald-500/10 text-emerald-400',
}

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, read: true })))
  const markRead = (id: string) => setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))

  const unreadCount = notifications.filter(n => !n.read).length
  const displayed = filter === 'unread' ? notifications.filter(n => !n.read) : notifications

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{unreadCount} unread</p>}
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1 bg-[var(--color-background-elevated)] rounded-xl p-1">
            {(['all', 'unread'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize',
                  filter === f ? 'bg-[var(--color-background-surface)] text-[var(--color-text-primary)] shadow-sm' : 'text-[var(--color-text-muted)]'
                )}>
                {f}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead}>Mark all read</Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {displayed.map(n => (
          <div key={n.id} onClick={() => markRead(n.id)}
            className={cn('flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer',
              n.read
                ? 'border-[var(--color-border-subtle)] bg-[var(--color-background-surface)] hover:bg-[var(--color-background-elevated)]'
                : 'border-[var(--color-accent-primary)]/20 bg-[var(--color-accent-primary)]/5 hover:bg-[var(--color-accent-primary)]/10'
            )}>
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0', typeBg[n.type])}>
              {typeIcon[n.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className={cn('text-sm font-semibold', !n.read && 'text-[var(--color-accent-primary)]')}>{n.title}</p>
                {!n.read && <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] shrink-0" />}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{n.body}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{n.time}</p>
            </div>
          </div>
        ))}
        {displayed.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔔</p>
            <p className="text-[var(--color-text-muted)]">No unread notifications</p>
          </div>
        )}
      </div>
    </div>
  )
}
