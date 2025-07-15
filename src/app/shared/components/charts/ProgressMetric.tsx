'use client'

import React from 'react'

import { Card } from '../layout'
import CurrencyLabel from '../utils/CurrencyLabel'

export interface ProgressMetric {
  label: string
  value: number
  color: string
  percentage?: number // Optional - will be calculated if not provided
}

interface FinancialOverviewProps {
  title?: string
  mainValue: number
  metrics: ProgressMetric[]
  trendValue?: number
  showTrend?: boolean
  className?: string
  cardClassName?: string
  showCard?: boolean
  height?: number | string // New prop for controlling height
  progressBarHeight?: number // New prop for controlling the progress bar height
  withMetrics?: boolean // New prop to show/hide metrics
}

export function FinancialOverview({
  title,
  mainValue,
  metrics,
  className = '',
  cardClassName = '',
  showCard = true,
  height = 'auto', // Default to auto height
  withMetrics = false,
  progressBarHeight = 20 // Default to 8px (taller than before)
}: FinancialOverviewProps): JSX.Element {
  // Calculate percentages if not provided
  const metricsWithPercentages = React.useMemo(() => {
    const total = metrics.reduce((sum, metric) => sum + metric.value, 0)

    return metrics.map(metric => ({
      ...metric,
      percentage:
        metric.percentage ?? (total > 0 ? (metric.value / total) * 100 : 0)
    }))
  }, [metrics])

  const Content = (
    <div
      className={`${className} flex flex-col`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {title && (
        <div className='mb-8'>
          <CurrencyLabel amount={mainValue} className='text-4xl font-bold' />
        </div>
      )}

      {/* Progress bar with configurable height */}
      <div
        className='relative mb-6 w-full overflow-hidden rounded-full bg-gray-100'
        style={{ height: `${progressBarHeight}px` }}
      >
        {metricsWithPercentages.map((metric, index) => {
          // Calculate the position for this segment
          const previousSegmentsWidth = metricsWithPercentages
            .slice(0, index)
            .reduce((sum, m) => sum + m.percentage, 0)

          return (
            <div
              key={metric.label}
              className='absolute h-full'
              style={{
                backgroundColor: metric.color,
                width: `${metric.percentage}%`,
                left: `${previousSegmentsWidth}%`
              }}
            />
          )
        })}
      </div>
      {withMetrics && (
        <div className='mt-auto flex flex-wrap justify-between gap-6'>
          {withMetrics &&
            metricsWithPercentages.map(metric => (
              <div key={metric.label} className='min-w-[150px] flex-1'>
                <div className='mb-2 flex items-center gap-2'>
                  <div
                    className='h-4 w-4 rounded-full'
                    style={{ backgroundColor: metric.color }}
                  />
                  <span className='text-base text-muted-foreground'>
                    {metric.label}
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <CurrencyLabel
                    amount={metric.value}
                    className='text-lg font-semibold'
                  />
                  <span className='text-sm font-medium text-muted-foreground'>
                    {metric.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
      {/* More spacing between metrics */}
    </div>
  )

  if (showCard) {
    return (
      <Card
        className={`p-8 ${cardClassName}`}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        {Content}
      </Card>
    )
  }

  return Content
}
