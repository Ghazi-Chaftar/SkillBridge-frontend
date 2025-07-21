import type { Metadata } from 'next'

import { ThemeSwitch } from '@/src/app/shared/components/theme/ThemeSwitch'
import MentorLayoutContent from '@/src/modules/mentor/components/MentorLayoutContent'

export const metadata: Metadata = {
  title: 'SkillBridge | Mentor Dashboard',
  description: 'Mentor dashboard for SkillBridge platform'
}

type RootLayoutProps = {
  children: React.ReactNode
  params: { locale: string }
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <ThemeSwitch theme={'client'} />
      <MentorLayoutContent>{children}</MentorLayoutContent>
    </>
  )
}

export default RootLayout
