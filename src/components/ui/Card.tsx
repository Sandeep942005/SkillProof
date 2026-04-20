import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from './Button' // REUSING CN UTILITY

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-background-surface)] text-[var(--color-text-primary)] shadow-sm',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

const GlassCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass rounded-xl text-[var(--color-text-primary)]',
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = 'GlassCard'

export { Card, GlassCard }
