'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const Footer = (): JSX.Element => {
  const t = useTranslations('home.footer')

  const footerSections = [
    {
      titleKey: 'brand.title',
      contentKey: 'description',
      isDescription: true
    },
    {
      titleKey: 'quickLinks',
      linksKeys: ['links.about', 'links.mentors', 'links.contact']
    },
    {
      titleKey: 'support',
      linksKeys: ['links.help', 'links.faq']
    },
    {
      titleKey: 'followUs',
      isSocial: true
    }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: '📘' },
    { name: 'Twitter', icon: '🐦' },
    { name: 'Instagram', icon: '📷' }
  ]

  return (
    <motion.footer
      className='bg-gray-800 px-4 py-12 text-white'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className='mx-auto max-w-6xl'>
        <motion.div
          className='grid gap-8 md:grid-cols-4'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h3
                className={`mb-4 ${section.isDescription ? 'text-xl font-bold' : 'font-semibold'}`}
              >
                {section.isDescription ? 'SkillBridge' : t(section.titleKey)}
              </h3>
              {section.isDescription ? (
                <p className='text-gray-400'>{t(section.contentKey)}</p>
              ) : section.isSocial ? (
                <div className='flex space-x-4'>
                  {socialLinks.map((social, socialIndex) => (
                    <motion.a
                      key={socialIndex}
                      href='#'
                      className='text-gray-400 transition-colors hover:text-white'
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className='sr-only'>{social.name}</span>
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              ) : (
                <ul className='space-y-2 text-gray-400'>
                  {section.linksKeys?.map((linkKey, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={linkKey === 'links.faq' ? '#faq' : '#'}
                        className='transition-colors hover:text-white'
                        onClick={
                          linkKey === 'links.faq'
                            ? e => {
                                e.preventDefault()
                                const faqSection =
                                  document.getElementById('faq')
                                if (faqSection) {
                                  faqSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                  })
                                }
                              }
                            : undefined
                        }
                      >
                        {t(linkKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className='mt-8 border-t border-gray-700 pt-8 text-center text-gray-400'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 SkillBridge. {t('rights')}</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
