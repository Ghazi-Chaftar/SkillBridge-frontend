'use client'

import { BarChart4, LineChart, PieChart } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ChartEmptyStateProps {
  title?: string
  message?: string
  type?: 'bar' | 'line' | 'pie' | 'area'
  className?: string
  height?: string | number
}

export const ChartEmptyState = ({
  title,
  message,
  type = 'bar',
  className = '',
  height = '100%'
}: ChartEmptyStateProps): React.ReactElement => {
  const t = useTranslations('common')

  // Choose the appropriate icon based on chart type
  const renderIcon = (): React.ReactElement => {
    switch (type) {
      case 'pie':
        return <PieChart className='h-12 w-12 text-gray-300' />
      case 'line':
      case 'area':
        return <LineChart className='h-12 w-12 text-gray-300' />
      default:
        return <BarChart4 className='h-12 w-12 text-gray-300' />
    }
  }

  return (
    <div
      className={`flex h-${typeof height === 'string' ? height : `[${height}px]`} w-full flex-col items-center justify-center rounded-lg bg-gray-50/50 ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {renderIcon()}
      <h3 className='mt-4 text-center text-lg font-medium text-gray-500'>
        {title || t('noDataAvailable')}
      </h3>
      <p className='mt-2 max-w-sm text-center text-sm text-gray-400'>
        {message || t('checkBackLater')}
      </p>
    </div>
  )
}
