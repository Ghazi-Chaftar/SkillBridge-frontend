'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const FAQSection = (): JSX.Element => {
  const t = useTranslations('home.faq')

  const faqs = [
    {
      questionKey: 'questions.whatIs.question',
      answerKey: 'questions.whatIs.answer'
    },
    {
      questionKey: 'questions.howToStart.question',
      answerKey: 'questions.howToStart.answer'
    },
    {
      questionKey: 'questions.pricing.question',
      answerKey: 'questions.pricing.answer'
    },
    {
      questionKey: 'questions.guarantee.question',
      answerKey: 'questions.guarantee.answer'
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
      <div className='mx-auto max-w-4xl' id='faq'>
        <motion.h2
          className='mb-16 text-center text-3xl font-bold text-gray-800 lg:text-4xl'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>

        <div className='space-y-6'>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className='rounded-2xl bg-white p-6 shadow-lg'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className='mb-3 text-xl font-semibold text-gray-800'>
                {t(faq.questionKey)}
              </h3>
              <p className='text-gray-600'>{t(faq.answerKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default FAQSection
