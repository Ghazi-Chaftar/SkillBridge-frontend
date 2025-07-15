import { z } from 'zod'

import {
  emailValidation,
  fieldValidation,
  passwordValidation,
  requiredValidation
} from '@/src/validations'

export const registerSchema = z
  .object({
    firstName: fieldValidation,
    lastName: fieldValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: requiredValidation
  })
  .refine(
    values => {
      return values.password === values.confirmPassword
    },
    {
      message: 'confirmPassword',
      path: ['confirmPassword']
    }
  )

export type RegisterFormData = z.infer<typeof registerSchema>
