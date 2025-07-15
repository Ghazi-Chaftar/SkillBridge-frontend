'use client'
import React from 'react'

import { cn } from '@/lib/utils'

import useToggle from '../../hooks/useToggle'
import ToggleItem from './ToggleItem'

interface ToggleItemListProps {
  toggleDataList: any[]
  multi?: boolean
  className?: string
  listClassName?: string
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
  disabled?: boolean
  withId?: boolean
  currencySymbol?: string
}

const ToggleItemList: React.FC<ToggleItemListProps> = props => {
  const {
    toggleDataList,
    multi = false,
    className,
    listClassName,
    form,
    name,
    lucide,
    variant = 'default',
    disabled = false,
    withId = false,
    currencySymbol
  } = props
  const { selectedValue, selectedValues, handleChange, handleChangeMulti } =
    useToggle(multi, name, form)

  return (
    <div
      className={cn(
        'flex flex-wrap justify-center  gap-4 md:flex-row lg:w-full',
        listClassName
      )}
    >
      {toggleDataList?.map((element, index) => (
        <ToggleItem
          key={index}
          variant={variant}
          image={element.image}
          content={element.content}
          label={
            currencySymbol
              ? `${element.label} ${currencySymbol}`
              : element.label
          }
          tip={element.tip}
          className={className}
          disabled={disabled}
          active={
            withId
              ? multi
                ? selectedValues.includes(element.id?.toString())
                : element.id?.toString() === selectedValue
              : multi
                ? selectedValues.includes(element.content)
                : element.content === selectedValue
          }
          onClick={() => {
            if (!disabled) {
              if (multi) {
                withId
                  ? handleChangeMulti(element.id?.toString())
                  : handleChangeMulti(element.content)
              } else {
                withId
                  ? handleChange(element.id?.toString())
                  : handleChange(element.content)
              }
            }
          }}
          lucide={lucide}
        />
      ))}
    </div>
  )
}

export default ToggleItemList
