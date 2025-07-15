import { useEffect, useState } from 'react'

interface Form {
  setValue: (name: string, value: string | string[]) => void
  watch: (name: string) => string | string[]
  formState: any
  control: any
  clearErrors: (name: string | undefined) => void
  getValues: any
}
interface useToggleReturn {
  selectedValue: string
  selectedValues: string[]
  handleChange: (content: string) => void
  handleChangeMulti: (content: string) => void
}
const useToggle = (
  multi: boolean,
  name: string | undefined,
  form: Form
): useToggleReturn => {
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleChange = (content: string): void => {
    setSelectedValue(content)
    form.clearErrors(name)
  }

  const handleChangeMulti = (content: string): void => {
    if (selectedValues.includes(content)) {
      setSelectedValues(selectedValues.filter(item => item !== content))
    } else {
      setSelectedValues([...selectedValues, content])
    }
    form.clearErrors(name)
  }

  const setFormValue = (
    name: string | undefined,
    form: Form,
    value: string | string[]
  ): void => {
    if (name && form) {
      form.setValue(name, value)
    }
  }

  useEffect(() => {
    if (name && form && !multi) {
      setFormValue(name, form, selectedValue)
      setSelectedValue(form.watch(name) as string)
    }
  }, [name, form, multi, selectedValue])

  useEffect(() => {
    if (name && form && multi) {
      setFormValue(name, form, selectedValues)
    }
  }, [name, form, multi, selectedValues])

  useEffect(() => {
    if (name && form && form.formState.defaultValues) {
      if (multi) {
        setSelectedValues(form.formState.defaultValues[name] || [])
      } else {
        setSelectedValue(form.formState.defaultValues[name] || '')
      }
    }
  }, [form.watch, name, form, multi])

  useEffect(() => {
    const defaultSelectedValue = form.getValues(name)
    if (!multi && defaultSelectedValue != null) {
      setSelectedValue(defaultSelectedValue)
    }
  }, [form.formState])
  return {
    selectedValue,
    selectedValues,
    handleChange,
    handleChangeMulti
  }
}

export default useToggle
