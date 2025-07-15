import { useSearchParams } from 'next/navigation'
import { useCallback, useRef } from 'react'

import { usePathname, useRouter } from '@/src/navigation'
import { pathnameType } from '@/src/types'

import { useLocalizedUrl } from './initUrlWithLang'

type UsePaginationProps = {
  isInfiniteScroll?: boolean
  totalPages?: number
}

type UsePaginationReturn = {
  pageIndex: number
  pageSize: number
  handlePageChange: (newPageIndex: number) => void
  handlePageSizeChange: (newPageSize: number) => void
  handleSearchParamChange: (
    newValue: string,
    key: string,
    page: string,
    size: string
  ) => void
}

const usePagination = ({
  totalPages = Infinity
}: UsePaginationProps = {}): UsePaginationReturn => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const getLocalizedUrl = useLocalizedUrl()
  const scrollPosition = useRef(0)
  const pageIndex = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('size') || '10', 10)

  const handlePageChange = useCallback(
    (newPageIndex: number) => {
      if (newPageIndex > totalPages || newPageIndex < 1) return

      scrollPosition.current = window.scrollY

      const url = getLocalizedUrl(pathname, {
        ...Object.fromEntries(searchParams),
        page: newPageIndex.toString()
      })
      router.push(`${url.href}` as any, { scroll: false })

      const timer = setTimeout(() => {
        window.scrollTo(0, scrollPosition.current)
      }, 50)

      return () => clearTimeout(timer)
    },
    [totalPages, getLocalizedUrl, pathname, router, searchParams]
  )

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      // Save current scroll position
      scrollPosition.current = window.scrollY

      const url = getLocalizedUrl(pathname, {
        ...Object.fromEntries(searchParams),
        size: newPageSize.toString(),
        page: '1'
      })
      router.push(`${url.href}` as pathnameType, { scroll: false })

      const timer = setTimeout(() => {
        window.scrollTo(0, scrollPosition.current)
      }, 100)

      return () => clearTimeout(timer)
    },
    [getLocalizedUrl, pathname, router, searchParams]
  )

  const handleSearchParamChange = useCallback(
    (newValue: string, key: string, page: string, size: string) => {
      const url = getLocalizedUrl(pathname, {
        ...Object.fromEntries(searchParams),
        [key]: newValue,
        size: size,
        page: page
      })
      router.push(`${url.href}` as pathnameType)
    },
    [getLocalizedUrl, pathname, router, searchParams]
  )

  return {
    pageIndex,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    handleSearchParamChange
  }
}

export default usePagination
