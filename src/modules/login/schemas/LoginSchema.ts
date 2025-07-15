import { z } from 'zod'

import { emailValidation, passwordValidation } from '@/src/validations'

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation
})

export type LoginFormData = z.infer<typeof loginSchema>
