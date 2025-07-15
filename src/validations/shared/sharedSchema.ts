import { z } from 'zod'

import { emailValidation, passwordValidation } from './sharedValidations'

export const ConfirmPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: passwordValidation
  })
  .refine(
    values => {
      return values.password === values.confirmPassword
    },
    {
      message: 'confirm-password',
      path: ['confirmPassword']
    }
  )

export const emailSchema = z.object({
  email: emailValidation
})

export const LoginFormSchema = z.object({
  email: emailValidation,
  password: passwordValidation
})

export const SimpleLoginFormSchema = z.object({
  email: emailValidation,
  password: passwordValidation
})
