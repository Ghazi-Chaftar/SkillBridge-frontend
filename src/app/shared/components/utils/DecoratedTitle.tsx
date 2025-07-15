import React, { FC } from 'react'

import { cn } from '@/lib/utils'

type DecoratedTitleprops = {
  title: string
  className?: string
  lineClassName?: string
}

const DecoratedTitle: FC<DecoratedTitleprops> = ({
  title,
  className,
  lineClassName
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <h1
        className={cn(
          'text-2xl font-medium tracking-tight text-secondary md:text-3xl',
          className
        )}
      >
        {title}
      </h1>
      <p className={cn('h-2 w-20 bg-primary', lineClassName)}></p>
    </div>
  )
}

export default DecoratedTitle
