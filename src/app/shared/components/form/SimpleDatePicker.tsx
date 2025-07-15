'use client'
import { format, isBefore, Locale } from 'date-fns'
import { enUS, fr } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'
import { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import { cn, formatDatetoDigits } from '@/lib/utils'

import { Popover, PopoverContent, PopoverTrigger } from '../layout'
import { Button, SimpleCalendar } from '../utils'

export type CalendarProps = {
  form?: {
    setValue: UseFormSetValue<any>
    clearErrors: UseFormClearErrors<any>
    watch: any
  }
  setSelectedDate: (date: string) => void
  defaultDate?: string
  variant?: 'input'
  className?: string
  placeholder?: string
  disablePastDates?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const localeMap: Record<string, Locale> = {
  en: enUS,
  fr: fr
}

export const SimpleDatePicker: React.FC<CalendarProps> = ({
  setSelectedDate,
  variant,
  className,
  placeholder,
  defaultDate,
  disablePastDates = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...rest
}) => {
  const [date, setDate] = React.useState<Date>()
  const locale = useLocale()

  const dateLocale = localeMap[locale] || enUS
  const t = useTranslations('constants')

  React.useEffect(() => {
    if (defaultDate) {
      const dateParts = defaultDate.split('/')
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts
        const parsedDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        )
        if (!isNaN(parsedDate.getTime())) {
          setDate(parsedDate)
        }
      } else {
        const parsedDate = new Date(defaultDate)
        if (!isNaN(parsedDate.getTime())) {
          setDate(parsedDate)
        }
      }
    }
  }, [defaultDate])
  React.useEffect(() => {
    if (date) {
      setSelectedDate(formatDatetoDigits(date))
    } else {
      setSelectedDate('')
    }
  }, [date, setSelectedDate])
  const isDateDisabled = (date: Date): boolean => {
    if (disablePastDates) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return isBefore(date, today)
    }
    return false
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            variant == 'input' &&
              'border-gray-200 text-left font-normal hover:bg-gray-50',
            variant == 'input' && date && 'text-secondary hover:text-secondary',
            className
          )}
        >
          <CalendarIcon
            className={cn(
              'mr-2 h-4 w-4 text-black',
              variant == 'input' && 'stroke-primary text-secondary'
            )}
          />
          {date ? (
            format(date, 'PPP', { locale: dateLocale })
          ) : (
            <span
              className={cn(
                'text-secondary',
                variant == 'input' && 'text-text-secondary'
              )}
            >
              {placeholder ?? t('pickDate')}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <SimpleCalendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={dateLocale}
          disabled={isDateDisabled}
        />
      </PopoverContent>
    </Popover>
  )
}
