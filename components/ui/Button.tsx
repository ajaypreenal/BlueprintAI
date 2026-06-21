'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-secondary text-paper hover:bg-secondary/90',
      secondary: 'bg-card-dark text-ink border border-border-soft hover:border-muted',
      outline: 'border border-border-soft text-ink hover:bg-ink/5',
      ghost: 'text-muted hover:text-ink',
      danger: 'bg-danger text-paper hover:opacity-90',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          'group inline-flex items-center justify-center gap-2 rounded-lg font-medium',
          'transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
