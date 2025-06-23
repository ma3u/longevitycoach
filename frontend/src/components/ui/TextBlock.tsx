import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TextBlockProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
};

export function TextBlock({
  title,
  subtitle,
  children,
  className,
  align = 'left',
  maxWidth = '2xl',
}: TextBlockProps) {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn('flex flex-col gap-4', alignment[align], maxWidthClass[maxWidth], className)}>
      {title && (
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-lg font-medium text-indigo-600">
          {subtitle}
        </p>
      )}
      <div className="prose prose-indigo prose-lg text-gray-600">
        {children}
      </div>
    </div>
  );
}

type TextBlockGridProps = {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
};

export function TextBlockGrid({
  children,
  className,
  cols = 2,
  gap = 'lg',
}: TextBlockGridProps) {
  const gapClass = {
    none: 'gap-0',
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10',
    '2xl': 'gap-12',
    '3xl': 'gap-16',
    '4xl': 'gap-20',
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    7: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-7',
    8: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-8',
    9: 'grid-cols-3 md:grid-cols-6 lg:grid-cols-9',
    10: 'grid-cols-4 md:grid-cols-5 lg:grid-cols-10',
    11: 'grid-cols-4 md:grid-cols-6 lg:grid-cols-11',
    12: 'grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
  };

  return (
    <div className={cn('grid', gridCols[cols], gapClass[gap], className)}>
      {children}
    </div>
  );
}

type TextBlockHighlightProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
};

export function TextBlockHighlight({
  children,
  className,
  variant = 'primary',
}: TextBlockHighlightProps) {
  const variantClasses = {
    primary: 'bg-indigo-50 text-indigo-800 border-l-4 border-indigo-500',
    secondary: 'bg-gray-50 text-gray-800 border-l-4 border-gray-500',
    success: 'bg-green-50 text-green-800 border-l-4 border-green-500',
    warning: 'bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500',
    danger: 'bg-red-50 text-red-800 border-l-4 border-red-500',
    info: 'bg-blue-50 text-blue-800 border-l-4 border-blue-500',
  };

  return (
    <div className={cn('p-4 rounded-r-md my-4', variantClasses[variant], className)}>
      {children}
    </div>
  );
}
