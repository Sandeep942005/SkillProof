import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GlassCard } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Mocking authentication check
    setTimeout(() => {
      const intent = localStorage.getItem('skillproof-intent')
      if (intent === 'company') navigate('/company/dashboard')
      else navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
      
      <GlassCard className="w-full max-w-md p-8 relative z-10">
        <Link to="/" className="inline-flex items-center text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
        </Link>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-[var(--color-text-muted)]">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email or Phone (OTP)</label>
            <input 
              required
              type="text" 
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-lg focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
            />
          </div>
          
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Continue'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          Don't have an account? <Link to="/register" className="text-[var(--color-accent-primary)] hover:underline">Register</Link>
        </div>
      </GlassCard>
    </div>
  )
}
