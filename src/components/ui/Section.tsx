'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: 'white' | 'gray' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({
    className,
    background = 'white',
    padding = 'lg',
    container = true,
    children,
    ...props
  }, ref) => {
    const backgrounds = {
      white: 'bg-white',
      gray: 'bg-neutral-50',
      gradient: 'bg-gradient-hero',
    };
    
    const paddings = {
      sm: 'py-12',
      md: 'py-16',
      lg: 'py-20',
      xl: 'py-24',
    };
    
    return (
      <section
        className={cn(
          backgrounds[background],
          paddings[padding],
          className
        )}
        ref={ref}
        {...props}
      >
        {container ? (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;