'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'w-full px-4 py-2.5 rounded-lg bg-paper border border-border-soft text-ink placeholder-muted',
      'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full px-4 py-3 rounded-lg bg-paper border border-border-soft text-ink placeholder-muted',
      'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200',
      'resize-none',
      className
    )}
    {...props}
  />
));

TextArea.displayName = 'TextArea';

export { Input, TextArea };
