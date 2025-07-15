'use client'

interface ChartSkeletonProps {
  type?: 'bar' | 'line' | 'pie' | 'area'
  className?: string
  height?: string | number
}

export const ChartSkeleton = ({
  type = 'bar',
  className = '',
  height = '100%'
}: ChartSkeletonProps): JSX.Element => {
  return (
    <div
      className={`w-full rounded-lg  ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {type === 'pie' ? (
        <div className='flex h-full w-full items-center justify-center'>
          <div className='relative flex h-[60%] w-[35%] items-center justify-center'>
            <div className='absolute h-full w-full animate-pulse rounded-full bg-gray-200'></div>
            <div className='absolute h-[80%] w-[80%] rounded-full bg-white'>
              <div className='flex h-full w-full items-center justify-center'>
                <div className='h-[4px] w-[30%] animate-pulse bg-gray-200'></div>
              </div>
            </div>
          </div>
        </div>
      ) : type === 'area' ? (
        <div className='flex h-full flex-col justify-end p-4'>
          <div className='mb-4 h-4 w-1/3 animate-pulse rounded bg-gray-200' />
          <div className='relative flex h-[70%] w-full items-end'>
            {/* Create wave-like area skeleton */}
            <div className='absolute bottom-0 h-[80%] w-full overflow-hidden'>
              <div
                className='animate-pulse bg-gray-200'
                style={{
                  clipPath:
                    'polygon(0 100%, 0 30%, 16% 45%, 33% 25%, 50% 55%, 66% 15%, 85% 35%, 100% 10%, 100% 100%)',
                  height: '100%',
                  width: '100%'
                }}
              />
            </div>
            {/* Add dots for data points */}
            <div className='absolute bottom-[30%] left-0 h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[45%] left-[16%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[25%] left-[33%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[55%] left-[50%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[15%] left-[66%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[35%] left-[85%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[10%] left-[100%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
          </div>
          {/* X-axis ticks */}
          <div className='mt-2 flex w-full justify-between'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className='h-2 w-8 animate-pulse rounded bg-gray-200'
              />
            ))}
          </div>
        </div>
      ) : type === 'line' ? (
        <div className='flex h-full flex-col justify-end p-4'>
          <div className='mb-4 h-4 w-1/3 animate-pulse rounded bg-gray-200' />
          <div className='relative h-[70%] w-full'>
            {/* Create line path */}
            <svg className='h-full w-full'>
              <path
                d='M0,70% L16%,55% L33%,75% L50%,45% L66%,85% L85%,65% L100%,90%'
                stroke='rgb(229, 231, 235)'
                strokeWidth='3'
                fill='none'
                className='animate-pulse'
              />
            </svg>
            {/* Add dots for data points */}
            <div className='absolute bottom-[30%] left-0 h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[45%] left-[16%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[25%] left-[33%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[55%] left-[50%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[15%] left-[66%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[35%] left-[85%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
            <div className='absolute bottom-[10%] left-[100%] h-2 w-2 animate-pulse rounded-full bg-gray-300' />
          </div>
          {/* X-axis ticks */}
          <div className='mt-2 flex w-full justify-between'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className='h-2 w-8 animate-pulse rounded bg-gray-200'
              />
            ))}
          </div>
        </div>
      ) : (
        // Bar chart (default)
        <div className='flex h-full flex-col justify-end p-4'>
          <div className='mb-4 h-4 w-1/3 animate-pulse rounded bg-gray-200' />
          <div className='flex h-[70%] items-end justify-around gap-2'>
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className='w-1/12 animate-pulse rounded-t bg-gray-200'
                style={{
                  height: `${20 + Math.random() * 80}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
