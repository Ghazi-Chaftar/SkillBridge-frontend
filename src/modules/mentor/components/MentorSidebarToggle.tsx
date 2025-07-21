'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocale } from 'next-intl'

import { Button } from '@/src/app/shared/components'

interface MentorSidebarToggleProps {
  isOpen: boolean | undefined
  setIsOpen?: () => void
}

export const MentorSidebarToggle = ({
  isOpen,
  setIsOpen
}: MentorSidebarToggleProps): JSX.Element => {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <div className='invisible absolute -right-[16px] top-[12px] z-20 lg:visible'>
      <Button
        onClick={() => setIsOpen?.()}
        className='h-8 w-8 rounded-md bg-white shadow-md hover:bg-gray-50'
        variant='outline'
        size='icon'
      >
        {isRTL ? (
          isOpen ? (
            <ChevronRight className='h-4 w-4' />
          ) : (
            <ChevronLeft className='h-4 w-4' />
          )
        ) : isOpen ? (
          <ChevronLeft className='h-4 w-4' />
        ) : (
          <ChevronRight className='h-4 w-4' />
        )}
        <span className='sr-only'>Toggle Sidebar</span>
      </Button>
    </div>
  )
}
