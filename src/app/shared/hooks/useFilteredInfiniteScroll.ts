import useBackendFiltering from '@/src/app/shared/hooks/useFilterBackend'
import { PaginationResult } from '@/src/entities/paginationResult'

import useInfiniteScrollWithFetch from './useInfiniteScroll'

interface UseFilteredInfiniteScrollProps<T> {
  queryKey: string[]
  fetchData: (
    pageIndex: number,
    pageSize: number,
    searchParams: Record<string, string>,
    id?: number
  ) => Promise<PaginationResult<T>>
  filterKeys: string[]
  initialPage?: string
  initialSize?: string
  debounceDelay?: number
  id?: number
}

type UseFilteredInfiniteScrollReturn<T> = {
  data: T[]
  totalPages: number
  pageIndex: number
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  loadMore: () => void
  handleSelectSuggestion: (key: string, value: any) => void
  filterState: Record<string, any>
  triggerSearch: () => void
  resetPagination: () => void
}

export const useFilteredInfiniteScroll = <T>({
  queryKey,
  fetchData,
  filterKeys,
  initialPage = '1',
  initialSize = '10',
  debounceDelay = 500,
  id
}: UseFilteredInfiniteScrollProps<T>): UseFilteredInfiniteScrollReturn<T> => {
  const {
    data,
    totalPages,
    pageIndex,
    isSuccess,
    isError,
    isLoading,
    setData,
    loadMore,
    resetPagination,
    searchParamsObj
  } = useInfiniteScrollWithFetch<T>({
    queryKey,
    fetchData,
    id,
    initialPageSize: parseInt(initialSize),
    initialPageIndex: parseInt(initialPage)
  })

  const { filterState, updateFilter, triggerSearch } = useBackendFiltering({
    keys: filterKeys,
    page: initialPage,
    size: initialSize,
    setFilteredData: setData,
    resetPagination: resetPagination,
    debounceDelay,
    searchParamsObj
  })

  const handleSelectSuggestion = (key: string, value: any): void => {
    updateFilter(key, value)
    resetPagination()
  }

  return {
    data,
    totalPages,
    pageIndex,
    isLoading,
    isSuccess,
    isError,
    loadMore,
    handleSelectSuggestion,
    filterState,
    triggerSearch,
    resetPagination
  }
}
