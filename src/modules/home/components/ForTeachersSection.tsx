'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const ForTeachersSection = (): JSX.Element => {
  const t = useTranslations('home.forMentors')

  const benefits = [
    {
      icon: '💰',
      key: 'benefits.income'
    },
    {
      icon: '🎯',
      key: 'benefits.impact'
    },
    {
      icon: '🤝',
      key: 'benefits.network'
    },
    {
      icon: '📚',
      key: 'benefits.skills'
    }
  ]

  return (
    <motion.section
      className='bg-gradient-to-r from-purple-600 to-indigo-700 px-4 py-20 text-white'
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
          <h2 className='mb-6 text-3xl font-bold lg:text-4xl'>{t('title')}</h2>
          <p className='mb-12 text-xl text-purple-100'>{t('subtitle')}</p>
        </motion.div>

        <motion.div
          className='mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className='text-center'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-20'>
                <span className='text-2xl'>{benefit.icon}</span>
              </div>
              <h3 className='mb-2 font-semibold'>{t(benefit.key)}</h3>
              {/* <p className='text-sm text-purple-100'>{t('description')}</p> */}
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className='rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-600 transition-colors hover:bg-purple-50'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('joinButton')}
        </motion.button>
      </div>
    </motion.section>
  )
}

export default ForTeachersSection
