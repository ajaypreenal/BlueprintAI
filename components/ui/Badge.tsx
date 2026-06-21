'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'info', children, className }: BadgeProps) {
  const variants = {
    success: 'bg-success/10 text-success border border-success/30',
    warning: 'bg-warning/10 text-warning border border-warning/30',
    danger: 'bg-danger/10 text-danger border border-danger/30',
    info: 'bg-primary/10 text-primary border border-primary/30',
    neutral: 'bg-muted/10 text-muted border border-muted/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  animated?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = true,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-ink">Progress</div>
        {showLabel && <span className="text-sm text-muted">{Math.round(percentage)}%</span>}
      </div>
      <div className="w-full h-2 bg-border-soft rounded-full overflow-hidden">
        {animated ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-primary"
          />
        ) : (
          <div
            className="h-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
}
