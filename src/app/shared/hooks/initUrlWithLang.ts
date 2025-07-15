import { useLocale } from 'next-intl'

export const useLocalizedUrl = (): ((
  pathname: string,
  params?: Record<string, string | number | boolean>
) => URL) => {
  const locale = useLocale()

  const getLocalizedUrl = (
    pathname: string,
    params?: Record<string, string | number | boolean>
  ): URL => {
    const url = new URL(pathname, window.location.origin)
    url.pathname = `/${locale}${url.pathname}`

    if (params) {
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, String(params[key]))
      })
    }

    return url
  }

  return getLocalizedUrl
}
