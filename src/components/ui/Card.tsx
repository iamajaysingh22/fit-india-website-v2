'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd'> {
  hover?: boolean;
  animated?: boolean;
  delay?: number;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    hover = true,
    animated = true,
    delay = 0,
    children,
    ...props
  }, ref) => {
    const baseClasses = 'bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden';
    
    const CardComponent = animated ? motion.div : 'div';
    const animationProps = animated ? {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.6, delay, ease: "easeOut" },
      ...(hover && {
        whileHover: { 
          y: -5, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.2 }
        }
      })
    } : {};
    
    return (
      <CardComponent
        className={cn(baseClasses, className)}
        ref={ref}
        {...animationProps}
        {...props}
      >
        {children}
      </CardComponent>
    );
  }
);

Card.displayName = 'Card';

export default Card;