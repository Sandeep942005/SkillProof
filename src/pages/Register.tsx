import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GlassCard } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ArrowLeft, Briefcase, User } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const [role, setRole] = useState<'candidate' | 'company'>('candidate')

  useEffect(() => {
    const savedIntent = localStorage.getItem('skillproof-intent') as 'candidate' | 'company'
    if (savedIntent) setRole(savedIntent)
  }, [])

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // In actual implementation, trigger Supabase Auth signup here.
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[var(--color-accent-secondary)]/10 blur-[100px] rounded-full" />
      
      <GlassCard className="w-full max-w-md p-8 relative z-10">
        <Link to="/" className="inline-flex items-center text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
        </Link>
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-[var(--color-text-muted)]">Join the performance network</p>
        </div>

        <div className="flex gap-2 p-1 bg-[var(--color-background-base)] rounded-lg mb-6 border border-[var(--color-border-subtle)]">
          <button
            onClick={() => setRole('candidate')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'candidate' ? 'bg-[var(--color-background-surface)] shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <User className="w-4 h-4" /> Candidate
          </button>
          <button
            onClick={() => setRole('company')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'company' ? 'bg-[var(--color-background-surface)] shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Company
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-lg focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input 
              required
              type="tel" 
              className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-lg focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
            />
          </div>

          {role === 'company' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <label className="text-sm font-medium">Company Tax ID (GST/PAN)</label>
              <input 
                required
                type="text" 
                placeholder="Escrow Compliance Requirement"
                className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-lg focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
              />
            </div>
          )}
          
          <Button type="submit" variant="primary" className="w-full mt-4">
            Continue to Onboarding
          </Button>
        </form>
      </GlassCard>
    </div>
  )
}
