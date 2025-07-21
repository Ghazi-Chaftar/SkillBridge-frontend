import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/src/app/shared/components'

interface DescriptionProps {
  description: string
  lineNumber?: string
  className?: string
  collapsed?: boolean
}

const Description: React.FC<DescriptionProps> = ({
  description,
  lineNumber = 2,
  className,
  collapsed = true
}) => {
  const tc = useTranslations('constants')

  const [showMore, setShowMore] = useState<boolean>(false)
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false)

  const descriptionRef = useRef<HTMLDivElement>(null)

  const toggleDescription = (): void => setShowMore(prev => !prev)

  useEffect(() => {
    if (descriptionRef.current) {
      const contentHeight = descriptionRef.current.scrollHeight
      const containerHeight = descriptionRef.current.clientHeight

      setIsOverflowing(contentHeight > containerHeight)
    }
  }, [description])

  return (
    <div className={cn('min-w-0  flex-col gap-1', className)}>
      <div
        ref={descriptionRef}
        className={cn(
          'text-text-secondary',
          showMore ? '' : `line-clamp-${lineNumber}`
        )}
        style={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical'
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {collapsed && (
        <>
          {isOverflowing && !showMore && (
            <Button
              onClick={toggleDescription}
              className='float-right mt-2 flex flex-row items-center justify-center gap-1 self-end !p-0 text-sm text-primary'
              variant={'link'}
            >
              {tc('seeMore')}
              <ChevronDown size={20} />
            </Button>
          )}

          {isOverflowing && showMore && (
            <Button
              onClick={toggleDescription}
              className='float-right mt-2 flex flex-row items-center justify-center gap-1 self-end !p-0 text-sm text-primary'
              variant={'link'}
            >
              {tc('seeLess')}
              <ChevronUp size={20} />
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default Description
