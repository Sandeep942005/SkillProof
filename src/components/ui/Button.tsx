import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          {
            'bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white hover:opacity-90 shadow-lg hover:shadow-[var(--color-accent-primary)]/25':
              variant === 'primary',
            'bg-[var(--color-background-elevated)] text-[var(--color-text-primary)] hover:bg-[var(--color-border-subtle)]':
              variant === 'secondary',
            'border-2 border-[var(--color-border-subtle)] bg-transparent hover:border-[var(--color-accent-primary)] text-[var(--color-text-primary)]':
              variant === 'outline',
            'bg-transparent hover:bg-[var(--color-background-elevated)] text-[var(--color-text-primary)]':
              variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-8 text-base': size === 'md',
            'h-14 px-10 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
