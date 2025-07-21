import { z } from 'zod'

import { fieldValidation, phoneValidation } from '@/src/validations'

export const profileHeaderSchema = z.object({
  firstName: fieldValidation,
  lastName: fieldValidation,
  phoneNumber: phoneValidation,
  location: z.string().max(100, {
    message: 'complexFieldMaxLength'
  }),
  gender: z.string().optional()
})

export type ProfileHeaderFormData = z.infer<typeof profileHeaderSchema>
