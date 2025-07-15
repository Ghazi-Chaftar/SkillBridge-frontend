import { z } from 'zod'

import { phoneValidation } from '@/src/validations'

export const AboutTestSchema = z.object({
  architectType: phoneValidation
})
