import { useTranslations } from 'next-intl'
import React from 'react'
import { Control, useController } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/app/shared/components'
interface FormElementProps {
  name: string
  control: Control<any>
  label?: string | React.ReactNode
  children: React.ReactNode
  description?: string
  changePropName?: string
  labelClassName?: string
  className?: string
  errorClassName?: string
}

export const FormElement: React.FC<FormElementProps> = ({
  name,
  control,
  label,
  children,
  description,
  className,
  labelClassName,
  errorClassName,
  changePropName = 'onChange'
}) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })
  const t = useTranslations('validation')

  return (
    <FormItem className={cn('flex w-full flex-col items-start ', className)}>
      <FormLabel
        className={cn(
          'text-nowrap text-secondary ',
          error && 'text-destructive',
          labelClassName
        )}
      >
        {label}
      </FormLabel>
      <FormControl>
        {React.cloneElement(children as React.ReactElement, {
          ...field,
          [changePropName]: field.onChange,
          value: field.value,
          className: cn(
            (children as React.ReactElement).props.className,
            error && 'ring ring-2 ring-destructive'
          )
        })}
      </FormControl>
      {description && <p className='text-sm text-gray-500'>{description}</p>}
      {error && (
        <FormMessage className={cn(errorClassName)}>
          {t(error.message)}
        </FormMessage>
      )}
    </FormItem>
  )
}
