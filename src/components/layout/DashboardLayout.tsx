import { Outlet, Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeProvider'

export default function DashboardLayout() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background-base)] text-[var(--color-text-primary)] transition-colors duration-300">
      {/* Navbar Stub */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border-subtle)] glass">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8 mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"></div>
            <span className="font-bold text-xl tracking-tight">SkillProof</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-[var(--color-background-elevated)] transition-colors"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div className="h-8 w-8 rounded-full bg-[var(--color-border-subtle)] overflow-hidden">
               {/* User Avatar Stub */}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 container mx-auto px-4 sm:px-8 py-6">
        {/* Sidebar Stub */}
        <aside className="hidden md:flex w-64 flex-col gap-2 pr-6 border-r border-[var(--color-border-subtle)]">
          <Link to="/dashboard" className="px-4 py-2 rounded-lg bg-[var(--color-background-elevated)] font-medium">Dashboard</Link>
          <Link to="/tasks" className="px-4 py-2 rounded-lg hover:bg-[var(--color-background-elevated)] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">Marketplace</Link>
          <Link to="/profile" className="px-4 py-2 rounded-lg hover:bg-[var(--color-background-elevated)] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">SkillScore</Link>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 md:pl-6">
          <Outlet />
        </main>
      </div>

      {/* Footer Stub */}
      <footer className="border-t border-[var(--color-border-subtle)] py-6 mt-auto">
        <div className="container mx-auto px-4 sm:px-8 text-center text-sm text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} SkillProof. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
