'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface TestimonialsProps {
  email: string
  setEmail: (email: string) => void
}

const TestimonialsSection = ({
  email,
  setEmail
}: TestimonialsProps): JSX.Element => {
  const t = useTranslations('home.testimonials')

  const testimonials = [
    {
      nameKey: 'reviews.sarah.name',
      roleKey: 'reviews.sarah.role',
      avatar: '👩',
      quoteKey: 'reviews.sarah.content'
    },
    {
      nameKey: 'reviews.michael.name',
      roleKey: 'reviews.michael.role',
      avatar: '👨‍🏫',
      quoteKey: 'reviews.michael.content'
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
          <h2 className='mb-16 text-3xl font-bold text-gray-800 lg:text-4xl'>
            {t('title')}
          </h2>
        </motion.div>

        <motion.div
          className='mb-16 grid gap-8 md:grid-cols-2'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className='rounded-2xl bg-white p-8 shadow-lg'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='mb-4 flex items-center space-x-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-purple-100'>
                  <span className='text-xl'>{testimonial.avatar}</span>
                </div>
                <div className='text-left'>
                  <h4 className='font-semibold text-gray-800'>
                    {t(testimonial.nameKey)}
                  </h4>
                  <p className='text-sm text-gray-600'>
                    {t(testimonial.roleKey)}
                  </p>
                </div>
              </div>
              <p className='italic text-gray-700'>{t(testimonial.quoteKey)}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className='mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className='mb-4 text-2xl font-bold text-gray-800'>
            {t('newsletter.title')}
          </h3>
          <p className='mb-6 text-gray-600'>{t('newsletter.description')}</p>
          <div className='flex flex-col gap-4 sm:flex-row'>
            <input
              type='email'
              placeholder={t('newsletter.placeholder')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='flex-1 rounded-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
            <motion.button
              className='rounded-full bg-purple-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-purple-700'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('newsletter.button')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default TestimonialsSection
