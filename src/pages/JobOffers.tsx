import { useState } from 'react'
import { Card, GlassCard } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

type Offer = {
  id: string
  company: string
  avatar: string
  role: string
  location: string
  salary: string
  type: 'full-time' | 'contract' | 'part-time'
  taskRef: string
  score: number
  status: 'pending' | 'accepted' | 'declined' | 'expired'
  receivedAt: string
  expiresAt: string
  perks: string[]
}

const offers: Offer[] = [
  {
    id: 'o1', company: 'StreamLine Inc.', avatar: 'SI', role: 'Senior Frontend Engineer',
    location: 'Remote (US)', salary: '$140k – $165k / yr', type: 'full-time',
    taskRef: 'Real-Time Chat Component', score: 88, status: 'pending',
    receivedAt: '2 days ago', expiresAt: '5 days left',
    perks: ['Equity', 'Health Insurance', 'Home Office Stipend', 'Flexible Hours'],
  },
  {
    id: 'o2', company: 'ShopBase', avatar: 'SB', role: 'Backend Engineer (Contract)',
    location: 'Bangalore, India', salary: '$85/hr', type: 'contract',
    taskRef: 'E-Commerce REST API', score: 91, status: 'accepted',
    receivedAt: '1 week ago', expiresAt: 'Accepted',
    perks: ['Contract-to-hire', '6-month term', 'Remote-friendly'],
  },
  {
    id: 'o3', company: 'DataLens', avatar: 'DL', role: 'Full-Stack Engineer',
    location: 'Remote (Global)', salary: '$120k – $145k / yr', type: 'full-time',
    taskRef: 'GraphQL Migration', score: 94, status: 'expired',
    receivedAt: '3 weeks ago', expiresAt: 'Expired',
    perks: ['Equity', 'Unlimited PTO', 'Learning Budget'],
  },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  pending:  { label: 'Awaiting Response', color: 'bg-amber-500/15 text-amber-400' },
  accepted: { label: 'Accepted',          color: 'bg-emerald-500/15 text-emerald-400' },
  declined: { label: 'Declined',          color: 'bg-rose-500/15 text-rose-400' },
  expired:  { label: 'Expired',           color: 'bg-[var(--color-border-subtle)] text-[var(--color-text-muted)]' },
}

const typeLabel: Record<string, string> = {
  'full-time': '🏢 Full-Time',
  'contract':  '📋 Contract',
  'part-time': '⏰ Part-Time',
}

export default function JobOffers() {
  const [offerStates, setOfferStates] = useState<Record<string, string>>(
    Object.fromEntries(offers.map(o => [o.id, o.status]))
  )
  const [expanded, setExpanded] = useState<string | null>('o1')

  const act = (id: string, action: 'accepted' | 'declined') =>
    setOfferStates(s => ({ ...s, [id]: action }))

  const pending  = offers.filter(o => offerStates[o.id] === 'pending').length
  const accepted = offers.filter(o => offerStates[o.id] === 'accepted').length

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Job Offers</h1>
        <p className="text-[var(--color-text-muted)] mt-1">Offers from companies based on your task performance</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Offers', value: offers.length, color: '' },
          { label: 'Pending',  value: pending,  color: 'text-amber-400' },
          { label: 'Accepted', value: accepted, color: 'text-emerald-400' },
        ].map(s => (
          <Card key={s.label} className="p-5 text-center">
            <p className={cn('text-3xl font-bold', s.color)}>{s.value}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Offer Cards */}
      <div className="space-y-4">
        {offers.map(offer => {
          const status = offerStates[offer.id] as Offer['status']
          const isOpen = expanded === offer.id

          return (
            <Card key={offer.id}
              className={cn('overflow-hidden transition-all duration-300',
                status === 'pending' ? 'border-[var(--color-accent-primary)]/20' : ''
              )}>
              {/* Card Header */}
              <button className="w-full p-5 text-left" onClick={() => setExpanded(isOpen ? null : offer.id)}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white font-bold shrink-0">
                    {offer.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h3 className="font-semibold">{offer.role}</h3>
                      <span className="text-xs text-[var(--color-text-muted)]">{typeLabel[offer.type]}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">{offer.company} · {offer.location}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-sm font-bold text-[var(--color-accent-secondary)]">{offer.salary}</span>
                      <span className="text-xs text-[var(--color-text-muted)]">Based on: {offer.taskRef}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', statusConfig[status].color)}>
                      {statusConfig[status].label}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">{offer.receivedAt}</span>
                  </div>
                </div>
              </button>

              {/* Expanded */}
              {isOpen && (
                <div className="px-5 pb-5 border-t border-[var(--color-border-subtle)] pt-4 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <GlassCard className="p-3 text-center">
                      <p className="text-lg font-bold text-[var(--color-accent-primary)]">{offer.score}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">Your Score</p>
                    </GlassCard>
                    <GlassCard className="p-3 text-center">
                      <p className="text-sm font-bold">{offer.expiresAt}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">Deadline</p>
                    </GlassCard>
                    <GlassCard className="p-3 col-span-2">
                      <p className="text-xs text-[var(--color-text-muted)] mb-1.5">Perks</p>
                      <div className="flex flex-wrap gap-1.5">
                        {offer.perks.map(p => (
                          <span key={p} className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-background-elevated)] text-[var(--color-text-secondary)]">{p}</span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>

                  {status === 'pending' && (
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                        onClick={() => act(offer.id, 'declined')}>
                        Decline
                      </Button>
                      <Button variant="primary" className="flex-1"
                        onClick={() => act(offer.id, 'accepted')}>
                        Accept Offer →
                      </Button>
                    </div>
                  )}
                  {status === 'accepted' && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center">
                      ✓ You accepted this offer — {offer.company} will reach out shortly
                    </div>
                  )}
                  {status === 'declined' && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center">
                      You declined this offer
                    </div>
                  )}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
