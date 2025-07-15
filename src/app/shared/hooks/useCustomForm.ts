import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'

const useCustomForm = <T extends ZodType<any, any>>(
  schema: T,
  defaultValues?: any,
  values?: any
): {
  form: any
  handleSubmit: typeof form.handleSubmit
  control: typeof form.control
  errors: typeof form.formState.errors
  setValue: typeof form.setValue
  watch: typeof form.watch
  getValues: typeof form.getValues
  reset: typeof form.reset
  clearErrors: typeof form.clearErrors
} => {
  type FormData = z.infer<typeof schema>
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: defaultValues,
    values: values
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
    watch,
    clearErrors
  } = form

  return {
    form,
    handleSubmit,
    control,
    errors,
    setValue,
    watch,
    getValues,
    reset,
    clearErrors
  }
}

export default useCustomForm
