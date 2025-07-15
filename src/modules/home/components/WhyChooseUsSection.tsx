'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const WhyChooseUsSection = (): JSX.Element => {
  const t = useTranslations('home.whyChooseUs')

  const features = [
    {
      key: 'features.quality',
      icon: '✓'
    },
    {
      key: 'features.flexible',
      icon: '✓'
    },
    {
      key: 'features.affordable',
      icon: '✓'
    },
    {
      key: 'features.support',
      icon: '✓'
    }
  ]

  const searchResults = [
    {
      subjectKey: 'searchResults.math',
      countKey: 'searchResults.mathCount'
    },
    {
      subjectKey: 'searchResults.tech',
      countKey: 'searchResults.techCount'
    },
    {
      subjectKey: 'searchResults.business',
      countKey: 'searchResults.businessCount'
    }
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
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='mb-6 text-3xl font-bold text-gray-800 lg:text-4xl'>
              {t('title')}
            </h2>
            <p className='mb-6 text-lg text-gray-600'>{t('subtitle')}</p>
            <div className='space-y-4'>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className='flex items-start space-x-3'
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className='bg-green-100 mt-1 flex h-6 w-6 items-center justify-center rounded-full'>
                    <span className='text-green-600 text-sm'>
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-800'>
                      {t(`${feature.key}.title`)}
                    </h3>
                    <p className='text-gray-700'>
                      {t(`${feature.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className='relative'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className='rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 p-8'>
              <div className='space-y-4'>
                {searchResults.map((result, index) => (
                  <motion.div
                    key={index}
                    className='rounded-lg bg-white p-4 shadow-sm'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>
                        {t(result.subjectKey)}
                      </span>
                      <span className='font-semibold text-purple-600'>
                        {t(result.countKey)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default WhyChooseUsSection
