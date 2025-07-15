import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

import { locales, localFiles } from '@/locales'

const importLocaleMessages = async (locale: string): Promise<any> => {
  const messages = {} as any
  for (const file of localFiles) {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await import(`../locales/${locale}/${file}.json`)
    messages[file] = module.default
  }
  return messages
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    notFound()
  }
  const messages = await importLocaleMessages(locale)

  return {
    messages
  }
})
