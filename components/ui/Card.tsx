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
        'rounded-lg border transition-colors duration-200 bg-card-dark border-border-soft',
        hoverable && 'hover:border-muted cursor-pointer',
        className
      )}
      {...props}
    />
  )
);

Card.displayName = 'Card';

export default Card;
