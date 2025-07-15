'use client'
import { FR, GB } from 'country-flag-icons/react/3x2'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { Button } from './Button'

export const LangSwitcher: React.FC = () => {
  interface Option {
    country: string
    code: string
    flag: React.ReactNode
  }

  const t = useTranslations('langSwitcher')
  const pathname = usePathname()
  const languageCode = pathname.split('/')[1]
  const segments = pathname.split('/')
  const secondPart = segments.slice(2).join('/')

  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false)
  const options: Option[] = [
    {
      country: t('french'),
      code: 'fr',
      flag: <FR className='w-7 rounded-[2px]' />
    },
    {
      country: t('english'),
      code: 'en',
      flag: <GB className=' w-7 rounded-[2px] ' />
    }
    // {
    //   country: t('arabic'),
    //   code: 'ar',
    //   flag: <TN className=' w-7 rounded-[2px] ' />
    // }
  ]

  return (
    <div className='flex items-center justify-center'>
      <div className='relative'>
        <Button
          className=' inline-flex w-full items-center justify-between gap-3 hover:bg-transparent'
          size='sm'
          variant={'ghost'}
          onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
          onBlur={() => setIsOptionsExpanded(false)}
        >
          {options.map(lang => {
            if (languageCode === `${lang.code}`) {
              return (
                <React.Fragment key={lang.code}>{lang.flag}</React.Fragment>
              )
            }
            return null
          })}
        </Button>
        {isOptionsExpanded && (
          <div className='absolute left-0 mt-2 w-[150px] origin-top-right rounded-md bg-white shadow-lg md:right-5'>
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              {options.map(lang => {
                return (
                  <Link key={lang.code} href={`/${lang.code}/${secondPart}`}>
                    <button
                      lang={lang.code}
                      onMouseDown={e => {
                        e.preventDefault()
                      }}
                      className={` flex w-full items-center gap-1 px-4 py-2 text-left text-sm hover:bg-primary hover:text-white  ${
                        pathname === `/${lang.code}`
                          ? 'bg-primary text-primary hover:bg-selected'
                          : 'text-secondary'
                      }`}
                    >
                      <div>{lang.flag}</div>
                      <div>{lang.country}</div>
                    </button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
