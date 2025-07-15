'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SubmitHandler } from 'react-hook-form'

import { Button, Form, FormElement, Input } from '@/src/app/shared/components'
import useCustomForm from '@/src/app/shared/hooks/useCustomForm'

import { LoginFormData, loginSchema } from '../schemas/LoginSchema'

// Login form schema

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit: onSubmitProp }) => {
  const t = useTranslations('auth')

  const { form, handleSubmit, control, reset } = useCustomForm(
    loginSchema,
    {},
    {
      email: '',
      password: ''
    }
  )

  const onSubmit: SubmitHandler<LoginFormData> = data => {
    if (onSubmitProp) {
      onSubmitProp(data)
    } else {
      // Default login logic here
      // Handle login submission
    }
    reset()
  }

  return (
    <Form {...form} className='w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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

        <div className='flex items-center justify-between'>
          <label className='flex items-center'>
            <input type='checkbox' className='mr-2 rounded border-gray-300' />
            <span className='text-sm text-gray-600'>
              {t('form.rememberMe')}
            </span>
          </label>
          <a href='#' className='text-sm text-purple-600 hover:text-purple-700'>
            {t('form.forgotPassword')}
          </a>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type='submit'
            className='h-12 w-full bg-purple-600 text-white hover:bg-purple-700'
          >
            {t('form.loginButton')}
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}

export default LoginForm
