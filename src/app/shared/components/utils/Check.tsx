import React from 'react'
import { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Checkbox } from '@/src/app/shared/components'

type CheckProps = {
  form: {
    setValue: UseFormSetValue<any>
    clearErrors: UseFormClearErrors<any>
    watch: any
  }
  name: string
  label: string | React.ReactNode
  className?: string
}

const Check: React.FC<CheckProps> = props => {
  const { form, label, className, name } = props
  const handleChange = (): void => {
    form.setValue(name, !form.watch(name))
  }

  return (
    <div className='flex flex-row gap-2'>
      <Checkbox
        className={cn('mt-1', className)}
        checked={form.watch(name)}
        onCheckedChange={handleChange}
      />
      <p className='text-secondary '>{label}</p>
    </div>
  )
}

export default Check
