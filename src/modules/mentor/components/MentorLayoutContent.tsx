'use client'

import { usePathname } from 'next/navigation'

import MentorSidebar from './MentorSidebar'

interface MentorLayoutContentProps {
  children: React.ReactNode
}

const MentorLayoutContent: React.FC<MentorLayoutContentProps> = ({
  children
}) => {
  const pathname = usePathname()
  // Check if the current path is an auth page
  const isAuthPage =
    pathname.includes('/login') ||
    pathname.includes('/register') ||
    pathname.includes('/auth')

  if (isAuthPage) {
    // Render without header and sidebar for auth pages
    return <main className='min-h-screen'>{children}</main>
  }

  // Render with header and sidebar for mentor pages
  return (
    <div className='flex h-screen bg-gray-50'>
      <MentorSidebar />
      <div className='flex flex-1 flex-col overflow-hidden transition-[margin-left,margin-right] duration-300 ease-in-out lg:ml-[270px]'>
        <main className='flex-1 overflow-y-auto p-6'>{children}</main>
      </div>
    </div>
  )
}

export default MentorLayoutContent
