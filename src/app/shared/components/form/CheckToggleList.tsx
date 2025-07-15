'use client'
import React from 'react'

import { cn } from '@/lib/utils'

import useToggle from '../../hooks/useToggle'
import CheckToggle from './CheckToggle'

interface CheckToggleListProps {
  checkToggleListData: any
  multi?: boolean
  className?: string
  form: {
    setValue: any
    watch: any
    clearErrors: any
    formState: any
    control: any
    getValues: any
  }
  name?: string
  withoutCheckBox?: boolean
  variant?: string
  imageClassName?: string
  containerClassName?: string
}

const CheckToggleList: React.FC<CheckToggleListProps> = props => {
  const {
    checkToggleListData,
    multi = false,
    className,
    form,
    name,
    withoutCheckBox = false,
    variant = 'default',
    imageClassName,
    containerClassName
  } = props

  const { selectedValue, selectedValues, handleChange, handleChangeMulti } =
    useToggle(multi, name, form)

  return (
    <div
      className={cn(
        'flex flex-wrap justify-start  gap-4 md:flex-row lg:w-[90%]',
        containerClassName
      )}
    >
      {checkToggleListData?.map((element: any, index: number) => (
        <CheckToggle
          key={index}
          variant={variant}
          image={element.icon}
          content={element.id?.toString()}
          label={element.label || element.title}
          tip={element.tip || element.description}
          withoutCheckBox={withoutCheckBox}
          className={className}
          imageClassName={imageClassName}
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
        />
      ))}
    </div>
  )
}

export default CheckToggleList
