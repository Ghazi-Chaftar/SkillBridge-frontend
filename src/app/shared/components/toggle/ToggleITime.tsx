'use client'
import React from 'react'

import { cn } from '@/lib/utils'

type ToggleTimeProps = {
  active: boolean
  content: string
  label: string
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  image?: React.ReactElement
  tip?: string
  third?: boolean

  variant?: string
  className?: string
  lucide?: boolean
  disabled?: boolean
}

const ToggleTime: React.FC<ToggleTimeProps> = props => {
  const {
    active,
    label,
    onClick,
    image,
    tip,
    lucide,
    variant = 'default',
    className,
    disabled
  } = props

  return (
    <div
      className={cn(
        'group flex  w-fit cursor-pointer flex-row items-center justify-between gap-1 rounded-[8px] bg-white px-3 py-2 ring-1 ring-secondary-gray transition-colors duration-300 hover:bg-primary ',
        variant === 'card' && '  flex-col  border-none pt-2 drop-shadow-md',
        variant === 'pill' && ' !rounded-[50px]',
        active && 'bg-primary   ring-1 ring-primary ',
        disabled && 'pointer-events-none cursor-not-allowed opacity-50',
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {image &&
        React.cloneElement(image as React.ReactElement, {
          className: cn(
            active && !lucide && 'fill-white',
            active && lucide && 'stroke-white',
            lucide ? 'group-hover:stroke-white' : 'group-hover:fill-white'
          )
        })}
      <div className='flex w-full flex-row items-center justify-center gap-2 self-center '>
        <div className=' flex flex-col gap-1 text-[12px] font-medium text-secondary'>
          <p className={cn(active && 'text-white ', 'group-hover:text-white')}>
            {label}
          </p>
          {tip && (
            <span className='text-[12px] text-text-secondary'>{tip}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ToggleTime
