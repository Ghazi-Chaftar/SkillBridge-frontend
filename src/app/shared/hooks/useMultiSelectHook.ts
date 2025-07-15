'use client'
import { useEffect, useState } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface UseMultiSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>
  fieldName: keyof T
}

const useMultiSelectHook = <T extends FieldValues>({
  form,
  fieldName
}: UseMultiSelectProps<T>): {
  selectedItems: string[]
  handleSelectChange: (id: string) => void
} => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    () => (form.getValues(fieldName as Path<T>) as string[]) || []
  )

  const handleSelectChange = (id: string): void => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    form.setValue(fieldName as Path<T>, selectedItems as T[typeof fieldName])
  }, [selectedItems, form, fieldName])

  return {
    selectedItems,
    handleSelectChange
  }
}

export default useMultiSelectHook
