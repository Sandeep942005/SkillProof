import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeProvider'
import { cn } from '../ui/Button'

const candidateLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/tasks', label: 'Marketplace', icon: '🏪' },
  { to: '/wallet', label: 'Wallet', icon: '💰' },
  { to: '/profile', label: 'SkillScore', icon: '⭐' },
]

const companyLinks = [
  { to: '/company/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/company/tasks/new', label: 'Post Task', icon: '➕' },
  { to: '/company/talent', label: 'Talent Pool', icon: '👥' },
  { to: '/company/billing', label: 'Billing', icon: '💳' },
]

export default function DashboardLayout() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const isCompany = location.pathname.startsWith('/company');
  const navLinks = isCompany ? companyLinks : candidateLinks;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background-base)] text-[var(--color-text-primary)] transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border-subtle)] glass">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8 mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"></div>
            <span className="font-bold text-xl tracking-tight">SkillProof</span>
          </Link>
          
          {/* Role Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-[var(--color-background-elevated)] rounded-lg p-1">
            <Link
              to="/dashboard"
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                !isCompany ? 'bg-[var(--color-accent-primary)] text-white shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              )}
            >
              Candidate
            </Link>
            <Link
              to="/company/dashboard"
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                isCompany ? 'bg-[var(--color-accent-primary)] text-white shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              )}
            >
              Company
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-[var(--color-background-elevated)] transition-colors"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white text-xs font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 container mx-auto px-4 sm:px-8 py-6">
        {/* Sidebar */}
        <aside className="hidden md:flex w-56 flex-col gap-1 pr-6 border-r border-[var(--color-border-subtle)]">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-4 mb-2">
            {isCompany ? 'Company' : 'Candidate'}
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                location.pathname === link.to
                  ? 'bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/20'
                  : 'text-[var(--color-text-muted)] hover:bg-[var(--color-background-elevated)] hover:text-[var(--color-text-primary)]'
              )}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 md:pl-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border-subtle)] py-6 mt-auto">
        <div className="container mx-auto px-4 sm:px-8 text-center text-sm text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} SkillProof. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
