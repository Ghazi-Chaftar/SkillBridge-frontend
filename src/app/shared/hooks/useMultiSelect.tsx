'use client'
import { useEffect, useState } from 'react'

interface UseMultiSelectProps {
  form: {
    setValue: any
    watch: any
    formState: any
  }
  fieldName: string
}

const useMultiSelect = ({
  form,
  fieldName
}: UseMultiSelectProps): {
  selectedItems: string[]
  handleSelectChange: (key: string) => void
} => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleSelectChange = (key: string): void => {
    setSelectedItems(prev =>
      prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
    )
  }

  useEffect(() => {
    if (selectedItems.length > 0) {
      form.setValue(fieldName, selectedItems)
    }
  }, [selectedItems, form, fieldName])

  useEffect(() => {
    if (fieldName && form && form.formState.defaultValues) {
      setSelectedItems(form.formState.defaultValues[fieldName] || [])
    }
  }, [form.watch, fieldName, form])

  return {
    selectedItems,
    handleSelectChange
  }
}

export default useMultiSelect
