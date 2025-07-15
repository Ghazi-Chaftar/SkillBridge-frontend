'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SubmitHandler } from 'react-hook-form'

import {
  Button,
  Form,
  FormElement,
  Input,
  Textarea
} from '@/src/app/shared/components'
import useCustomForm from '@/src/app/shared/hooks/useCustomForm'

import {
  ContactFormData,
  contactFormSchema
} from '../schemas/ContactFormSchema'

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit: onSubmitProp
}) => {
  const t = useTranslations('contact')

  const { form, handleSubmit, control, reset } = useCustomForm(
    contactFormSchema,
    {},
    {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  )

  const onSubmit: SubmitHandler<ContactFormData> = data => {
    if (onSubmitProp) {
      onSubmitProp(data)
    } else {
      // Default form submission logic here
      // Handle form submission here
    }
    reset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className='mb-6 text-3xl font-bold text-gray-800 lg:text-4xl'>
        {t('form.title')}
      </h2>
      <p className='mb-8 text-gray-600'>{t('form.subtitle')}</p>

      <Form {...form} className='w-full'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <FormElement
              control={control}
              name='name'
              label={t('form.fields.name')}
            >
              <Input placeholder={t('form.fields.name')} type='text' />
            </FormElement>
            <FormElement
              control={control}
              name='email'
              label={t('form.fields.email')}
            >
              <Input placeholder={t('form.fields.email')} type='email' />
            </FormElement>
          </div>
          <FormElement
            control={control}
            name='subject'
            label={t('form.fields.subject')}
          >
            <Input placeholder={t('form.fields.subject')} type='text' />
          </FormElement>
          <FormElement
            control={control}
            name='message'
            label={t('form.fields.message')}
          >
            <Textarea
              rows={6}
              placeholder={t('form.fields.message')}
              {...form.register('message')}
            />
          </FormElement>
          <motion.div>
            <Button
              type='submit'
              className='rounded-full bg-purple-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-purple-700'
            >
              {t('form.submit')}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}

export default ContactForm
