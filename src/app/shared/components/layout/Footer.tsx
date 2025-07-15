'use client'
import { useTranslations } from 'next-intl'
import React from 'react'

import { cn } from '@/lib/utils'
import { usePathname } from '@/src/navigation'

import {
  architectExludedRoutes,
  clientExludedRoutes,
  officeExludedRoutes,
  officeFooterExludedRoutes
} from '../../constants'

export const Footer: React.FC = () => {
  const t = useTranslations('footer')
  const pathname = usePathname()
  const hideFooter =
    clientExludedRoutes.some(route => pathname.includes(route)) ||
    architectExludedRoutes.some(route => pathname.includes(route)) ||
    officeExludedRoutes.some(route => pathname.includes(route)) ||
    officeFooterExludedRoutes.some(route => pathname.includes(route))
  const currentYear = new Date().getFullYear()
  return (
    <footer
      className={cn(
        'row-span-1 mt-5 flex flex-col bg-white px-10',
        hideFooter && 'hidden'
      )}
    >
      <div className='flex flex-col justify-around gap-4 bg-white px-4 py-6 md:flex-row md:py-8'>
        <div className='max-w-[279px]'>
          <p className='mt-8 text-secondary'>{t('welcome')}</p>
        </div>
        <div className='flex flex-wrap gap-8 bg-white'>
          {/* {sections.map((section, index) => (
            <LinkSection
              key={index}
              title={section.title}
              links={section.links as any}
            />
          ))} */}
        </div>
      </div>
      <div className='m-auto flex w-[90%] flex-wrap justify-center gap-2 border-t-2 bg-white py-6 sm:flex-row sm:justify-between'>
        <span className='px-10 text-sm text-secondary sm:text-center'>
          {t('rights', { year: currentYear })}
        </span>
        <div className='flex '>{/* <SocialIcons /> */}</div>
      </div>
    </footer>
  )
}

export default Footer
