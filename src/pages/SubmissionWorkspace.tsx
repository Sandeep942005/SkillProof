import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, GlassCard } from '../components/ui/Card'
import { Button, cn } from '../components/ui/Button'

// Mock task info
const taskInfo: Record<string, { title: string; company: string; deadline: string; prize: number }> = {
  '1': { title: 'Build a Real-Time Chat Component', company: 'StreamLine Inc.', deadline: '2d 14h', prize: 500 },
  '2': { title: 'Design REST API for E-Commerce', company: 'ShopBase', deadline: '5d 8h', prize: 750 },
}

const defaultCode = `// SkillProof Submission Workspace
// Task: Build a Real-Time Chat Component
// 
// Write your solution below. Your code will be
// evaluated against the rubric criteria.

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  read: boolean;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      read: false,
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    // TODO: Send via WebSocket
  };

  return (
    <div className="chat-widget">
      {/* Your implementation here */}
    </div>
  );
}
`

const files = [
  { name: 'ChatWidget.tsx', language: 'typescript', active: true },
  { name: 'useWebSocket.ts', language: 'typescript', active: false },
  { name: 'ChatWidget.css', language: 'css', active: false },
  { name: 'types.ts', language: 'typescript', active: false },
  { name: 'README.md', language: 'markdown', active: false },
]

export default function SubmissionWorkspace() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const task = taskInfo[id || ''] || taskInfo['1']

  const [code, setCode] = useState(defaultCode)
  const [activeFile, setActiveFile] = useState('ChatWidget.tsx')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [integrityStatus, setIntegrityStatus] = useState<'active' | 'warning' | 'violation'>('active')
  const [tabSwitchCount, setTabSwitchCount] = useState(0)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Timer
  useEffect(() => {
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  // Tab visibility monitoring
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitchCount((c) => {
          const newCount = c + 1
          if (newCount >= 3) setIntegrityStatus('violation')
          else if (newCount >= 1) setIntegrityStatus('warning')
          return newCount
        })
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const lineCount = code.split('\n').length

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      navigate(`/submissions/${id}/result`)
    }, 2000)
  }

  const integrityColors = {
    active: 'bg-emerald-500',
    warning: 'bg-amber-500',
    violation: 'bg-rose-500',
  }

  const integrityLabels = {
    active: 'Monitoring Active',
    warning: `Warning: ${tabSwitchCount} tab switch(es)`,
    violation: 'Integrity Violation Detected',
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] animate-[fadeIn_0.3s_ease-out]">
      {/* Workspace Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link to={`/tasks/${id}`} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors shrink-0">
            ← Back
          </Link>
          <div className="h-5 w-px bg-[var(--color-border-subtle)]" />
          <div className="min-w-0">
            <h1 className="font-semibold truncate">{task.title}</h1>
            <p className="text-xs text-[var(--color-text-muted)]">{task.company} · ${task.prize}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Integrity Monitor */}
          <div className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium',
            integrityStatus === 'active' ? 'bg-emerald-500/15 text-emerald-400' :
            integrityStatus === 'warning' ? 'bg-amber-500/15 text-amber-400' :
            'bg-rose-500/15 text-rose-400'
          )}>
            <span className={cn('w-2 h-2 rounded-full animate-pulse', integrityColors[integrityStatus])} />
            {integrityLabels[integrityStatus]}
          </div>

          {/* Timer */}
          <div className="px-3 py-1.5 rounded-full bg-[var(--color-background-elevated)] text-xs font-mono font-medium">
            ⏱ {formatTime(elapsedSeconds)}
          </div>

          <Button variant="primary" size="sm" onClick={() => setShowSubmitModal(true)}>
            Submit Solution
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* File Explorer */}
        <Card className="w-52 shrink-0 p-2 overflow-y-auto hidden lg:block">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-2 mb-2">
            Files
          </p>
          {files.map((file) => (
            <button
              key={file.name}
              onClick={() => setActiveFile(file.name)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2',
                activeFile === file.name
                  ? 'bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] font-medium'
                  : 'text-[var(--color-text-muted)] hover:bg-[var(--color-background-elevated)] hover:text-[var(--color-text-primary)]'
              )}
            >
              <span className="text-xs opacity-60">
                {file.language === 'typescript' ? '🟦' : file.language === 'css' ? '🟪' : '📄'}
              </span>
              {file.name}
            </button>
          ))}

          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)] px-2 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--color-text-muted)]">Lines</span>
              <span className="font-medium">{lineCount}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--color-text-muted)]">Characters</span>
              <span className="font-medium">{code.length.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--color-text-muted)]">Deadline</span>
              <span className="font-medium text-amber-400">{task.deadline}</span>
            </div>
          </div>
        </Card>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tab Bar */}
          <div className="flex items-center gap-px bg-[var(--color-background-elevated)] rounded-t-xl p-1 shrink-0">
            {files.filter((f) => f.name === activeFile || f.name === 'ChatWidget.tsx').map((file) => (
              <button
                key={file.name}
                onClick={() => setActiveFile(file.name)}
                className={cn(
                  'px-4 py-1.5 rounded-lg text-xs font-medium transition-all',
                  activeFile === file.name
                    ? 'bg-[var(--color-background-surface)] text-[var(--color-text-primary)] shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                )}
              >
                {file.name}
              </button>
            ))}
          </div>

          {/* Editor Body */}
          <div className="flex-1 relative rounded-b-xl overflow-hidden border border-[var(--color-border-subtle)] border-t-0">
            {/* Line Numbers + Code */}
            <div className="absolute inset-0 flex">
              {/* Line numbers */}
              <div className="w-12 bg-[var(--color-background-elevated)] border-r border-[var(--color-border-subtle)] py-3 text-right pr-3 overflow-hidden select-none shrink-0">
                {code.split('\n').map((_, i) => (
                  <div key={i} className="text-xs text-[var(--color-text-muted)] leading-6 font-mono opacity-50">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Code textarea */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 bg-[var(--color-background-surface)] text-[var(--color-text-primary)] font-mono text-sm leading-6 p-3 resize-none outline-none overflow-auto"
                style={{ tabSize: 2 }}
              />
            </div>
          </div>
        </div>

        {/* Right Panel: Quick Info */}
        <Card className="w-56 shrink-0 p-4 overflow-y-auto hidden xl:block">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
            Rubric Preview
          </p>
          <div className="space-y-3">
            {[
              { name: 'Functionality', weight: 30 },
              { name: 'Code Quality', weight: 25 },
              { name: 'Performance', weight: 20 },
              { name: 'UI/UX', weight: 15 },
              { name: 'Documentation', weight: 10 },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--color-text-secondary)]">{item.name}</span>
                  <span className="font-medium text-[var(--color-text-muted)]">{item.weight}%</span>
                </div>
                <div className="h-1 w-full rounded-full bg-[var(--color-background-elevated)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
                    style={{ width: `${item.weight}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)]">
            <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
              Integrity Log
            </p>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Session started
              </div>
              {tabSwitchCount > 0 && (
                <div className="flex items-center gap-2 text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {tabSwitchCount} tab switch(es)
                </div>
              )}
              {integrityStatus === 'violation' && (
                <div className="flex items-center gap-2 text-rose-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  Violation flagged
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <GlassCard className="w-full max-w-md p-6 mx-4">
            <h2 className="text-xl font-bold mb-2">Submit Your Solution?</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Your code will be evaluated against the rubric. You cannot edit after submission.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Time Spent</span>
                <span className="font-mono font-medium">{formatTime(elapsedSeconds)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Lines of Code</span>
                <span className="font-medium">{lineCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Integrity Status</span>
                <span className={cn(
                  'font-medium',
                  integrityStatus === 'active' ? 'text-emerald-400' :
                  integrityStatus === 'warning' ? 'text-amber-400' : 'text-rose-400'
                )}>
                  {integrityStatus === 'active' ? '✓ Clean' : integrityStatus === 'warning' ? '⚠ Flagged' : '✕ Violation'}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowSubmitModal(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Confirm Submit'}
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
