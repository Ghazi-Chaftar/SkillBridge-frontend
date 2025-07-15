'use client'
import React from 'react'

import { cn } from '@/lib/utils'
import { TimeSlotType } from '@/src/types'

import useToggle from '../../hooks/useToggle'
import ToggleTime from './ToggleITime'

interface MultiToggleTimeListProps {
  toggleDataList: TimeSlotType[]
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
  selectedTimeSlots?: string[]
}

const MultiToggleTimeList: React.FC<MultiToggleTimeListProps> = props => {
  const {
    toggleDataList,
    className,
    form,
    name,
    lucide,
    variant = 'default',
    selectedTimeSlots = []
  } = props
  const { selectedValues, handleChangeMulti } = useToggle(true, name, form)

  // Pre-selecting the values if `selectedTimeSlots` is passed
  React.useEffect(() => {
    if (selectedTimeSlots.length) {
      selectedTimeSlots.forEach(slot => handleChangeMulti(slot))
    }
  }, [selectedTimeSlots, handleChangeMulti])

  return (
    <div
      className={cn(
        'mt-1 flex h-80 w-full flex-col justify-start gap-2 overflow-y-auto px-1'
      )}
    >
      {toggleDataList?.map((element, index) => (
        <ToggleTime
          key={index}
          variant={variant}
          content={element.time}
          label={element.label}
          className={className}
          active={selectedValues.includes(element.time)}
          onClick={() => handleChangeMulti(element.time)}
          lucide={lucide}
        />
      ))}
    </div>
  )
}

export default MultiToggleTimeList
