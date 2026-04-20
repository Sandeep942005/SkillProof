import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function Home() {
  const navigate = useNavigate()

  const handleCTA = (role: 'candidate' | 'company') => {
    localStorage.setItem('skillproof-intent', role)
    navigate('/register')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Stub for Home */}
      <nav className="glass sticky top-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="font-bold text-2xl tracking-tighter">SkillProof</div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
          <Button variant="primary" onClick={() => handleCTA('company')}>Post a Task</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent-primary)]/20 blur-[120px] rounded-full pointer-events-none" />
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 relative z-10">
          The Future of Hiring is <span className="text-gradient">Performance</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mb-10 relative z-10">
          A neutral arbiter of verifiable skills. Candidates perform simulated work trials. Companies fund prize pools for real output.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <Button size="lg" variant="primary" onClick={() => handleCTA('company')}>
            Find Talent (Post a Task)
          </Button>
          <Button size="lg" variant="outline" onClick={() => handleCTA('candidate')}>
            Find Work (Join a Task)
          </Button>
        </div>
      </main>
    </div>
  )
}
