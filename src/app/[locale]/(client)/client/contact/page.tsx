'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SubmitHandler } from 'react-hook-form'

import ContactForm from '@/src/modules/contact/components/ContactForm'
import { ContactFormData } from '@/src/modules/contact/schemas/ContactFormSchema'

const ContactPage = (): JSX.Element => {
  const t = useTranslations('contact')

  const contactInfo = [
    {
      icon: '📧',
      key: 'info.email'
    },
    {
      icon: '📞',
      key: 'info.phone'
    },
    {
      icon: '📍',
      key: 'info.address'
    },
    {
      icon: '🕒',
      key: 'info.hours'
    }
  ]

  const handleFormSubmit: SubmitHandler<ContactFormData> = data => {
    // eslint-disable-next-line no-console
    console.log('Form submitted:', data)
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <motion.section
        className='relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 px-4 py-20 text-white'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className='mx-auto max-w-6xl text-center'>
          <motion.h1
            className='mb-6 text-4xl font-bold lg:text-6xl'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            className='mx-auto max-w-3xl text-xl leading-relaxed text-purple-100'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Info Section */}
      <motion.section
        className='bg-gray-50 px-4 py-16'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className='mx-auto max-w-6xl'>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className='rounded-2xl bg-white p-6 text-center shadow-lg'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100'>
                  <span className='text-2xl'>{info.icon}</span>
                </div>
                <h3 className='mb-2 text-lg font-semibold text-gray-800'>
                  {t(`${info.key}.title`)}
                </h3>
                <p className='text-gray-600'>{t(`${info.key}.value`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className='px-4 py-20'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className='mx-auto max-w-6xl'>
          <div className='grid items-start gap-12 lg:grid-cols-2'>
            {/* Form */}
            <ContactForm onSubmit={handleFormSubmit} />

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className='mb-6 text-2xl font-bold text-gray-800'>
                {t('faq.title')}
              </h3>
              <div className='space-y-4'>
                {['general', 'technical', 'account'].map((category, index) => (
                  <motion.div
                    key={category}
                    className='rounded-lg bg-gray-50 p-4'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className='mb-2 font-semibold text-gray-800'>
                      {t(`faq.categories.${category}.question`)}
                    </h4>
                    <p className='text-gray-600'>
                      {t(`faq.categories.${category}.answer`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default ContactPage
