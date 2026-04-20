import { useState } from 'react'
import { Card, GlassCard } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

type Invoice = {
  id: string
  description: string
  task: string
  amount: number
  fee: number
  date: string
  status: 'paid' | 'pending' | 'processing'
}

const invoices: Invoice[] = [
  { id: 'INV-0024', description: 'Task Prize Pool', task: 'Full-Stack E-Commerce Module', amount: 2000, fee: 100, date: 'Apr 18, 2026', status: 'paid' },
  { id: 'INV-0023', description: 'Task Prize Pool', task: 'Real-Time Notification System', amount: 800,  fee: 40,  date: 'Apr 14, 2026', status: 'paid' },
  { id: 'INV-0022', description: 'Task Prize Pool', task: 'ML Model Serving API',          amount: 1200, fee: 60,  date: 'Apr 10, 2026', status: 'processing' },
  { id: 'INV-0021', description: 'Task Prize Pool', task: 'Auth Flow with OAuth2',         amount: 600,  fee: 30,  date: 'Apr 5, 2026',  status: 'pending' },
  { id: 'INV-0020', description: 'Task Prize Pool', task: 'Mobile-First Landing Page',     amount: 400,  fee: 20,  date: 'Mar 28, 2026', status: 'paid' },
]

const paymentMethods = [
  { id: 'pm1', label: 'Razorpay Corporate Card', last4: '4521', brand: '💳', primary: true },
  { id: 'pm2', label: 'HDFC Bank Account',       last4: '8833', brand: '🏦', primary: false },
]

const statusBadge: Record<string, string> = {
  paid:       'bg-emerald-500/15 text-emerald-400',
  pending:    'bg-amber-500/15 text-amber-400',
  processing: 'bg-blue-500/15 text-blue-400',
}

export default function Billing() {
  const [tab, setTab] = useState<'invoices' | 'methods' | 'usage'>('invoices')

  const totalSpent  = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount + i.fee, 0)
  const pendingAmt  = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.amount + i.fee, 0)
  const taskCount   = invoices.length

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Billing & Payments</h1>
        <p className="text-[var(--color-text-muted)] mt-1">Manage escrow payments, invoices, and payment methods</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total Spent (Paid)</p>
          <p className="text-3xl font-bold text-gradient">${totalSpent.toLocaleString()}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Across {taskCount} tasks</p>
        </GlassCard>
        <Card className="p-5">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Pending / Processing</p>
          <p className="text-2xl font-bold text-amber-400">${pendingAmt.toLocaleString()}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Locked in escrow</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Platform Fee Paid</p>
          <p className="text-2xl font-bold">${invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.fee, 0)}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">5% per task</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--color-background-elevated)] rounded-xl p-1 w-fit">
        {(['invoices', 'methods', 'usage'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize',
              tab === t ? 'bg-[var(--color-background-surface)] text-[var(--color-text-primary)] shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            )}>
            {t === 'methods' ? 'Payment Methods' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Invoices Tab */}
      {tab === 'invoices' && (
        <Card className="overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--color-border-subtle)]">
            <h2 className="text-sm font-semibold">Invoice History</h2>
          </div>
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-5 py-2.5 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              <span className="col-span-2">Invoice</span>
              <span className="col-span-4">Task</span>
              <span className="col-span-2">Prize</span>
              <span className="col-span-2">Fee (5%)</span>
              <span className="col-span-1">Date</span>
              <span className="col-span-1 text-right">Status</span>
            </div>
            {invoices.map(inv => (
              <div key={inv.id} className="grid grid-cols-12 items-center px-5 py-4 hover:bg-[var(--color-background-elevated)] transition-colors text-sm">
                <span className="col-span-2 font-mono text-xs text-[var(--color-text-muted)]">{inv.id}</span>
                <span className="col-span-4 font-medium truncate pr-2">{inv.task}</span>
                <span className="col-span-2 font-semibold text-[var(--color-accent-secondary)]">${inv.amount.toLocaleString()}</span>
                <span className="col-span-2 text-[var(--color-text-muted)]">${inv.fee}</span>
                <span className="col-span-1 text-xs text-[var(--color-text-muted)] truncate">{inv.date.split(',')[0]}</span>
                <span className={cn('col-span-1 text-right text-xs px-2 py-0.5 rounded-full font-medium w-fit ml-auto', statusBadge[inv.status])}>
                  {inv.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Payment Methods Tab */}
      {tab === 'methods' && (
        <div className="space-y-3">
          {paymentMethods.map(pm => (
            <Card key={pm.id} className="p-5 flex items-center gap-4">
              <span className="text-3xl">{pm.brand}</span>
              <div className="flex-1">
                <p className="font-medium">{pm.label}</p>
                <p className="text-xs text-[var(--color-text-muted)]">ending in ••{pm.last4}</p>
              </div>
              {pm.primary && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] font-medium">Primary</span>
              )}
              <Button variant="ghost" size="sm">Remove</Button>
            </Card>
          ))}
          <Button variant="outline" className="w-full">+ Add Payment Method</Button>
        </div>
      )}

      {/* Usage Tab */}
      {tab === 'usage' && (
        <Card className="p-6 space-y-5">
          <h2 className="text-base font-semibold">This Month's Usage</h2>
          {[
            { label: 'Active Tasks Posted', value: 3, max: 10 },
            { label: 'Candidates Reviewed', value: 18, max: 50 },
            { label: 'Escrow Transactions', value: 5, max: 20 },
          ].map(u => (
            <div key={u.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span>{u.label}</span>
                <span className="text-[var(--color-text-muted)]">{u.value} / {u.max}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[var(--color-background-elevated)] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
                  style={{ width: `${(u.value / u.max) * 100}%` }} />
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-[var(--color-border-subtle)]">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">Current Plan</span>
              <span className="font-semibold text-[var(--color-accent-primary)]">Growth — $199/mo</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
