'use client'
import { Minus, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../utils'
import { Card } from './Card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from './Collapsible'

interface CollapsibleCardProps {
  title?: string
  children: React.ReactNode
  trigger?: React.ReactNode
  className?: string
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  children,
  className,
  trigger
}) => {
  const [isOpen, setIsOpen] = React.useState(true)
  const t = useTranslations('constants')
  return (
    <Card className='p-5 pt-2'>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn(className, 'w-full space-y-4 pr-1')}
      >
        <div className='flex items-center justify-between space-x-4 px-4'>
          <h2 className='text font-semibold'>{title}</h2>
          <CollapsibleTrigger asChild>
            {trigger ? (
              trigger
            ) : (
              <Button variant='ghost' size='sm' className='w-9 p-0'>
                {isOpen && (
                  <div className='flex items-center justify-center gap-1 pr-5 text-text-secondary'>
                    <Minus className='h-4 w-4' />
                    <p className='font-semibold'>{t('showLess')} </p>
                  </div>
                )}
                {!isOpen && (
                  <div className='flex items-center justify-center gap-1 pr-5 text-text-secondary'>
                    <Plus className='h-4 w-4' />
                    <p className='font-semibold'>{t('showMore')}</p>
                  </div>
                )}
              </Button>
            )}
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className={cn(' space-y-2 px-4')}>
          {children}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default CollapsibleCard
