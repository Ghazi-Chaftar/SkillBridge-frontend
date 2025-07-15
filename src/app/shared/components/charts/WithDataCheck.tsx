'use client'

import React from 'react'

import { ChartEmptyState } from './ChartEmptyState'
import { ChartSkeleton } from './ChartSkeleton'

interface WithDataCheckProps {
  chartData: any[] | undefined | null
  emptyTitle?: string
  emptyMessage?: string
  chartType?: 'bar' | 'line' | 'pie' | 'area'
  height?: string | number
  valueKeys?: string[] // Specify which keys contain the actual values to check
  isEmpty?: boolean // Allow manual override for special cases
  children: React.ReactNode
  isLoading?: boolean
}

export const WithDataCheck: React.FC<WithDataCheckProps> = ({
  chartData,
  emptyTitle,
  emptyMessage,
  chartType = 'bar',
  height = '100%',
  valueKeys, // Specific keys to check for values
  isEmpty: isEmptyProp, // External empty state override
  children,
  isLoading
}) => {
  // Check if data is empty or only contains zeros
  const isEmpty = React.useMemo(() => {
    // If explicitly provided, use that
    if (typeof isEmptyProp === 'boolean') {
      return isEmptyProp
    }

    // Basic empty checks
    if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
      return true
    }

    // If specific keys are provided, only check those
    if (valueKeys && valueKeys.length > 0) {
      return chartData.every(item => {
        return valueKeys.every(key => {
          // Skip keys that don't exist in this item
          if (!(key in item)) return true

          const value = item[key]
          return value === 0 || value === null || value === undefined
        })
      })
    }

    // Generic check - find any numeric value that isn't zero
    return chartData.every(item => {
      // Get all values that are numbers
      const numericValues = Object.entries(item)
        .filter(([key, value]) => {
          // Ignore common non-data keys
          const ignoreKeys = [
            'month',
            'date',
            'name',
            'id',
            'key',
            'label',
            'category',
            'browser',
            'originalKey'
          ]
          return !ignoreKeys.includes(key) && typeof value === 'number'
        })
        .map(([_, value]) => value)

      // If there are no numeric values, or all are zero
      return numericValues.length === 0 || numericValues.every(val => val === 0)
    })
  }, [chartData, valueKeys, isEmptyProp])

  // Remove the console.log in production
  // console.log('chartData', chartData, 'isEmpty', isEmpty)
  if (isLoading) {
    return <ChartSkeleton type={chartType} height={height} />
  }
  if (isEmpty) {
    return (
      <ChartEmptyState
        title={emptyTitle}
        message={emptyMessage}
        type={chartType}
        height={height}
      />
    )
  }

  return <>{children}</>
}
