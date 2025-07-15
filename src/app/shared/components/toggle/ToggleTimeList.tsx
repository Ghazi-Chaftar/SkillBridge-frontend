'use client'
import React from 'react'

import { cn } from '@/lib/utils'
import { TimeSlotType } from '@/src/types'

import useToggle from '../../hooks/useToggle'
import ToggleTime from './ToggleITime'

interface ToggleTimeListProps {
  toggleDataList: TimeSlotType[]
  multi?: boolean
  className?: string
  form: {
    setValue: any
    watch: any
    formState: any
    control: any
    clearErrors: any
    getValues: any
  }
  name?: string
  lucide?: boolean
  variant?: string
  selectedTimeSlot?: string
  isTimeSlotDisabled?: (date: Date, timeSlot: TimeSlotType) => boolean
}

const ToggleTimeList: React.FC<ToggleTimeListProps> = props => {
  const {
    toggleDataList,
    multi = false,
    className,
    form,
    name,
    lucide,
    variant = 'default',
    isTimeSlotDisabled
  } = props
  const { selectedValue, selectedValues, handleChange, handleChangeMulti } =
    useToggle(multi, name, form)
  const selectedDate = form.watch('date')

  return (
    <div
      className={cn(
        'mt-1 flex h-80 w-full flex-col justify-start gap-2 overflow-y-auto px-1 py-1'
      )}
    >
      {toggleDataList?.map((element, index) => {
        const disabled =
          selectedDate && isTimeSlotDisabled
            ? isTimeSlotDisabled(selectedDate, element)
            : false

        return (
          <ToggleTime
            key={index}
            variant={variant}
            content={element.time}
            label={element.label}
            className={className}
            active={
              multi
                ? selectedValues.includes(element.time)
                : element.time === selectedValue
            }
            onClick={() => {
              if (!disabled) {
                multi
                  ? handleChangeMulti(element.time)
                  : handleChange(element.time)
              }
            }}
            disabled={disabled} // Disable the toggle if past
            lucide={lucide}
          />
        )
      })}
    </div>
  )
}

export default ToggleTimeList
