'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const HowItWorksSection = (): JSX.Element => {
  const t = useTranslations('home.howItWorks')

  const steps = [
    {
      icon: '�',
      titleKey: 'steps.browse.title',
      descriptionKey: 'steps.browse.description'
    },
    {
      icon: '🤝',
      titleKey: 'steps.connect.title',
      descriptionKey: 'steps.connect.description'
    },
    {
      icon: '�',
      titleKey: 'steps.learn.title',
      descriptionKey: 'steps.learn.description'
    }
  ]

  return (
    <motion.section
      className='bg-gray-50 px-4 py-20'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className='mx-auto max-w-6xl text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className='mb-4 text-3xl font-bold text-gray-800 lg:text-4xl'>
            {t('title')}
          </h2>
          <p className='mb-16 text-xl text-gray-600'>{t('subtitle')}</p>
        </motion.div>

        <motion.div
          className='grid gap-8 md:grid-cols-3'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className='rounded-2xl bg-white p-8 shadow-lg'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100'>
                <span className='text-3xl'>{step.icon}</span>
              </div>
              <h3 className='mb-4 text-xl font-semibold text-gray-800'>
                {t(step.titleKey)}
              </h3>
              <p className='text-gray-600'>{t(step.descriptionKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HowItWorksSection
