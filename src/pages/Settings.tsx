import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

type SettingSection = 'account' | 'notifications' | 'privacy' | 'security'

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button onClick={onChange}
    className={cn('w-11 h-6 rounded-full transition-all relative', checked ? 'bg-[var(--color-accent-primary)]' : 'bg-[var(--color-border-subtle)]')}>
    <span className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all', checked ? 'left-5' : 'left-0.5')} />
  </button>
)

export default function Settings() {
  const [section, setSection] = useState<SettingSection>('account')
  const [saved, setSaved] = useState(false)
  const [accountForm, setAccountForm] = useState({
    name: 'Alex Chen', email: 'alex@example.com', username: 'alexchen', location: 'San Francisco, CA',
  })
  const [notifPrefs, setNotifPrefs] = useState({
    offers: true, results: true, payments: true, taskRecs: true, weeklyDigest: false, marketing: false,
  })
  const [privacy, setPrivacy] = useState({
    publicProfile: true, showSkillScore: true, showEarnings: false, indexable: true,
  })

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const navItems: { key: SettingSection; label: string; icon: string }[] = [
    { key: 'account',       label: 'Account',       icon: '👤' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'privacy',       label: 'Privacy',       icon: '🔒' },
    { key: 'security',      label: 'Security',      icon: '🛡' },
  ]

  return (
    <div className="max-w-3xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-[var(--color-text-muted)] mt-1">Manage your account preferences</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <nav className="sm:w-44 shrink-0 space-y-1">
          {navItems.map(item => (
            <button key={item.key} onClick={() => setSection(item.key)}
              className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left',
                section === item.key ? 'bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] font-medium' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-background-elevated)]'
              )}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 space-y-4">
          {section === 'account' && (
            <Card className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Account Details</h2>
              {[
                { label: 'Full Name', key: 'name', type: 'text' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Username', key: 'username', type: 'text' },
                { label: 'Location', key: 'location', type: 'text' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                  <input type={f.type} value={accountForm[f.key as keyof typeof accountForm]}
                    onChange={e => setAccountForm(a => ({ ...a, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent-primary)]" />
                </div>
              ))}
            </Card>
          )}

          {section === 'notifications' && (
            <Card className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Email Notifications</h2>
              {([
                ['offers', 'New Job Offers', 'When companies send you offers'],
                ['results', 'Task Results', 'When your submissions are scored'],
                ['payments', 'Payments', 'When prize money is credited'],
                ['taskRecs', 'Task Recommendations', 'Matched tasks based on your skills'],
                ['weeklyDigest', 'Weekly Digest', 'Summary of your activity'],
                ['marketing', 'Product Updates', 'New features and announcements'],
              ] as [keyof typeof notifPrefs, string, string][]).map(([key, label, desc]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-[var(--color-border-subtle)] last:border-0">
                  <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-[var(--color-text-muted)]">{desc}</p></div>
                  <Toggle checked={notifPrefs[key]} onChange={() => setNotifPrefs(p => ({ ...p, [key]: !p[key] }))} />
                </div>
              ))}
            </Card>
          )}

          {section === 'privacy' && (
            <Card className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Privacy</h2>
              {([
                ['publicProfile', 'Public Profile', 'Allow anyone to view your profile at /u/username'],
                ['showSkillScore', 'Show SkillScore™', 'Display your score on your public profile'],
                ['showEarnings', 'Show Earnings', 'Show total earnings on your public profile'],
                ['indexable', 'Search Indexable', 'Allow profile to appear in search results'],
              ] as [keyof typeof privacy, string, string][]).map(([key, label, desc]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-[var(--color-border-subtle)] last:border-0">
                  <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-[var(--color-text-muted)]">{desc}</p></div>
                  <Toggle checked={privacy[key]} onChange={() => setPrivacy(p => ({ ...p, [key]: !p[key] }))} />
                </div>
              ))}
            </Card>
          )}

          {section === 'security' && (
            <Card className="p-6 space-y-5">
              <h2 className="font-semibold text-lg">Security</h2>
              {['Current Password', 'New Password'].map(label => (
                <div key={label}>
                  <label className="block text-sm font-medium mb-1.5">{label}</label>
                  <input type="password" placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent-primary)]" />
                </div>
              ))}
              <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                <div><p className="text-sm font-medium">Two-Factor Authentication</p><p className="text-xs text-[var(--color-text-muted)]">Add extra security</p></div>
                <Button variant="outline" size="sm">Enable 2FA</Button>
              </div>
              <div className="pt-3 border-t border-[var(--color-border-subtle)]">
                <p className="text-xs text-[var(--color-text-muted)] mb-2">Danger Zone</p>
                <Button variant="outline" size="sm" className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10">Delete Account</Button>
              </div>
            </Card>
          )}

          <Button variant="primary" className="w-full" onClick={handleSave}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}
