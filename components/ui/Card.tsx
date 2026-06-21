'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, glass = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border transition-all duration-200',
        glass
          ? 'bg-white/5 backdrop-blur-md border-white/10'
          : 'bg-card-dark border-slate-700',
        hoverable && 'hover:border-slate-500 hover:shadow-lg hover:shadow-primary/20 cursor-pointer',
        className
      )}
      {...props}
    />
  )
);

Card.displayName = 'Card';

export default Card;
