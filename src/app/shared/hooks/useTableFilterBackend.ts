import _ from 'lodash'
import { useSearchParams } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
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
  handlePageChange: (newPageIndex: number) => void
  debounceDelay?: number
}

export type FilterState = {
  [key: string]: string | undefined
}

const useTableFilterBackend = ({
  keys,

  debounceDelay = 500
}: UseBackendFilteringParams): {
  filterState: FilterState
  updateFilter: (key: string, value: string | undefined) => void
  triggerSearch: () => void
  searchParamsObj: Record<string, string>
} => {
  const searchParams = useSearchParams()
  const searchParamsObj = useMemo(() => {
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })
    return params
  }, [searchParams])
  const [filterState, setFilterState] = useState<FilterState>(() => {
    const initialState = keys.reduce((acc, key) => {
      acc[key] = searchParamsObj[key] || undefined
      return acc
    }, {} as FilterState)

    return initialState
  })

  const getLocalizedUrl = useLocalizedUrl()
  const router = useRouter()

  const pathname = usePathname()

  const debouncedTriggerSearch = useCallback(
    _.debounce(() => {
      const params: Record<string, string> = {
        ...Object.fromEntries(searchParams)
      }
      Object.entries(filterState).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params[key] = value
        } else {
          delete params[key]
        }
        params['page'] = '1'
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
      debounceDelay
    ]
  )

  const updateFilter = (key: string, value: string | undefined): void => {
    setFilterState(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  useEffect(() => {
    const hasValidFilterState = Object.values(filterState).some(
      value => value && value.length >= 1
    )
    const hasInvalidFilterState = Object.values(filterState).some(
      value => value === undefined || value === '' || value.length <= 1
    )

    if (hasValidFilterState || hasInvalidFilterState) {
      debouncedTriggerSearch()
    }
  }, [filterState])

  return {
    filterState,
    updateFilter,
    triggerSearch: debouncedTriggerSearch,
    searchParamsObj
  }
}

export default useTableFilterBackend
