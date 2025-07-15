import { isValidPhoneNumber } from 'react-phone-number-input'
import { z, ZodEffects, ZodString } from 'zod'
export const requiredValidation = z.preprocess(
  val => (val === null ? '' : val),
  z.string().nonempty({ message: 'Required' })
)

export const emailValidation = z.string().email({ message: 'emailError' })

export const passwordValidation = z
  .string()
  .min(8, { message: 'passwordLength' })
  .regex(/[a-z]/, { message: 'passwordLowercase' })
  .regex(/[A-Z]/, { message: 'passwordUppercase' })
  .regex(/[0-9]/, { message: 'passwordDigit' })
  .regex(/[^a-zA-Z0-9]/, { message: 'passwordSpecialChar' })

export const fieldValidation = z
  .string()
  .min(3, { message: 'fieldMinLength' })
  .max(30, { message: 'fieldMaxLength' })
  .regex(/^[a-zA-Z0-9_ àèéêëîïôùûüçÀÈÉÊËÎÏÔÙÛÜÇ]+$/, { message: 'fieldShape' })

export const TitleValidation = z
  .string()
  .nonempty({ message: 'Required' })
  .max(100, { message: 'TitleMaxLength' })

export const DescriptionValidation = z
  .string()
  .nonempty({ message: 'Required' })
  .max(400, { message: 'DescriptionMaxLength' })

export const longerFieldValidation = z
  .string()
  .min(3, { message: 'fieldMinLength' })
  .max(60, { message: 'longerFieldMaxLength' })
  .regex(/^[a-zA-Z0-9_ àèéêëîïôùûüçÀÈÉÊËÎÏÔÙÛÜÇ]+$/, { message: 'fieldShape' })

export const confirmPasswordValidation = (
  password: string
): ZodEffects<ZodString> =>
  z.string().refine(val => val === password, {
    message: 'confirmPassword'
  })

export const phoneValidation = z
  .string()
  .refine(isValidPhoneNumber, { message: 'phoneShape' })

export const arrayOfNonEmptyStrings = z
  .array(
    z.string().nonempty({
      message: 'Required'
    })
  )
  .refine(arr => arr.length > 0, {
    message: 'arrayNonEmptyString'
  })

export const facebookValidation = z
  .string()
  .max(100, { message: 'complexFieldMaxLength' })
  .refine(
    value =>
      value === '' ||
      /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9(.?)]*/.test(value),
    {
      message: 'invalidFacebookUrl'
    }
  )

export const websiteValidation = z
  .string()
  .max(100, { message: 'complexFieldMaxLength' })
  .refine(
    value =>
      value === '' ||
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?$/.test(value),
    {
      message: 'invalidWebsiteUrl'
    }
  )

export const linkedinValidation = z
  .string()
  .max(100, { message: 'complexFieldMaxLength' })
  .refine(
    value =>
      value === '' ||
      /^https:\/\/(www\.)?linkedin\.com\/[a-zA-Z0-9(.?)]*/.test(value),
    {
      message: 'invalidLinkedinUrl'
    }
  )

export const instagramValidation = z
  .string()
  .max(100, { message: 'complexFieldMaxLength' })
  // eslint-disable-next-line no-useless-escape
  .refine(
    value =>
      value === '' ||
      /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9(.?)]*/.test(value),
    {
      message: 'invalidInstagramUrl'
    }
  )

export const arrayOfNonEmptyImage = z
  .array(
    z.object({
      name: z.string(),
      url: z.string()
    })
  )
  .nonempty({ message: 'arrayNonEmptyImage' })

export const emailOrPhoneValidation = z
  .string()
  .regex(
    /^(?:(?:\+?\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})|\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+)$/,
    {
      message: 'emailOrPhoneFormat'
    }
  )

export const priceValidation = z
  .string()
  .min(1, { message: 'Required' })
  .max(8, { message: 'priceLength' })
  .regex(/^\d+(\.\d+)?$/, { message: 'validPrice' })
  .refine(val => parseFloat(val) >= 0, {
    message: 'positivePrice'
  })
export const IntegerValidation = z
  .string()
  .min(1, { message: 'Required' })
  .max(30, { message: 'fieldMaxLength' })
  .regex(/^[0-9]+$/, { message: 'numericOnly' })

export const FloatValidation = z
  .string()
  .min(1, { message: 'Required' })
  .max(5, { message: 'priceLength' })
  .regex(/^[0-9.,]+$/, { message: 'numericOnly' })
export const nonEmptyImage = z.object(
  {
    name: z.string(),
    url: z.string()
  },
  { message: 'exceedSize' }
)

export const firstNameValidation = z
  .string()
  .min(1, { message: 'Required' })
  .max(20, { message: 'firstNameLength' })
  .regex(/^[a-zA-Z\s]+$/, { message: 'firstNameAlphabetic' })

export const arrayOfImage = z.array(
  z.object({
    name: z.string(),
    url: z.string()
  })
)

export const IntpriceValidation = z
  .number()
  .min(0, { message: 'Required' })
  .max(999999, { message: 'priceLength' })
  .refine(val => val >= 0, {
    message: 'positivePrice'
  })

export const createDescriptionValidation = (
  min: number,
  max: number
): z.ZodString =>
  z.string().min(min, `descriptionMin`).max(max, `descriptionMax`)

export const IBANValidation = z
  .string()
  .nonempty({
    message: 'Required'
  })
  .regex(/^[A-Z]{2}[A-Z0-9]{11,30}$/, {
    message: 'invalidIBAN'
  })

export const BICValidation = z
  .string()
  .nonempty({
    message: 'Required'
  })
  .regex(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, {
    message: 'invalidBIC'
  })

export const imageValidation = z
  .instanceof(File, { message: 'invalidFile' })
  .refine(
    file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    { message: 'invalidFileType' }
  )

export const arrayOfStrings = z.array(
  z.string().nonempty({
    message: 'Required'
  })
)
export const arrayOfNonEmptyStringsOptional = z
  .array(z.string().nonempty({ message: 'Required' }))
  .optional()

export const OptionalpriceValidation = z
  .string()
  .max(6, { message: 'priceLength' })

  .refine(val => val === '' || parseFloat(val) >= 0, {
    message: 'positivePrice'
  })
  .optional()

export const ComplexFieldValidation = z
  .string()
  .trim()
  .min(10, { message: 'complexFieldMinLength' })
  .max(100, { message: 'complexFieldMaxLength' })
  .regex(/^(?!.*\s{2,})[a-zA-Z0-9_ àèéêëîïôùûüçÀÈÉÊËÎÏÔÙÛÜÇ-]+$/, {
    message: 'complexFieldShape'
  })
export const SpecialCharFieldValidation = z
  .string()
  .trim()
  .min(3, { message: 'specialCharFieldMinLength' })
  .max(100, { message: 'specialCharFieldMaxLength' })
  .regex(
    /^(?!.*\s{2,})[a-zA-Z0-9_ àèéêëîïôùûüçÀÈÉÊËÎÏÔÙÛÜÇ@#$%^&*()\-+=!?.,:;'"/\\[\]{}|<>`~]*$/,
    {
      message: 'specialCharFieldShape'
    }
  )

export const BioValidation = z
  .string()
  .min(10, { message: 'bioMinLength' })
  .max(700, { message: 'bioMaxLength' })

export const OfferDescriptionValidation = z
  .string()
  .min(50, { message: 'offerDescriptionMinLength' })
  .max(1000, { message: 'offerDescriptionMaxLength' })

export const maxElementsInTable = (
  max: number
): z.ZodEffects<z.ZodArray<z.ZodString, 'many'>, string[], string[]> => {
  return z
    .array(
      z.string().nonempty({
        message: 'Required'
      })
    )
    .refine(arr => arr.length <= max, {
      message: 'maxElementsExceeded'
    })
}

export const titleFieldValidation = z
  .string()
  .min(10, { message: 'titledMinLength' })
  .max(40, { message: 'titleMaxLength' })
  .regex(/^[a-zA-Z0-9_ àèéêëîïôùûüçÀÈÉÊËÎÏÔÙÛÜÇ]+$/, { message: 'fieldShape' })
