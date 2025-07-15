'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format, parseISO } from 'date-fns'
import * as React from 'react'
import { DateRange } from 'react-day-picker'
import { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import { cn, formatDatetoDigits } from '@/lib/utils'

import { Popover, PopoverContent, PopoverTrigger } from '../layout/Popover'
import { Button, SimpleCalendar } from '../utils'

// Define the combined type
export type CalendarProps = {
  form: {
    setValue: UseFormSetValue<any>
    clearErrors: UseFormClearErrors<any>
    watch: any
  }
  endDate: string
  startDate: string
  defaultStartDate?: string
  defaultEndDate?: string
} & React.HTMLAttributes<HTMLDivElement>

export const DatePickerWithRange: React.FC<CalendarProps> = ({
  className,
  form,
  endDate,
  startDate,
  defaultStartDate,
  defaultEndDate,
  ...rest
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (defaultStartDate && defaultEndDate) {
      return { from: parseISO(defaultStartDate), to: parseISO(defaultEndDate) }
    }
  })

  React.useEffect(() => {
    if (date?.from) {
      form.setValue(startDate, formatDatetoDigits(date.from))
    } else {
      form.clearErrors(startDate)
    }

    if (date?.to) {
      form.setValue(endDate, formatDatetoDigits(date.to))
    } else {
      form.clearErrors(endDate)
    }
  }, [form, date, endDate, startDate])

  return (
    <div className={cn('grid gap-2', className)} {...rest}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'h-12 max-w-[250px] justify-start text-left font-normal',
              !date && 'text-secondary'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4 text-secondary' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <SimpleCalendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
