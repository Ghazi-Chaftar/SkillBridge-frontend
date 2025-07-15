'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React from 'react'

import { cn } from '@/lib/utils'

type RadioToggleProps = {
  active: boolean
  content: string
  label: string
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  image?: string
  tip?: string

  variant?: string
  className?: string
  translation?: string
}

const RadioToggle: React.FC<RadioToggleProps> = props => {
  const {
    active,

    label,
    onClick,
    image,
    tip,
    variant = 'default',
    className,
    translation
  } = props

  const t = useTranslations(translation)
  return (
    <div
      onClick={onClick}
      className={cn('flex w-1/2  flex-col items-stretch gap-5', className)}
    >
      <div
        className={cn(
          'flex w-full cursor-pointer flex-row items-center justify-between rounded-[10px] bg-white  py-4 pb-7 pt-4 shadow-[0_4px_4px_0px_rgba(145,158,171,0.20)] ring-1 ring-secondary-gray',
          variant === 'card' && '  flex-col border-none drop-shadow-md',
          active && 'bg-soft-primary  ring-1 ring-primary'
        )}
      >
        {image && (
          <Image
            className={cn(
              'flex cursor-pointer justify-end',
              variant === 'card' && 'h-32 w-full'
            )}
            src={image}
            height={100}
            width={100}
            alt=''
          />
        )}
      </div>
      <div className='flex flex-col items-center gap-2'>
        <div className='ml-3 flex flex-row items-center gap-2 text-[14px] font-medium text-secondary'>
          <input
            type='radio'
            checked={active}
            className='radio-custom h-4 w-4 cursor-pointer border-gray-300 focus:ring-primary'
            color='var(--primary)'
            onClick={onClick}
          />
          <p className={cn(variant === 'card' && 'text-sm font-bold')}>
            {t(label)}
          </p>
        </div>
        {tip && (
          <span className='w-3/4 text-center text-[14px] font-light text-text-secondary'>
            {t(tip)}
          </span>
        )}
      </div>
    </div>
  )
}

export default RadioToggle
