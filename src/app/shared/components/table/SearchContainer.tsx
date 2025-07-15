import React from 'react'

import { cn } from '@/lib/utils'

interface SearchContainerProps {
  children: React.ReactNode
  hasSearchInput?: boolean
  hasTwoSearchInputs?: boolean
}

export const SearchContainer: React.FC<SearchContainerProps> = ({
  children,
  hasSearchInput,
  hasTwoSearchInputs
}) => {
  return (
    <div
      className={cn(
        ' flex w-[80%] flex-col ',
        hasSearchInput && '-ml-3 pt-0',
        hasTwoSearchInputs && ' gap-4'
      )}
    >
      {children}
    </div>
  )
}
