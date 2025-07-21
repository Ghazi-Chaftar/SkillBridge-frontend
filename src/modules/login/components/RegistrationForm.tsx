'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SubmitHandler } from 'react-hook-form'

import {
  Button,
  Form,
  FormElement,
  Input,
  PhoneInput
} from '@/src/app/shared/components'
import useCustomForm from '@/src/app/shared/hooks/useCustomForm'

import { useLoginUser } from '../hooks/useLoginUser'
import { useRegisterUser } from '../hooks/useRegisterUser'
import { RegisterFormData, registerSchema } from '../schemas/RegisterSchema'

// Register form schema

const RegistrationForm: React.FC = () => {
  const t = useTranslations('auth')

  const { form, handleSubmit, control, reset } = useCustomForm(
    registerSchema,
    {},
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: ''
    }
  )
  const registerUserMutation = useRegisterUser('auth')
  const loginUserMutation = useLoginUser('auth')
  const onSubmit: SubmitHandler<RegisterFormData> = data => {
    registerUserMutation.mutate(data, {
      onSuccess: () => {
        loginUserMutation.mutate({
          username: data.email,
          password: data.password
        })
        reset()
      }
    })
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
          name='phoneNumber'
          label={t('form.phoneNumber')}
        >
          <PhoneInput
            defaultCountry='TN'
            className='w-full'
            placeholder={t('form.phoneNumberPlaceholder')}
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
            disabled={registerUserMutation.isPending}
            className='h-12 w-full bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50'
          >
            {registerUserMutation.isPending
              ? 'Creating Account...'
              : t('form.registerButton')}
          </Button>
        </motion.div>

        {/* Error Display */}
        {registerUserMutation.isError && (
          <div className='rounded-md bg-red-50 p-4'>
            <div className='text-sm text-red-700'>
              {registerUserMutation.error?.message ||
                'Registration failed. Please try again.'}
            </div>
          </div>
        )}
      </form>
    </Form>
  )
}

export default RegistrationForm
