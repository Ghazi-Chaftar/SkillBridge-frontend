import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from './Button'

type ExpandableComponentProps = {
  content: string
  charLimit: number
  className?: string
  isHtml?: boolean
}

const ExpandableComponent: React.FC<ExpandableComponentProps> = ({
  content,
  charLimit,
  className,
  isHtml = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const t = useTranslations('constants')
  const toggleExpand = (): void => {
    setIsExpanded(prev => !prev)
  }

  const displayedText = isExpanded ? content : content?.slice(0, charLimit)

  return (
    <div>
      {isHtml ? (
        <div
          className={cn('text-secondary', className)}
          dangerouslySetInnerHTML={{ __html: displayedText }}
        />
      ) : (
        <p className={cn('text-secondary', className)}>{displayedText}</p>
      )}
      {!isExpanded && content?.length > charLimit && '...'}
      {content?.length > charLimit && (
        <Button
          onClick={toggleExpand}
          className='align font-bold text-secondary'
          variant={'ghost'}
        >
          {isExpanded ? t('seeLess') : t('seeMore')}
        </Button>
      )}
    </div>
  )
}

export default ExpandableComponent
