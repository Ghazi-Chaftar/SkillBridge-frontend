import type { Metadata } from 'next'

import { ThemeSwitch } from '@/src/app/shared/components/theme/ThemeSwitch'
import LayoutContent from '@/src/modules/home/components/LayoutContent'

export const metadata: Metadata = {
  title: 'Archimatch | Client',
  description: 'Archimatch'
}

type RootLayoutProps = {
  children: React.ReactNode
  params: { locale: string }
}

const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  params: { locale }
}) => {
  // You can also use usePathname hook for more dynamic checking
  // But since this is a server component, we'll check the URL differently

  // For server component, you would need to use headers() to get the pathname
  // But here's a simpler approach using a client component wrapper

  return (
    <>
      <ThemeSwitch theme={'client'} />
      <LayoutContent locale={locale}>{children}</LayoutContent>
    </>
  )
}

export default RootLayout
