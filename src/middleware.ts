import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { locales } from '@/locales'

import { localePrefix } from './navigation'

type CustomMiddleware = (
  req: NextRequest
) => Promise<NextRequest | NextResponse>

const customMiddleware: CustomMiddleware = async req => {
  const url = req.nextUrl.pathname
  const origin = req.nextUrl.origin
  const locale = url.split('/')[1]
  const token = req.cookies.get('accessToken')
  const isOnTeacherPath = url.startsWith(`/${locale}/teacher`)
  const isOnClientPath = url.startsWith(`/${locale}/client`)
  if (token && !isOnTeacherPath) {
    return NextResponse.redirect(`${origin}/${locale}/teacher`)
  } else if (!token && !isOnClientPath) {
    return NextResponse.redirect(`${origin}/${locale}/client/home`)
  }

  // Continue with the request if no redirect is needed
  return req
}

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix
})

export default async function middleware(
  req: NextRequest
): Promise<ReturnType<typeof intlMiddleware> | NextResponse> {
  const customResult = await customMiddleware(req)
  if (customResult instanceof NextResponse) {
    return customResult
  }
  return intlMiddleware(req)
}

export const config = {
  matcher: ['/', '/(fr|en|ja|de|ru|es|fa|ar)/:path*']
}
