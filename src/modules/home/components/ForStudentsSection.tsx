'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const ForStudentsSection = (): JSX.Element => {
  const t = useTranslations('home.forStudents')

  const mentorTypes = [
    { typeKey: 'mentorTypes.math', statusKey: 'mentorTypes.status' },
    { typeKey: 'mentorTypes.tech', statusKey: 'mentorTypes.status' },
    { typeKey: 'mentorTypes.business', statusKey: 'mentorTypes.status' }
  ]

  const benefits = [
    'benefits.personalized',
    'benefits.expert',
    'benefits.flexible',
    'benefits.affordable'
  ]

  return (
    <motion.section
      className='px-4 py-20'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className='mx-auto max-w-6xl'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <motion.div
            className='relative'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className='from-green-100 rounded-2xl bg-gradient-to-br to-blue-100 p-8'>
              <motion.h3
                className='mb-6 text-2xl font-bold text-gray-800'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t('cardTitle')}
              </motion.h3>
              <div className='space-y-4'>
                {mentorTypes.map((mentor, index) => (
                  <motion.div
                    key={index}
                    className='flex items-center justify-between rounded-lg bg-white p-4 shadow-sm'
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className='text-gray-700'>{t(mentor.typeKey)}</span>
                    <span className='bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm'>
                      {t(mentor.statusKey)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className='mb-6 text-3xl font-bold text-gray-800 lg:text-4xl'>
              {t('title')}
            </h2>
            <p className='mb-8 text-lg text-gray-600'>{t('subtitle')}</p>
            <div className='mb-8 space-y-4'>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className='flex items-start space-x-3'
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className='mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100'>
                    <span className='text-sm text-blue-600'>✓</span>
                  </div>
                  <p className='text-gray-700'>{t(benefit)}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              className='rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-purple-700'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('startButton')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default ForStudentsSection
