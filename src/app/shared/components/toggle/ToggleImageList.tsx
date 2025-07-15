'use client'
import React from 'react'

import { cn } from '@/lib/utils'

import { Variant } from '../../constants/enums'
import useToggle from '../../hooks/useToggle'
import ToggleImage from './ToggleImage'

interface ToggleImageListProps {
  toggleDataList: any
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
  variant?: Variant
}

const ToggleImageList: React.FC<ToggleImageListProps> = props => {
  const {
    toggleDataList,
    multi = false,
    className,
    form,
    name,
    lucide,
    variant = Variant.Default
  } = props
  const { selectedValue, selectedValues, handleChange, handleChangeMulti } =
    useToggle(multi, name, form)

  return (
    <div className={cn('flex w-full  flex-wrap gap-4  md:flex-row')}>
      {toggleDataList?.map((element: any, index: number) => (
        <ToggleImage
          key={index}
          variant={variant}
          image={element.icon}
          content={element.label}
          label={element.label}
          tip={element.tip}
          className={className}
          active={
            multi
              ? selectedValues.includes(element.id?.toString())
              : element.id?.toString() === selectedValue
          }
          onClick={() => {
            if (multi) {
              handleChangeMulti(element.id?.toString())
            } else {
              handleChange(element.id?.toString())
            }
          }}
          lucide={lucide}
        />
      ))}
    </div>
  )
}

export default ToggleImageList
