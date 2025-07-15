'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/src/app/shared/components'

export type SimpleCalendarProps = React.ComponentProps<typeof DayPicker>

const SimpleCalendar = ({
  className,
  classNames,
  showOutsideDays = true,

  ...props
}: SimpleCalendarProps): JSX.Element => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium text-secondary mr-1',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute ',
        nav_button_next: 'absolute ',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-secondary rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost', className: 'text-secondary' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'text-accent-foreground',
        day_outside:
          'day-outside text-secondary opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-secondary opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',

        ...classNames
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeftIcon className={'h-4 w-4'} />,
        IconRight: ({ ..._props }) => <ChevronRightIcon className='h-4 w-4' />
      }}
      {...props}
    />
  )
}
SimpleCalendar.displayName = 'SimpleCalendar'

export { SimpleCalendar }
