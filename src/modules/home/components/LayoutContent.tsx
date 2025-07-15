'use client'
import { usePathname } from 'next/navigation'

import { ClientHeader } from '@/src/app/shared/components/navbars'

import Footer from './Footer'

interface LayoutContentProps {
  children: React.ReactNode
  locale: string
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children, locale }) => {
  const pathname = usePathname()

  // Check if the current path contains 'login', 'register', or 'auth'
  const isAuthPage =
    pathname.includes('/login') ||
    pathname.includes('/register') ||
    pathname.includes('/auth')

  if (isAuthPage) {
    // Render without header and footer for auth pages
    return <main className='min-h-screen'>{children}</main>
  }

  // Render with header and footer for other pages
  return (
    <>
      <ClientHeader locale={locale} />
      <div className='grid min-h-screen grid-rows-[auto_1fr_auto]'>
        <main className='row-span-1'>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default LayoutContent
