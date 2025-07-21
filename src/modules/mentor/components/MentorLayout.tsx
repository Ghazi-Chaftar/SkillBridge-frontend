'use client'

import { MentorSidebar } from './MentorSidebar'

interface MentorLayoutProps {
  children: React.ReactNode
}

export const MentorLayout: React.FC<MentorLayoutProps> = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <MentorSidebar />

      <main className={`flex-1 transition-all duration-300 ${'lg:ml-64'}`}>
        <div className='p-6 lg:p-8'>{children}</div>
      </main>
    </div>
  )
}

export default MentorLayout
