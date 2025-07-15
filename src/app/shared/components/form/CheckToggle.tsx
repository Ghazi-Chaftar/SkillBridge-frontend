'use client'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'

import { cn, getFileUrl } from '@/lib/utils'
import { Button } from '@/src/app/shared/components'

type CheckToggleProps = {
  active: boolean
  content: string
  label: string
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  image?: string
  tip?: string
  third?: boolean
  withoutCheckBox?: boolean
  variant?: string
  className?: string
  imageClassName?: string
}

const CheckToggle: React.FC<CheckToggleProps> = props => {
  const {
    active,
    label,
    onClick,
    image,
    tip,
    variant = 'default',
    className,
    imageClassName
  } = props

  // New state for toggling description visibility
  const [showMore, setShowMore] = useState<boolean>(false)

  // Ref for description text
  const tipRef = useRef<HTMLSpanElement>(null)
  const [isTruncated, setIsTruncated] = useState<boolean>(false)
  const t = useTranslations('constants')
  const toggleDescription = (e: React.MouseEvent): void => {
    e.stopPropagation()
    setShowMore(prev => !prev)
  }

  // Detect if the tip is truncated
  useEffect(() => {
    if (tipRef.current) {
      setIsTruncated(tipRef.current.scrollHeight > tipRef.current.clientHeight)
    }
  }, [tip])

  return (
    <div
      className={cn(
        'flex w-full cursor-pointer flex-row items-center justify-between rounded-[10px] bg-white px-3 py-4 ring-1 ring-secondary-gray md:w-[40%]',
        variant === 'card' &&
          'min-w-[250px]  flex-col-reverse border-none drop-shadow-md',
        active && 'bg-soft-primary   ring-1 ring-primary ',
        className
      )}
      onClick={onClick}
    >
      <div className='flex flex-row items-center gap-2'>
        {image && variant !== 'card' && (
          <Image
            className={cn(
              'flex cursor-pointer justify-end',
              variant === 'card' && 'h-44 w-44',
              imageClassName
            )}
            src={getFileUrl(image) as string}
            height={50}
            width={50}
            alt=''
          />
        )}
        <div className='ml-3 flex flex-col gap-1 text-[14px] font-medium text-secondary'>
          <p
            className={cn(
              variant === 'card' && 'text-md font-bold  ',
              variant === 'card' && 'text-center'
            )}
          >
            {label}
          </p>
          {tip && (
            <div className='w-full'>
              <span
                ref={tipRef}
                className={cn(
                  'block text-[12px] text-text-secondary',
                  !showMore && 'line-clamp-3'
                )}
                dangerouslySetInnerHTML={{ __html: tip }}
              />

              {/* Only show the button if the tip is truncated */}
              {isTruncated && !showMore && (
                <Button
                  onClick={toggleDescription}
                  className='mt-1 flex flex-row items-center justify-start gap-1 text-[10px] text-text-secondary'
                  variant={'link'}
                >
                  {t('seeMore')}
                  <ChevronDown size={14} className='' />
                </Button>
              )}

              {showMore && (
                <Button
                  onClick={toggleDescription}
                  className='mt-1 flex flex-row items-center justify-start gap-1 text-[10px] text-text-secondary'
                  variant={'link'}
                >
                  {t('seeLess')}
                  <ChevronUp size={14} className='' />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {image && variant === 'card' && (
        <Image
          className={cn(
            'flex cursor-pointer justify-end',
            variant === 'card' && 'h-44 w-44',
            imageClassName
          )}
          src={getFileUrl(image) as string}
          height={50}
          width={50}
          alt=''
        />
      )}
    </div>
  )
}

export default CheckToggle
