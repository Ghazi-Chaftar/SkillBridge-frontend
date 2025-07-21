'use client'

import { LogOut, Shield, Users } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/src/app/shared/components'
import { LangSwitcher } from '@/src/app/shared/components/utils/LangSwitcher'
import { Link, usePathname } from '@/src/navigation'
import { pathnameType } from '@/src/types'

interface NavItem {
  name: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}

export const MentorSidebar = (): JSX.Element => {
  const t = useTranslations('mentor.sidebar')
  const pathname = usePathname()
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const translateClass = 'translate-x-1'
  const [isOpen] = useState<boolean>(true)

  const navItems: NavItem[] = [
    {
      name: 'profile',
      url: `/mentor/profile`,
      icon: Users
    },
    {
      name: 'security',
      url: `/mentor/security`,
      icon: Shield
    }
  ]

  const isActiveLink = (linkUrl: string): boolean => {
    return pathname === linkUrl || pathname.startsWith(linkUrl + '/')
  }

  const handleLogout = (): void => {
    // Handle logout logic here
    // Redirect to login page or handle authentication
  }

  const renderSidebarLink = (link: NavItem, index: number): JSX.Element => {
    return (
      <div className='w-[95%]' key={index}>
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                className={cn(
                  'my-2 h-10 w-full justify-start bg-transparent text-gray-600 hover:text-purple-600',
                  isActiveLink(link.url) &&
                    'bg-purple-100 font-bold text-purple-700 hover:text-purple-700',
                  isOpen && 'rounded',
                  isOpen && isActiveLink(link.url) && (isRTL ? 'pr-5' : 'pl-5'),
                  translateClass
                )}
                asChild
              >
                <Link href={link.url as pathnameType}>
                  <span
                    className={cn(
                      isOpen === false ? '' : isRTL ? 'ml-4' : 'mr-4'
                    )}
                  >
                    <link.icon className='h-5 w-5' />
                  </span>
                  <p
                    className={cn(
                      'max-w-[200px] truncate text-sm',
                      isOpen === false
                        ? '-translate-x-96 opacity-0'
                        : 'translate-x-0 opacity-100'
                    )}
                  >
                    {t(link.name)}
                  </p>
                </Link>
              </Button>
            </TooltipTrigger>
            {renderTooltip(link)}
          </Tooltip>

          {(index + 1) % 3 === 0 && <hr className='my-2 border-dashed' />}
        </TooltipProvider>
      </div>
    )
  }

  const renderTooltip = (link: NavItem): JSX.Element | null => {
    if (isOpen === false) {
      return (
        <TooltipContent
          side={isRTL ? 'left' : 'right'}
          className='text-gray-700'
        >
          {t(link.name)}
        </TooltipContent>
      )
    }
    return null
  }

  return (
    <aside
      className={cn(
        `${isRTL ? 'right-[24px]' : 'left-[24px]'} top-16 z-20 hidden h-fit ${isRTL ? 'translate-x-full' : '-translate-x-full'} rounded-xl bg-white transition-[width] duration-300 ease-in-out lg:fixed lg:block lg:translate-x-0`,
        isOpen === false ? 'w-[90px]' : 'w-64'
      )}
    >
      <div
        className={cn(
          'relative flex h-full max-h-[calc(100vh-5rem)] flex-col overflow-hidden rounded-xl py-4 shadow-lg',
          isRTL ? 'pr-3' : 'pl-3',
          isOpen === false && isRTL && 'overflow-hidden'
        )}
      >
        {/* Logo Section */}
        <div className='mb-4 flex items-center justify-center border-b border-gray-200 pb-4'>
          <div className='flex items-center'>
            <Link lang={locale} href={'/mentor/profile' as pathnameType}>
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
        </div>

        {/* Navigation Links */}
        <div className='max-h-[calc(100vh-12rem)] flex-1 overflow-y-auto'>
          {navItems.map((link, index) => renderSidebarLink(link, index))}

          {/* Logout Button */}
          <div className='w-[95%]'>
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    className={cn(
                      'my-2 h-10 w-full justify-start bg-transparent text-red-600 hover:bg-red-50 hover:text-red-700',
                      isOpen && 'rounded',
                      translateClass
                    )}
                    onClick={handleLogout}
                  >
                    <span
                      className={cn(
                        isOpen === false ? '' : isRTL ? 'ml-4' : 'mr-4'
                      )}
                    >
                      <LogOut className='h-5 w-5' />
                    </span>
                    <p
                      className={cn(
                        'max-w-[200px] truncate text-sm',
                        isOpen === false
                          ? '-translate-x-96 opacity-0'
                          : 'translate-x-0 opacity-100'
                      )}
                    >
                      {t('logout')}
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent
                    side={isRTL ? 'left' : 'right'}
                    className='text-gray-700'
                  >
                    {t('logout')}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Footer with Language Switcher and User Profile */}
        <div className='border-t border-gray-200 pt-4'>
          {/* Language Switcher */}
          {isOpen && (
            <div className='mb-4 flex justify-center'>
              <LangSwitcher />
            </div>
          )}

          {/* User Profile Section */}
          <div
            className={cn('px-2', isOpen === false && 'flex justify-center')}
          >
            {isOpen === false ? (
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-600'>
                <span className='text-sm font-medium text-white'>JD</span>
              </div>
            ) : (
              <div className='rounded-lg bg-purple-50 p-3'>
                <div className='flex items-center space-x-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-600'>
                    <span className='text-sm font-medium text-white'>JD</span>
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900'>
                      John Doe
                    </p>
                    <p className='text-xs text-gray-500'>Mentor</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default MentorSidebar
