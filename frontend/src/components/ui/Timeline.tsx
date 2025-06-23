import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TimelineItem = {
  title: string;
  date?: string;
  description: ReactNode;
  icon?: ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  showConnectors?: boolean;
};

export function Timeline({
  items,
  className,
  orientation = 'vertical',
  lineStyle = 'solid',
  showConnectors = true,
}: TimelineProps) {
  const lineStyleClass = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  const statusColors = {
    completed: 'bg-green-500 border-green-500',
    current: 'bg-blue-500 border-blue-500',
    upcoming: 'bg-gray-300 border-gray-300',
  };

  if (orientation === 'horizontal') {
    return (
      <div className={cn('relative', className)}>
        {/* Timeline line */}
        <div 
          className={cn(
            'absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 transform',
            'bg-gray-200',
            lineStyleClass[lineStyle]
          )}
        />
        
        <div className="relative flex justify-between">
          {items.map((item, index) => {
            const status = item.status || (index === 0 ? 'current' : 'upcoming');
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';
            
            return (
              <div key={index} className="relative flex flex-col items-center">
                {/* Timeline dot */}
                <div className={cn(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2',
                  'transition-colors duration-200',
                  statusColors[status],
                  isCompleted && 'text-white',
                  isCurrent && 'ring-4 ring-blue-200',
                )}>
                  {item.icon || (
                    <span className="text-xs font-bold">
                      {isCompleted ? '✓' : index + 1}
                    </span>
                  )}
                </div>
                
                {/* Content */}
                <div className="mt-4 w-48 text-center">
                  <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                  {item.date && (
                    <p className="text-xs text-gray-500">{item.date}</p>
                  )}
                  <div className="mt-1 text-sm text-gray-600">
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical timeline (default)
  return (
    <div className={cn('relative', className)}>
      {/* Timeline line */}
      {showConnectors && (
        <div
          className={cn(
            'absolute left-4 top-0 bottom-0 w-0.5 -translate-x-1/2 transform',
            'bg-gray-200',
            lineStyleClass[lineStyle]
          )}
        />
      )}
      
      <div className="space-y-8">
        {items.map((item, index) => {
          const status = item.status || (index === 0 ? 'current' : 'upcoming');
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';
          
          return (
            <div key={index} className="relative flex">
              {/* Timeline dot */}
              <div
                className={cn(
                  'absolute left-0 top-1 z-10 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border-2',
                  'transition-colors duration-200',
                  statusColors[status],
                  isCompleted && 'text-white',
                  isCurrent && 'ring-4 ring-blue-200',
                )}
              >
                {item.icon || (
                  <span className="text-xs font-bold">
                    {isCompleted ? '✓' : index + 1}
                  </span>
                )}
              </div>
              
              {/* Content */}
              <div className="ml-12">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  {item.date && (
                    <span className="ml-2 text-sm text-gray-500">{item.date}</span>
                  )}
                </div>
                <div className="mt-1 text-gray-600">
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Timeline with cards variant
type TimelineCardProps = {
  items: TimelineItem[];
  className?: string;
  cardClassName?: string;
};

export function TimelineCards({ items, className, cardClassName }: TimelineCardProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {items.map((item, index) => {
        const status = item.status || (index === 0 ? 'current' : 'upcoming');
        const isCompleted = status === 'completed';
        const isCurrent = status === 'current';
        
        return (
          <div
            key={index}
            className={cn(
              'relative rounded-lg border p-6 shadow-sm transition-all duration-200',
              'hover:shadow-md',
              isCurrent && 'border-blue-500 ring-2 ring-blue-100',
              isCompleted ? 'border-green-100 bg-green-50' : 'bg-white',
              cardClassName
            )}
          >
            <div className="flex items-start">
              <div className={cn(
                'mr-4 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
                isCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700',
                isCurrent && 'bg-blue-100 text-blue-700'
              )}>
                {item.icon || (
                  <span className="text-sm font-bold">
                    {isCompleted ? '✓' : index + 1}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className={cn(
                    'text-lg font-medium',
                    isCompleted ? 'text-green-800' : 'text-gray-900',
                    isCurrent && 'text-blue-800'
                  )}>
                    {item.title}
                  </h3>
                  {item.date && (
                    <span className={cn(
                      'ml-2 text-sm',
                      isCompleted ? 'text-green-600' : 'text-gray-500',
                      isCurrent && 'text-blue-600'
                    )}>
                      {item.date}
                    </span>
                  )}
                </div>
                <div className={cn(
                  'mt-1',
                  isCompleted ? 'text-green-700' : 'text-gray-600',
                  isCurrent && 'text-gray-700'
                )}>
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
