import { format } from 'date-fns'
import { Calendar, CircleX } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import { Button } from './Button'
import { SimpleCalendar } from './SimpleCalender'

interface DateFilterProps {
  onFilter: (startDate: Date | null, endDate: Date | null) => void
  className?: string
  placeholder?: string
}

type SelectedRange =
  | 'thisWeek'
  | 'lastMonth'
  | 'yesterday'
  | 'today'
  | 'tomorrow'
  | 'nextMonth'
  | 'custom'

const DateFilter: React.FC<DateFilterProps> = ({
  onFilter,
  className = '',
  placeholder = 'Select a date'
}) => {
  const t = useTranslations('constants')
  const [selectedRange, setSelectedRange] = useState<SelectedRange>('today')
  const [startDate, setStartDate] = useState<Date | null>(null) // Set to null
  const [endDate, setEndDate] = useState<Date | null>(null) // Set to null
  const [selectedRangeLabel, setSelectedRangeLabel] =
    useState<string>(placeholder) // Placeholder text
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  // Create a ref to the select container
  const selectRef = useRef<HTMLDivElement>(null)

  // Handle the selection of a date range
  const handleDateSelection = (range: SelectedRange): void => {
    setSelectedRange(range as SelectedRange)

    let start: Date | null = null
    let end: Date | null = null
    let label = ''

    const today = new Date()
    today.setHours(0, 0, 0, 0) // Normalize to midnight

    switch (range) {
      case 'today':
        start = today
        end = today
        label = range
        break
      case 'yesterday':
        start = new Date(today)
        start.setDate(start.getDate() - 1)
        end = start
        label = range
        break
      case 'tomorrow':
        start = new Date(today)
        start.setDate(start.getDate() + 1)
        end = start
        label = range
        break
      case 'thisWeek': {
        const day = today.getDay() // 0 (Sun) to 6 (Sat)
        start = new Date(today)
        start.setDate(today.getDate() - day) // Sunday
        end = new Date(start)
        end.setDate(start.getDate() + 6) // Saturday
        label = range
        break
      }
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        end = new Date(today.getFullYear(), today.getMonth(), 0) // Last day of previous month
        label = range
        break
      case 'nextMonth':
        start = new Date(today.getFullYear(), today.getMonth() + 1, 1)
        end = new Date(today.getFullYear(), today.getMonth() + 2, 0)
        label = range
        break
      case 'custom':
        if (startDate) {
          label = `Custom: ${format(startDate, 'MMM d, yyyy')}`
        } else {
          label = 'Custom Date'
        }
        start = startDate
        end = endDate
        break
      default:
        break
    }

    setSelectedRangeLabel(label.includes('Custom') ? label : t(label))

    if (range !== 'custom') {
      setStartDate(start)
      setEndDate(end)
      onFilter(start, end)
    }
  }

  // Handle custom date selection logic
  const handleCustomRangeSelect = (date: Date | undefined): void => {
    if (date) {
      // Set both 'from' and 'to' to the selected date
      setStartDate(date)
      setEndDate(date)
      setSelectedRangeLabel(`Custom: ${format(date, 'MMM d, yyyy')}`)
      onFilter(date, date)
      setSelectedRange('custom')
    } else {
      // Reset both if no date is selected
      setStartDate(null)
      setEndDate(null)
      setSelectedRangeLabel('Custom Date')
      onFilter(null, null)
    }
  }

  // Toggle the Select dropdown open/close
  const handleSelectToggle = (): void => {
    setIsSelectOpen(prev => !prev)
  }

  // Initialize with null date
  React.useEffect(() => {
    setStartDate(null)
    setEndDate(null)
    setSelectedRangeLabel(placeholder) // Placeholder text
    onFilter(null, null)
  }, [])

  // Add click outside listener to close the select
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        isSelectOpen
      ) {
        setIsSelectOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSelectOpen])

  // Custom expandable content for the dropdown
  const CustomExpandableContent = (): React.JSX.Element => {
    const t = useTranslations('constants')
    const dateRanges = [
      { value: 'thisWeek', label: t('thisWeek') },
      { value: 'lastMonth', label: t('lastMonth') },
      { value: 'yesterday', label: t('yesterday') },
      { value: 'today', label: t('today') },
      { value: 'tomorrow', label: t('tomorrow') },
      { value: 'nextMonth', label: t('nextMonth') }
    ]

    // Reset function to clear the selected date range
    const handleReset = (): void => {
      setStartDate(null)
      setEndDate(null)
      setSelectedRangeLabel(placeholder) // Reset to placeholder
      setSelectedRange('today') // Optional: Reset to a default range (e.g., "today")
      onFilter(null, null) // Reset filter callback
    }

    return (
      <div className='mt-1 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg'>
        <div className='flex flex-row'>
          {/* Calendar always visible */}
          <div className='border-r border-gray-200'>
            <SimpleCalendar
              mode='single'
              selected={startDate || undefined}
              onSelect={handleCustomRangeSelect}
              className='p-2'
            />
          </div>

          {/* Predefined options on the right */}
          <div className='flex min-w-[150px] flex-col p-2'>
            <div className='mb-2 flex items-center justify-between'>
              <h3 className=' px-2 text-sm font-semibold text-gray-700'>
                {t('quickSelect')}
              </h3>
              <CircleX
                className='h-4 w-4 cursor-pointer text-primary'
                onClick={handleReset}
              />
            </div>
            {/* Map through dateRanges array and display buttons dynamically */}
            <div className='max-w-[200px]'>
              {dateRanges.map(range => (
                <Button
                  key={range.label}
                  variant={'ghost'}
                  onClick={() =>
                    handleDateSelection(range.value as SelectedRange)
                  }
                  className={`w-full rounded-md px-3 py-2 text-left text-sm ${selectedRange === range.value ? 'bg-primary text-white hover:bg-primary hover:text-white' : 'hover:font-semibold hover:text-primary'}`}
                >
                  {range.label}
                </Button>
              ))}
            </div>

            {/* Cross icon to reset */}
            <div className='mt-4 flex justify-end'></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} flex flex-col`}>
      <div className='flex items-center gap-3'>
        <div className='relative flex-1' ref={selectRef}>
          <button
            id='date-filter'
            className='flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
            onClick={handleSelectToggle}
          >
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-primary' />
              <span className='text-sm text-text-secondary'>
                {selectedRangeLabel}
              </span>
            </div>
            <svg
              className={`h-5 w-5 text-gray-500 transition-transform ${isSelectOpen ? 'rotate-180 transform' : ''}`}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>

          {isSelectOpen && (
            <div className='absolute right-0 z-10 mt-1 w-auto'>
              <CustomExpandableContent />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DateFilter
