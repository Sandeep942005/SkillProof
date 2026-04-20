import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

type Dispute = {
  id: string
  task: string
  company: string
  issue: string
  status: 'open' | 'under-review' | 'resolved' | 'closed'
  submittedAt: string
  amount: number
  messages: { from: string; text: string; time: string }[]
}

const disputes: Dispute[] = [
  {
    id: 'D-001', task: 'Real-Time Chat Component', company: 'StreamLine Inc.',
    issue: 'Score discrepancy — I believe my WebSocket implementation was not evaluated correctly on the Performance criterion.',
    status: 'under-review', submittedAt: '3 days ago', amount: 500,
    messages: [
      { from: 'You', text: 'I believe the performance score of 78 is incorrect. My implementation uses cleanup on unmount.', time: '3d ago' },
      { from: 'SkillProof Support', text: 'Thank you for raising this. We have escalated to our evaluation team and will respond within 48 hours.', time: '2d ago' },
    ],
  },
  {
    id: 'D-002', task: 'Dashboard Analytics Widget', company: 'MetricsHub',
    issue: 'Payment not received after submission was approved 7 days ago.',
    status: 'resolved', submittedAt: '2 weeks ago', amount: 350,
    messages: [
      { from: 'You', text: 'My submission was approved on Apr 5 but I still have not received the $350 payment.', time: '2w ago' },
      { from: 'SkillProof Support', text: 'We have confirmed the payment was delayed. It has now been processed and should appear in your wallet within 24h.', time: '12d ago' },
    ],
  },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  'open':         { label: 'Open',           color: 'bg-amber-500/15 text-amber-400' },
  'under-review': { label: 'Under Review',   color: 'bg-blue-500/15 text-blue-400' },
  'resolved':     { label: 'Resolved',       color: 'bg-emerald-500/15 text-emerald-400' },
  'closed':       { label: 'Closed',         color: 'bg-[var(--color-border-subtle)] text-[var(--color-text-muted)]' },
}

export default function DisputeResolution() {
  const [selected, setSelected] = useState<string | null>('D-001')
  const [newMessage, setNewMessage] = useState('')

  const activeDispute = disputes.find(d => d.id === selected)

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dispute Resolution</h1>
          <p className="text-[var(--color-text-muted)] mt-1">Raise and track issues with task scores or payments</p>
        </div>
        <Button variant="primary" onClick={() => void 0}>+ New Dispute</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dispute List */}
        <div className="space-y-3">
          {disputes.map(d => (
            <Card key={d.id} className={cn('p-4 cursor-pointer transition-all',
              selected === d.id ? 'border-[var(--color-accent-primary)]/40 bg-[var(--color-accent-primary)]/5' : 'hover:border-[var(--color-accent-primary)]/20'
            )} onClick={() => setSelected(d.id)}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-[var(--color-text-muted)]">{d.id}</span>
                <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', statusConfig[d.status].color)}>
                  {statusConfig[d.status].label}
                </span>
              </div>
              <p className="font-medium text-sm">{d.task}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{d.company} · {d.submittedAt}</p>
            </Card>
          ))}
        </div>

        {/* Dispute Thread */}
        {activeDispute ? (
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{activeDispute.task}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{activeDispute.company} · Prize: ${activeDispute.amount}</p>
                </div>
                <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', statusConfig[activeDispute.status].color)}>
                  {statusConfig[activeDispute.status].label}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--color-background-elevated)] text-sm text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-text-primary)] block mb-1">Issue:</strong>
                {activeDispute.issue}
              </div>
            </Card>

            {/* Message Thread */}
            <Card className="p-5 space-y-4">
              <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Conversation</p>
              {activeDispute.messages.map((msg, i) => (
                <div key={i} className={cn('flex gap-3', msg.from === 'You' ? 'flex-row-reverse' : '')}>
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                    msg.from === 'You' ? 'bg-[var(--color-accent-primary)] text-white' : 'bg-[var(--color-background-elevated)] text-[var(--color-text-muted)]'
                  )}>
                    {msg.from === 'You' ? 'AC' : 'SP'}
                  </div>
                  <div className={cn('max-w-xs lg:max-w-sm p-3 rounded-xl text-sm',
                    msg.from === 'You'
                      ? 'bg-[var(--color-accent-primary)]/15 text-[var(--color-text-primary)]'
                      : 'bg-[var(--color-background-elevated)] text-[var(--color-text-secondary)]'
                  )}>
                    <p>{msg.text}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}

              {activeDispute.status === 'under-review' && (
                <div className="flex gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
                  <input value={newMessage} onChange={e => setNewMessage(e.target.value)}
                    placeholder="Add a message..."
                    className="flex-1 px-3 py-2 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent-primary)]" />
                  <Button variant="primary" size="sm" onClick={() => setNewMessage('')} disabled={!newMessage}>Send</Button>
                </div>
              )}
            </Card>
          </div>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center text-[var(--color-text-muted)]">
            Select a dispute to view details
          </div>
        )}
      </div>
    </div>
  )
}
