'use client'
import { Menu } from 'lucide-react'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'

import { cn } from '@/lib/utils'
import { Button, LangSwitcher } from '@/src/app/shared/components'
import { Link } from '@/src/navigation'
import { usePathname } from '@/src/navigation'
import { pathnameType } from '@/src/types'

import { clientExludedRoutes } from '../../constants'

interface ClientHeaderProps {
  locale: string
}

interface NavLink {
  name: string
  url: pathnameType
}
export const ClientHeader: FC<ClientHeaderProps> = ({ locale }) => {
  // Get translations
  const t = useTranslations('home.navbar')

  // Translate the navigation links

  const pathname = usePathname()
  const hideNavbar = clientExludedRoutes.some(route => pathname.includes(route))

  const [navbar, setNavbar] = useState<boolean>(false)

  const links: NavLink[] = [
    {
      name: t('home'),
      url: '/client/home'
    },
    {
      name: t('about'),
      url: '/client/about'
    },
    {
      name: t('mentors'),
      url: '/client/projects'
    },
    {
      name: t('contact'),
      url: '/client/contact'
    }
  ]

  return (
    <>
      {!hideNavbar && (
        <nav className='sticky left-0 right-0 top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
              {/* Logo */}
              <div className='flex items-center'>
                <Link lang={locale} href='/client/home'>
                  <div className='flex items-center space-x-2'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500'>
                      <span className='text-sm font-bold text-white'>S</span>
                    </div>
                    <span className='text-xl font-bold text-gray-900'>
                      SkillBridge
                    </span>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className='hidden min-[830px]:block'>
                <div className='ml-10 flex items-baseline space-x-8'>
                  {links.map(link => (
                    <Link
                      key={link.name}
                      href={link.url}
                      className={cn(
                        'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
                        pathname === link.url
                          ? 'bg-purple-50 text-purple-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Side - Desktop */}
              <div className='hidden items-center space-x-4 min-[830px]:flex'>
                <LangSwitcher />
                <Link lang={locale} href='/client/login'>
                  <Button className='rounded-full bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-purple-700'>
                    {t('register')}
                  </Button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className='sm:block min-[830px]:hidden'>
                <button
                  onClick={() => setNavbar(!navbar)}
                  className='inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-50 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500'
                >
                  {navbar ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {navbar && (
              <div className='min-[830px]:hidden'>
                <div className='space-y-1 border-t border-gray-100 bg-white px-2 pb-3 pt-2'>
                  {links.map(link => (
                    <Link
                      key={link.name}
                      href={link.url}
                      onClick={() => setNavbar(false)}
                      className={cn(
                        'block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200',
                        pathname === link.url
                          ? 'bg-purple-50 text-purple-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className='border-t border-gray-200 pb-3 pt-4'>
                    <div className='flex items-center justify-between px-3'>
                      <LangSwitcher />
                      <Link lang={locale} href='/client/login'>
                        <Button
                          onClick={() => setNavbar(false)}
                          className='rounded-full bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-purple-700'
                        >
                          {t('register')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  )
}
