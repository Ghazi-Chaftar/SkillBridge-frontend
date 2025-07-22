/* eslint-disable complexity */
'use client'

import Cookies from 'js-cookie'
import { LogOut, Menu, Shield, Users, X } from 'lucide-react'
import Image from 'next/image'
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
import { useProfileData, useUserData } from '@/src/lib/stores'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const userData = useUserData()
  const profileData = useProfileData()

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
    Cookies.remove('accessToken')
    window.location.href = `/${locale}/client/home`
  }

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false)
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
                onClick={closeMobileMenu}
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

  const renderMobileNavLink = (link: NavItem): JSX.Element => {
    return (
      <Link
        key={link.name}
        href={link.url as pathnameType}
        onClick={closeMobileMenu}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600',
          isActiveLink(link.url) && 'bg-purple-100 font-medium text-purple-700'
        )}
      >
        <link.icon className='h-5 w-5' />
        <span>{t(link.name)}</span>
      </Link>
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
    <>
      {/* Mobile Header */}
      <header className='fixed top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm lg:hidden'>
        <div className='flex h-16 items-center justify-between px-4'>
          {/* Logo */}
          <Link
            href={'/mentor/profile' as pathnameType}
            className='flex items-center space-x-2'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500'>
              <span className='text-sm font-bold text-white'>S</span>
            </div>
            <span className='text-lg font-bold text-gray-900'>SkillBridge</span>
          </Link>

          {/* User Profile and Menu Button */}
          <div className='flex items-center space-x-3'>
            {/* User Profile */}
            {!userData ? (
              <div className='h-8 w-8 animate-pulse rounded-full bg-gray-300'></div>
            ) : (
              <div className='relative flex h-8 w-8 items-center justify-center rounded-full bg-purple-600'>
                <Image
                  src={
                    profileData?.profilePicture || '/images/default-avatar.svg'
                  }
                  alt='Profile Picture'
                  className='absolute h-full w-full rounded-full object-cover'
                  fill
                />
              </div>
            )}

            {/* Menu Button */}
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleMobileMenu}
              className='h-8 w-8 p-0'
            >
              {isMobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`absolute left-0 right-0 top-full overflow-hidden border-b border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-screen translate-y-0 pb-20 opacity-100'
              : 'max-h-0 -translate-y-2 opacity-0'
          }`}
        >
          <div
            className={`p-4 transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
            }`}
          >
            {/* User Info */}
            {userData && (
              <div
                className={`mb-4 rounded-lg bg-purple-50 p-3 transition-all delay-75 duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-2 opacity-0'
                }`}
              >
                <div className='flex items-center space-x-3'>
                  <div className='relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full'>
                    <Image
                      src={
                        profileData?.profilePicture ||
                        '/images/default-avatar.svg'
                      }
                      alt='Profile Picture'
                      className='absolute h-full w-full rounded-full object-cover'
                      fill
                    />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      {`${userData?.firstName || 'John'} ${userData?.lastName || 'Doe'}`}
                    </p>
                    <p className='text-xs text-gray-500'>Mentor</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div
              className={`space-y-1 transition-all delay-100 duration-300 ease-in-out ${
                isMobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-2 opacity-0'
              }`}
            >
              {navItems.map(renderMobileNavLink)}
            </div>
            <Button
              onClick={() => {
                handleLogout()
                closeMobileMenu()
              }}
              variant='ghost'
              className={`w-full justify-start text-red-600 transition-all delay-200 duration-300 ease-in-out hover:bg-red-50 hover:text-red-700 ${
                isMobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-2 opacity-0'
              }`}
            >
              <LogOut className='mr-3 h-5 w-5' />
              {t('logout')}
            </Button>
            {/* Language Switcher */}
            <div
              className={`my-4 flex justify-center border-t border-gray-100 pt-4 transition-all delay-150 duration-300 ease-in-out ${
                isMobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-2 opacity-0'
              }`}
            >
              <LangSwitcher />
            </div>

            {/* Logout Button */}
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/20 lg:hidden'
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop Sidebar (unchanged) */}
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
              {!userData ? (
                // Skeleton Loading State
                isOpen === false ? (
                  <div className='h-10 w-10 animate-pulse rounded-full bg-gray-300'></div>
                ) : (
                  <div className='rounded-lg bg-gray-50 p-3'>
                    <div className='flex items-center space-x-3'>
                      <div className='h-10 w-10 animate-pulse rounded-full bg-gray-300'></div>
                      <div className='flex-1 space-y-2'>
                        <div className='h-4 w-24 animate-pulse rounded bg-gray-300'></div>
                        <div className='h-3 w-16 animate-pulse rounded bg-gray-300'></div>
                      </div>
                    </div>
                  </div>
                )
              ) : isOpen === false ? (
                <Image
                  src={
                    profileData?.profilePicture || '/images/default-avatar.svg'
                  }
                  alt='Profile Picture'
                  className='absolute h-full w-full rounded-full object-cover'
                  fill
                />
              ) : (
                <div className='rounded-lg bg-purple-50 p-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='relative flex h-10 w-10 items-center justify-center rounded-full bg-purple-600'>
                      <Image
                        src={
                          profileData?.profilePicture ||
                          '/images/default-avatar.svg'
                        }
                        alt='Profile Picture'
                        className='absolute h-full w-full rounded-full object-cover'
                        fill
                      />
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-gray-900'>
                        {`${userData?.firstName || 'John'} ${userData?.lastName || 'Doe'} `}
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
    </>
  )
}

export default MentorSidebar
