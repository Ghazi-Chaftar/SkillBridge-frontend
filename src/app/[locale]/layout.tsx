import './globals.css'

import type { Metadata } from 'next'
import { Lato, Rubik, Space_Grotesk } from 'next/font/google'
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages
} from 'next-intl'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'

import Providers from '@/src/lib/providers'

import { ThemeProvider } from '../shared/components/theme/ThemeProvider'

const rubik = Rubik({
  subsets: ['arabic'],
  variable: '--rubik'
})
const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})
const lato = Lato({
  subsets: ['latin'],
  variable: '--lato',
  weight: '400'
})
export const metadata: Metadata = {
  title: 'Archimatch',
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
  const messages = useMessages()

  return (
    <html
      lang={locale}
      dir={locale === 'ar' || locale == 'fa' ? 'rtl' : 'ltr'}
      className={`${space_grotesk.variable} ${rubik.variable}  ${lato.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <meta name='robots' content='NOINDEX, NOFOLLOW'></meta>
      <body className=''>
        <ThemeProvider
          enableSystem
          attribute='class'
          defaultTheme='client'
          themes={['client', 'architect', 'admin', 'supplier']}
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages as AbstractIntlMessages}
          >
            <NextTopLoader
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              easing='ease'
              speed={200}
              shadow='0 0 10px var(--primary),0 0 5px var(--primary)'
              color='var(--primary)'
              showSpinner={false}
            />

            <main className='mx-auto h-screen w-full  '>
              <Providers>{children}</Providers>
              <Toaster
                richColors={true}
                position={locale === 'ar' ? 'top-right' : 'top-right'}
                closeButton
                toastOptions={{
                  classNames: {
                    closeButton: `!self-end m-3    ${locale}==ar ? !right-[90%] : !left-[90%]`
                  }
                }}
              />
            </main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
export default RootLayout
