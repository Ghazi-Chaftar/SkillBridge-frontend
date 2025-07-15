'use client'

import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { FC, useState } from 'react'

import { cn, getFileUrl } from '@/lib/utils'
import { Button } from '@/src/app/shared/components'

export interface FormType {
  setValue: any
  watch: any
}

export interface CounterProps {
  content: string
  image?: string
  form: FormType
  name: string
  className?: string
  textClassName?: string
  defaultValue?: number
  small?: boolean
}

const Counter: FC<CounterProps> = props => {
  const {
    content,
    form,
    image,
    name,
    className,
    textClassName,
    defaultValue,
    small
  } = props
  const [count, setCount] = useState(defaultValue || form.watch(name) || 0)

  const handleAdd = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    const newValue = count + 1
    setCount(newValue)
    form.setValue(name, newValue)
  }

  const handleMin = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    if (count > 0) {
      const newValue = count - 1
      setCount(newValue)
      form.setValue(name, newValue)
    }
  }

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-between space-y-5 rounded-[10px] border border-secondary-gray bg-white px-3 py-4 md:w-[31%] md:min-w-[300px] md:flex-row md:space-y-0',
        className
      )}
    >
      <p
        className={cn(
          'text-md ml-3 flex items-center justify-center gap-2 font-medium text-secondary',
          textClassName
        )}
      >
        {image && (
          <Image
            src={getFileUrl(image) as string}
            alt='icon'
            height={20}
            width={20}
          />
        )}
        {content}
      </p>

      <div className='flex flex-row items-center gap-2'>
        <Button
          className={cn(small && 'h-5 w-5  px-0 py-0')}
          size='sm'
          onClick={e => {
            handleMin(e)
          }}
        >
          <Minus
            color='white'
            className={cn('h-6 w-6 ', small && 'h-3 w-3 ')}
          />
        </Button>
        <div className='flex flex-col gap-1 text-[16px] font-medium text-secondary'>
          <p className={cn('text-[20px] text-secondary', small && 'text-base')}>
            {count}
          </p>
        </div>
        <Button
          className={cn(small && 'h-5 w-5  px-0 py-0')}
          size='sm'
          onClick={e => {
            handleAdd(e)
          }}
        >
          <Plus color='white' className={cn('h-6 w-6', small && 'h-3 w-3 ')} />
        </Button>
      </div>
    </div>
  )
}

export default Counter
