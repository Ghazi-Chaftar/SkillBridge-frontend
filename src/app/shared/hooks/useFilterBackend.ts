import _ from 'lodash'
import { useSearchParams } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'

import { usePathname, useRouter } from '@/src/navigation'
import { pathnameType } from '@/src/types'

import { useLocalizedUrl } from './initUrlWithLang'

export type UseBackendFilteringParams = {
  keys: string[]
  page: string
  size: string
  setFilteredData?: Dispatch<SetStateAction<any[]>>
  debounceDelay?: number
  resetInfiniteScroll?: () => void
  resetPagination: () => void
  searchParamsObj: Record<string, string>
}

export type FilterState = { [key: string]: string | undefined }

const useBackendFiltering = ({
  keys,

  debounceDelay = 3000,
  resetInfiniteScroll,
  searchParamsObj
}: UseBackendFilteringParams): {
  filterState: FilterState
  updateFilter: (key: string, value: string | undefined) => void
  triggerSearch: () => void
} => {
  const [filterState, setFilterState] = useState<FilterState>(() => {
    const initialState = keys.reduce((acc, key) => {
      acc[key] = searchParamsObj[key] || undefined
      return acc
    }, {} as FilterState)
    return initialState
  })

  const getLocalizedUrl = useLocalizedUrl()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const debouncedTriggerSearch = useCallback(
    _.debounce(() => {
      if (resetInfiniteScroll) {
        resetInfiniteScroll()
      }

      const params: Record<string, string> = {
        ...Object.fromEntries(searchParams)
      }
      Object.entries(filterState).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params[key] = value
        } else {
          delete params[key]
        }
      })

      const url = getLocalizedUrl(pathname, params)
      router.push(`${url.href}` as pathnameType, { scroll: false })
    }, debounceDelay),
    [
      filterState,
      getLocalizedUrl,
      pathname,
      router,
      searchParams,
      debounceDelay,
      resetInfiniteScroll
    ]
  )

  const updateFilter = (key: string, value: string | undefined): void => {
    setFilterState(prevState => ({ ...prevState, [key]: value }))
  }

  useEffect(() => {
    const hasValidFilterState = Object.values(filterState).some(
      value => value && value.length >= 1
    )
    const hasInvalidFilterState = Object.values(filterState).some(
      value => value === undefined || value === '' || value.length <= 1
    )
    const hasValidSearchParams = Array.from(searchParams.entries()).some(
      ([key, value]) => key !== 'page' && key !== 'size' && value.length >= 1
    )

    if (
      hasValidFilterState ||
      (hasInvalidFilterState && hasValidSearchParams)
    ) {
      debouncedTriggerSearch()
    }
  }, [filterState, searchParams])

  return { filterState, updateFilter, triggerSearch: debouncedTriggerSearch }
}

export default useBackendFiltering
