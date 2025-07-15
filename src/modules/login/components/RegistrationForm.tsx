'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SubmitHandler } from 'react-hook-form'

import { Button, Form, FormElement, Input } from '@/src/app/shared/components'
import useCustomForm from '@/src/app/shared/hooks/useCustomForm'

import { RegisterFormData, registerSchema } from '../schemas/RegisterSchema'

// Register form schema

interface RegistrationFormProps {
  onSubmit?: (data: RegisterFormData) => void
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit: onSubmitProp
}) => {
  const t = useTranslations('auth')

  const { form, handleSubmit, control, reset } = useCustomForm(
    registerSchema,
    {},
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  )

  const onSubmit: SubmitHandler<RegisterFormData> = data => {
    if (onSubmitProp) {
      onSubmitProp(data)
    } else {
      // Default registration logic here
      // Handle registration submission
    }
    reset()
  }

  return (
    <Form {...form} className='w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid gap-4 md:grid-cols-2'>
          <FormElement
            control={control}
            name='firstName'
            label={t('form.firstName')}
          >
            <Input
              placeholder={t('form.firstNamePlaceholder')}
              type='text'
              className='h-12'
            />
          </FormElement>

          <FormElement
            control={control}
            name='lastName'
            label={t('form.lastName')}
          >
            <Input
              placeholder={t('form.lastNamePlaceholder')}
              type='text'
              className='h-12'
            />
          </FormElement>
        </div>

        <FormElement control={control} name='email' label={t('form.email')}>
          <Input
            placeholder={t('form.emailPlaceholder')}
            type='email'
            className='h-12'
          />
        </FormElement>

        <FormElement
          control={control}
          name='password'
          label={t('form.password')}
        >
          <Input
            placeholder={t('form.passwordPlaceholder')}
            type='password'
            className='h-12'
          />
        </FormElement>

        <FormElement
          control={control}
          name='confirmPassword'
          label={t('form.confirmPassword')}
        >
          <Input
            placeholder={t('form.confirmPasswordPlaceholder')}
            type='password'
            className='h-12'
          />
        </FormElement>

        <div className='flex items-start'>
          <input
            type='checkbox'
            className='mr-3 mt-1 rounded border-gray-300'
            required
          />
          <span className='text-sm text-gray-600'>
            {t('form.agreeTerms')}{' '}
            <a href='#' className='text-purple-600 hover:text-purple-700'>
              {t('form.termsLink')}
            </a>{' '}
            {t('form.and')}{' '}
            <a href='#' className='text-purple-600 hover:text-purple-700'>
              {t('form.privacyLink')}
            </a>
          </span>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type='submit'
            className='h-12 w-full bg-purple-600 text-white hover:bg-purple-700'
          >
            {t('form.registerButton')}
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}

export default RegistrationForm
