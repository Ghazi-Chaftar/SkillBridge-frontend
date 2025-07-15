'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const AuthFeatures = (): JSX.Element => {
  const t = useTranslations('auth')

  const features = [
    {
      icon: '🎯',
      titleKey: 'features.personalized.title',
      descKey: 'features.personalized.description'
    },
    {
      icon: '👥',
      titleKey: 'features.expert.title',
      descKey: 'features.expert.description'
    }
  ]

  return (
    <motion.div
      className='hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-12 text-white lg:flex lg:w-1/2'
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className='flex flex-col justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className='mb-6 text-4xl font-bold'>{t('welcome.title')}</h1>
          <p className='mb-12 text-xl text-purple-100'>
            {t('welcome.subtitle')}
          </p>
        </motion.div>

        <div className='space-y-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className='flex items-start space-x-4'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
            >
              <div>
                <h3 className='mb-2 text-lg font-semibold'>
                  {t(feature.titleKey)}
                </h3>
                <p className='text-purple-100'>{t(feature.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default AuthFeatures
