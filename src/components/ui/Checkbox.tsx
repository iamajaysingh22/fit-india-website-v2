'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className,
    label,
    error,
    id,
    ...props
  }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="w-full">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id={checkboxId}
              className={cn(
                'sr-only',
                className
              )}
              ref={ref}
              {...props}
            />
            <div className="relative">
              <div className={cn(
                'w-5 h-5 border-2 rounded transition-all duration-200 cursor-pointer',
                'border-neutral-300 bg-white',
                'peer-checked:bg-primary-500 peer-checked:border-primary-500',
                error && 'border-red-300'
              )}>
                <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
              </div>
              <input
                type="checkbox"
                id={checkboxId}
                className="peer absolute top-0 left-0 w-5 h-5 opacity-0 cursor-pointer"
                ref={ref}
                {...props}
              />
            </div>
          </div>
          {label && (
            <div className="ml-3 text-sm">
              <label htmlFor={checkboxId} className="text-neutral-700 cursor-pointer">
                {label}
              </label>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;