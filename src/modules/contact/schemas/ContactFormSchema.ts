import z from 'zod'

import {
  DescriptionValidation,
  emailValidation,
  fieldValidation
} from '@/src/validations'

// Contact form schema
export const contactFormSchema = z.object({
  name: fieldValidation,
  email: emailValidation,
  subject: fieldValidation,
  message: DescriptionValidation
})

export type ContactFormData = z.infer<typeof contactFormSchema>
