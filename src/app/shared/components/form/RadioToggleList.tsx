'use client'
import React from 'react'

import { cn } from '@/lib/utils'

import useToggle from '../../hooks/useToggle'
import RadioToggle from './RadioToggle'

type RadioToggleData = {
  id: number
  image?: string
  content: string
  label: string
  tip?: string
}
interface RadioToggleListProps {
  radioToggleListData: RadioToggleData[]
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
  translation?: string
}

const RadioToggleList: React.FC<RadioToggleListProps> = props => {
  const {
    radioToggleListData,
    multi = false,
    className,
    form,
    name,

    variant = 'default',
    translation
  } = props
  const { selectedValue, selectedValues, handleChange, handleChangeMulti } =
    useToggle(multi, name, form)

  return (
    <div className={cn('flex flex-wrap gap-4 md:flex-row lg:w-full xl:gap-6')}>
      {radioToggleListData?.map((element, index) => (
        <RadioToggle
          key={index}
          variant={variant}
          image={element.image}
          content={element.content}
          label={element.label}
          tip={element.tip}
          className={className}
          translation={translation}
          active={
            multi
              ? selectedValues.includes(element.content)
              : element.content === selectedValue
          }
          onClick={() => {
            if (multi) {
              handleChangeMulti(element.content)
            } else {
              handleChange(element.content)
            }
          }}
        />
      ))}
    </div>
  )
}

export default RadioToggleList
