'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { Popover, PopoverContent, PopoverTrigger } from '../layout/Popover'
import { Button } from '../utils'
import { Calendar } from '../utils/Calendar'

export type PopOverCalendarProps = {
  form: {
    setValue: UseFormSetValue<any>
    clearErrors: UseFormClearErrors<any>
    watch: any
  }
  name: string
  defaultDate?: string
  disabled?: boolean
  startSoon?: string
} & React.HTMLAttributes<HTMLDivElement>

export function PopoverDatePicker({
  className,
  form,
  name,
  defaultDate,
  disabled,
  startSoon,
  ...rest
}: PopOverCalendarProps): JSX.Element {
  const formValue = form.watch(name)
  const [date, setDate] = useState<Date | undefined>(
    formValue
      ? new Date(formValue)
      : defaultDate
        ? new Date(defaultDate)
        : undefined
  )
  const [open, setOpen] = useState(false)

  const disabledBeforeToday = (date: Date): boolean => {
    const today = new Date()
    today.setDate(today.getDate() - 1)
    return date < today
  }

  useEffect(() => {
    if (date) {
      form.setValue(name, date)
      form.clearErrors(name)
      if (startSoon) {
        form.setValue(startSoon, false)
      }
    }
  }, [date, form, name])

  const handleSelect = (selectedDate: Date | undefined): void => {
    setDate(selectedDate)
    setOpen(false)
  }

  return (
    <div className={cn('grid gap-2', className)} {...rest}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant='outline'
            onClick={() => setOpen(prev => !prev)}
            className={cn(
              'h-12 max-w-[250px] justify-start text-left font-normal',
              !date && 'text-secondary'
            )}
            disabled={disabled}
          >
            <CalendarIcon className='mr-2 h-4 w-4 text-secondary' />
            {date ? format(date, 'LLL dd, y') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleSelect}
            form={form}
            name={name}
            className='rounded-md'
            disabled={disabledBeforeToday}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
