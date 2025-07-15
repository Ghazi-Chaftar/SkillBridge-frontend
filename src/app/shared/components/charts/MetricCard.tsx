'use client'

import { DollarSign } from 'lucide-react'
import React from 'react'

import CurrencyLabel from '../utils/CurrencyLabel'

export interface MetricCardProps {
  label: string
  value: number
  icon?: React.ReactNode
  progress?: number
  trend?: number
  className?: string
  color?: string
  formattedDate?: string | undefined
}

export function MetricCard({
  label,
  value,
  icon = <DollarSign className='h-4 w-4' />,
  progress = 70, // default progress value
  className = '',
  color = 'primary',
  formattedDate
}: MetricCardProps): React.ReactElement {
  return (
    <div className={`p-2 ${className}`}>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-row items-center gap-2 '>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-100'>
              {icon}
            </div>
            <span className='text-sm font-medium'>
              {label}{' '}
              <span className='text-sm text-text-secondary'>
                {' '}
                {formattedDate}
              </span>{' '}
            </span>
          </div>
        </div>

        <div className='mt-2'>
          <CurrencyLabel className='text-md font-semibold' amount={value} />
        </div>
      </div>
      <div className='mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100'>
        <div
          className='h-full bg-primary'
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
