'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const About = (): JSX.Element => {
  const t = useTranslations('about')

  const values = [
    {
      icon: '🎯',
      key: 'values.mission'
    },
    {
      icon: '👁️',
      key: 'values.vision'
    },
    {
      icon: '💎',
      key: 'values.excellence'
    },
    {
      icon: '🤝',
      key: 'values.community'
    }
  ]

  const team = [
    {
      nameKey: 'team.john.name',
      roleKey: 'team.john.role',
      bioKey: 'team.john.bio',
      avatar: '👨‍💼'
    },
    {
      nameKey: 'team.sarah.name',
      roleKey: 'team.sarah.role',
      bioKey: 'team.sarah.bio',
      avatar: '👩‍💼'
    },
    {
      nameKey: 'team.michael.name',
      roleKey: 'team.michael.role',
      bioKey: 'team.michael.bio',
      avatar: '👨‍🎓'
    }
  ]

  const stats = [
    {
      numberKey: 'stats.mentors.number',
      labelKey: 'stats.mentors.label'
    },
    {
      numberKey: 'stats.students.number',
      labelKey: 'stats.students.label'
    },
    {
      numberKey: 'stats.sessions.number',
      labelKey: 'stats.sessions.label'
    },
    {
      numberKey: 'stats.satisfaction.number',
      labelKey: 'stats.satisfaction.label'
    }
  ]

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

      {/* Stats Section */}
      <motion.section
        className='bg-gray-50 px-4 py-16'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className='mx-auto max-w-6xl'>
          <div className='grid gap-8 md:grid-cols-4'>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className='text-center'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className='text-3xl font-bold text-purple-600'>
                  {t(stat.numberKey)}
                </h3>
                <p className='text-gray-600'>{t(stat.labelKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Story Section */}
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
                {t('story.title')}
              </h2>
              <div className='space-y-4 text-gray-600'>
                <p>{t('story.paragraph1')}</p>
                <p>{t('story.paragraph2')}</p>
                <p>{t('story.paragraph3')}</p>
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
                <div className='text-center'>
                  <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg'>
                    <span className='text-3xl'>🚀</span>
                  </div>
                  <h3 className='mb-2 text-xl font-semibold text-gray-800'>
                    {t('story.mission')}
                  </h3>
                  <p className='text-gray-600'>{t('story.missionText')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className='bg-gray-50 px-4 py-20'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className='mx-auto max-w-6xl'>
          <motion.div
            className='mb-16 text-center'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='mb-4 text-3xl font-bold text-gray-800 lg:text-4xl'>
              {t('values.title')}
            </h2>
            <p className='text-xl text-gray-600'>{t('values.subtitle')}</p>
          </motion.div>

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {values.map((value, index) => (
              <motion.div
                key={index}
                className='rounded-2xl bg-white p-6 text-center shadow-lg'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100'>
                  <span className='text-2xl'>{value.icon}</span>
                </div>
                <h3 className='mb-2 text-lg font-semibold text-gray-800'>
                  {t(`${value.key}.title`)}
                </h3>
                <p className='text-gray-600'>{t(`${value.key}.description`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className='px-4 py-20'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className='mx-auto max-w-6xl'>
          <motion.div
            className='mb-16 text-center'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='mb-4 text-3xl font-bold text-gray-800 lg:text-4xl'>
              {t('team.title')}
            </h2>
            <p className='text-xl text-gray-600'>{t('team.subtitle')}</p>
          </motion.div>

          <div className='grid gap-8 md:grid-cols-3'>
            {team.map((member, index) => (
              <motion.div
                key={index}
                className='rounded-2xl bg-white p-6 text-center shadow-lg'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100'>
                  <span className='text-3xl'>{member.avatar}</span>
                </div>
                <h3 className='mb-2 text-xl font-semibold text-gray-800'>
                  {t(member.nameKey)}
                </h3>
                <p className='mb-3 text-purple-600'>{t(member.roleKey)}</p>
                <p className='text-gray-600'>{t(member.bioKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default About
