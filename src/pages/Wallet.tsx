import { useState } from 'react'
import { Card, GlassCard } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

type Transaction = {
  id: string
  type: 'earning' | 'withdrawal' | 'bonus'
  description: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'processing'
  task?: string
}

const transactions: Transaction[] = [
  { id: 't1', type: 'earning',    description: 'Prize payout — Real-Time Chat Component', amount: 500,  date: 'Apr 18, 2026', status: 'completed', task: 'StreamLine Inc.' },
  { id: 't2', type: 'earning',    description: 'Prize payout — REST API Design',           amount: 750,  date: 'Apr 15, 2026', status: 'completed', task: 'ShopBase' },
  { id: 't3', type: 'bonus',      description: 'Top Performer Bonus — April',              amount: 100,  date: 'Apr 14, 2026', status: 'completed' },
  { id: 't4', type: 'withdrawal', description: 'Withdrawal to bank — Axis Bank ••4521',   amount: -800, date: 'Apr 12, 2026', status: 'completed' },
  { id: 't5', type: 'earning',    description: 'Prize payout — CI/CD Pipeline Setup',      amount: 550,  date: 'Apr 10, 2026', status: 'completed', task: 'DevOpsly' },
  { id: 't6', type: 'earning',    description: 'Prize payout — Dashboard Widget',          amount: 350,  date: 'Apr 05, 2026', status: 'completed', task: 'MetricsHub' },
  { id: 't7', type: 'withdrawal', description: 'Withdrawal to UPI — user@upi',             amount: -400, date: 'Apr 01, 2026', status: 'processing' },
  { id: 't8', type: 'earning',    description: 'Prize payout — GraphQL Migration',         amount: 900,  date: 'Mar 28, 2026', status: 'completed', task: 'DataLens' },
]

const typeConfig = {
  earning:    { icon: '↓', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  withdrawal: { icon: '↑', color: 'text-rose-400',    bg: 'bg-rose-500/10' },
  bonus:      { icon: '★', color: 'text-amber-400',   bg: 'bg-amber-500/10' },
}

const statusBadge: Record<string, string> = {
  completed:  'bg-emerald-500/15 text-emerald-400',
  pending:    'bg-amber-500/15 text-amber-400',
  processing: 'bg-blue-500/15 text-blue-400',
}

export default function Wallet() {
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [filter, setFilter] = useState<'all' | 'earning' | 'withdrawal' | 'bonus'>('all')

  const balance = 1950
  const pendingBalance = 350
  const allTimeEarned = 4450

  const filtered = transactions.filter(t => filter === 'all' || t.type === filter)

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Earnings & Wallet</h1>
        <p className="text-[var(--color-text-muted)] mt-1">Track your prize payouts and withdrawals</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="p-6 sm:col-span-1">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Available Balance</p>
          <p className="text-4xl font-bold text-gradient mb-1">${balance.toLocaleString()}</p>
          <p className="text-xs text-emerald-400">Ready to withdraw</p>
          <Button variant="primary" className="w-full mt-4" onClick={() => setShowWithdraw(true)}>
            Withdraw Funds
          </Button>
        </GlassCard>

        <Card className="p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Pending</p>
            <p className="text-2xl font-bold text-amber-400">${pendingBalance}</p>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">Awaiting company approval</p>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">All-Time Earned</p>
            <p className="text-2xl font-bold">${allTimeEarned.toLocaleString()}</p>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">From {transactions.filter(t => t.type === 'earning').length} tasks</p>
        </Card>
      </div>

      {/* Earnings Chart (SVG mini bar chart) */}
      <Card className="p-5">
        <h2 className="text-base font-semibold mb-4">Monthly Earnings</h2>
        <div className="flex items-end gap-3 h-28">
          {[
            { month: 'Nov', val: 300 },
            { month: 'Dec', val: 550 },
            { month: 'Jan', val: 200 },
            { month: 'Feb', val: 900 },
            { month: 'Mar', val: 1450 },
            { month: 'Apr', val: 1950 },
          ].map(({ month, val }) => {
            const pct = (val / 2000) * 100
            return (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-[var(--color-text-muted)]">${val}</span>
                <div className="w-full rounded-t-md overflow-hidden" style={{ height: `${pct}%` }}>
                  <div className="w-full h-full bg-gradient-to-t from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] opacity-80 hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)]">{month}</span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Transaction History */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Transactions</h2>
          <div className="flex gap-1 bg-[var(--color-background-elevated)] rounded-xl p-1">
            {(['all', 'earning', 'withdrawal', 'bonus'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={cn('px-3 py-1 rounded-lg text-xs font-medium transition-all capitalize',
                  filter === f ? 'bg-[var(--color-background-surface)] text-[var(--color-text-primary)] shadow-sm' : 'text-[var(--color-text-muted)]'
                )}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filtered.map(tx => {
              const cfg = typeConfig[tx.type]
              return (
                <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--color-background-elevated)] transition-colors">
                  <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0', cfg.bg, cfg.color)}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{tx.description}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{tx.task ? `${tx.task} · ` : ''}{tx.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn('font-bold', tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400')}>
                      {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount)}
                    </p>
                    <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', statusBadge[tx.status])}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <GlassCard className="w-full max-w-sm p-6 mx-4">
            <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium block mb-1.5">Amount (USD)</label>
                <input type="number" max={balance} value={withdrawAmount}
                  onChange={e => setWithdrawAmount(e.target.value)}
                  placeholder={`Max $${balance}`}
                  className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent-primary)]" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Destination</label>
                <select className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl text-sm focus:outline-none">
                  <option>Axis Bank ••4521</option>
                  <option>UPI — user@upi</option>
                  <option>+ Add new method</option>
                </select>
              </div>
              <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
                <span>Processing time</span><span>1-2 business days</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowWithdraw(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1" onClick={() => setShowWithdraw(false)}
                disabled={!withdrawAmount || parseInt(withdrawAmount) > balance || parseInt(withdrawAmount) <= 0}>
                Confirm Withdrawal
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
