'use client'
import Image from 'next/image'
import React from 'react'

import { cn, getFileUrl } from '@/lib/utils'

import TickIcon from '../../../icons/tick'
import { Variant } from '../../constants/enums'

type ToggleImageProps = {
  active: boolean
  content: string
  label: string
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  image: string
  tip?: string
  third?: boolean
  variant?: Variant
  className?: string
  lucide?: boolean
}

const ToggleImage: React.FC<ToggleImageProps> = props => {
  const {
    active,

    label,
    onClick,
    image,
    variant = Variant.Default,
    className
  } = props

  return (
    <figure
      onClick={onClick}
      className={cn(
        'relative w-full cursor-pointer rounded-lg ',
        active &&
          variant === Variant.Default &&
          'rounded-lg border-primary ring-2 ring-primary',
        variant === Variant.Default && 'h-[300px] max-w-[200px]',
        variant === Variant.Icon && 'h-[130px] max-w-[180px] rounded-md',
        className
      )}
    >
      <Image
        className={cn(
          'z-0 h-full w-full rounded-lg object-cover object-center',
          variant === Variant.Icon && 'rounded-sm'
        )}
        src={getFileUrl(image) as string}
        layout='fill'
        objectFit='cover'
        alt=''
      />
      <figcaption
        className={cn(
          'absolute bottom-0 left-0 right-0 z-10 flex justify-center',
          variant === Variant.Default && 'bottom-6'
        )}
      >
        <div className='rounded-xl px-4 py-2'>
          <p className='text-center text-[14px] font-semibold text-white'>
            {label}
          </p>
        </div>
      </figcaption>
      <div
        className={cn(
          'absolute inset-0 h-1/2 self-end rounded-lg bg-gradient-to-t from-secondary to-transparent',
          variant === Variant.Icon && 'rounded-sm'
        )}
      ></div>

      {variant === Variant.Icon && (
        <div
          className={cn(
            'relative flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100',
            active && 'opacity-100' // always visible if active
          )}
        >
          <TickIcon />
        </div>
      )}
    </figure>
  )
}

export default ToggleImage
