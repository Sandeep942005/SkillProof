import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { CheckCircle2, ChevronRight, UploadCloud, Github } from 'lucide-react'

export default function Onboarding() {
  const navigate = useNavigate()
  const [role, setRole] = useState<'candidate' | 'company'>('candidate')
  const [step, setStep] = useState(1)

  useEffect(() => {
    const savedIntent = localStorage.getItem('skillproof-intent') as 'candidate' | 'company'
    if (savedIntent) setRole(savedIntent)
  }, [])

  const handleComplete = () => {
    // Save onboarding status to Supabase user metadata
    if (role === 'company') navigate('/company/dashboard')
    else navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--color-accent-primary)]/5" />
      
      <GlassCard className="w-full max-w-2xl p-8 md:p-10 relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Profile Setup</h1>
            <span className="text-sm font-medium text-[var(--color-text-muted)]">Step {step} of 2</span>
          </div>
          <div className="h-2 w-full bg-[var(--color-background-elevated)] rounded-full overflow-hidden">
            <div className={`h-full bg-[var(--color-accent-primary)] transition-all duration-500 w-${step === 1 ? '1/2' : 'full'}`} />
          </div>
        </div>

        {role === 'candidate' ? (
          /* CANDIDATE FLOW */
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {step === 1 ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Connect your identity</h3>
                  <p className="text-[var(--color-text-muted)] mb-4">We use GitHub to build your baseline SkillScore.</p>
                  <Button variant="outline" className="w-full justify-start h-14">
                    <Github className="mr-3" /> Connect GitHub
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upload Resume (Optional)</h3>
                  <div className="border-2 border-dashed border-[var(--color-border-subtle)] rounded-xl p-8 flex flex-col items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/5 transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <span>Drag and drop or click to upload PDF</span>
                  </div>
                </div>
                <Button onClick={() => setStep(2)} variant="primary" className="w-full">
                  Next Step <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Select your core domains</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Frontend', 'Backend', 'Full Stack', 'DevOps', 'Data Science', 'AI/ML'].map((domain) => (
                    <button key={domain} className="p-4 rounded-lg border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-background-elevated)] text-left transition-colors font-medium">
                      {domain}
                    </button>
                  ))}
                </div>
                <Button onClick={handleComplete} variant="primary" className="w-full mt-6">
                  <CheckCircle2 className="mr-2 w-4 h-4" /> Complete Profile
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* COMPANY FLOW */
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {step === 1 ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Company Identity</h3>
                  <div className="flex gap-4 items-end mb-4">
                    <div className="w-20 h-20 bg-[var(--color-background-elevated)] rounded-xl flex items-center justify-center border border-[var(--color-border-subtle)]">
                      <UploadCloud className="text-[var(--color-text-muted)]" />
                    </div>
                    <Button variant="outline" size="sm">Upload Logo</Button>
                  </div>
                  <div className="space-y-2 mt-4">
                    <label className="text-sm font-medium">Company Website</label>
                    <input type="url" placeholder="https://" className="w-full px-4 py-3 bg-[var(--color-background-base)] border border-[var(--color-border-subtle)] rounded-lg focus:outline-none focus:border-[var(--color-accent-primary)]" />
                  </div>
                </div>
                <Button onClick={() => setStep(2)} variant="primary" className="w-full">
                  Next Step <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Escrow Configuration</h3>
                  <p className="text-[var(--color-text-muted)] mb-4">You previously provided your Tax ID. Now, link your payout account.</p>
                  <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 mb-4">
                     <p className="text-sm text-yellow-500/80">Pending Escrow API Initialization. You will be redirected securely to Razorpay/Stripe to complete KYC.</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Setup Escrow Account
                  </Button>
                </div>
                <Button onClick={handleComplete} variant="primary" className="w-full">
                  <CheckCircle2 className="mr-2 w-4 h-4" /> Finalize Setup
                </Button>
              </div>
            )}
          </div>
        )}
      </GlassCard>
    </div>
  )
}
