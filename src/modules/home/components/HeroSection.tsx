'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { Link } from '@/src/navigation'

const HeroSection = (): JSX.Element => {
  const t = useTranslations('home.hero')
  return (
    <motion.section
      className='relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 px-4 py-20 text-white'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className='mx-auto max-w-6xl'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1 className='text-4xl font-bold leading-tight lg:text-6xl'>
              {t('title')} {t('titleHighlight')}
              <br />
              <span className='text-purple-200'>{t('subtitle2')}</span>
            </h1>
            <p className='text-xl leading-relaxed text-purple-100'>
              {t('subtitle')}
            </p>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <button className='rounded-full bg-white px-8 py-4 font-semibold text-purple-600 transition-colors hover:bg-purple-50'>
                {t('findMentor')}
              </button>
              <Link href='/client/login'>
                <button className='rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-purple-600'>
                  {t('joinAsMentor')}
                </button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className='relative'
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className='rounded-2xl bg-white p-8 shadow-2xl'>
              <div className='mb-6 flex items-center space-x-4'>
                <div className='flex h-16 w-16 items-center justify-center rounded-full bg-purple-100'>
                  <span className='text-2xl'>👩‍🏫</span>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {t('teacherCard.name')}
                  </h3>
                  <p className='text-gray-600'>{t('teacherCard.subject')}</p>
                </div>
              </div>
              <div className='space-y-3 text-gray-700'>
                <div className='flex justify-between'>
                  <span>{t('teacherCard.experience')}:</span>
                  <span className='font-semibold'>
                    {t('teacherCard.experienceValue')}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span>{t('teacherCard.rating')}:</span>
                  <span className='font-semibold'>
                    ⭐⭐⭐⭐⭐ {t('teacherCard.ratingValue')}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span>{t('teacherCard.rate')}:</span>
                  <span className='font-semibold'>
                    {t('teacherCard.rateValue')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default HeroSection
