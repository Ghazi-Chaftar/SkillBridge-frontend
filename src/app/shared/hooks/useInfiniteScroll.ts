import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

type UseInfiniteScrollWithFetchProps<T> = {
  queryKey: any[] // Ensure queryKey is an array
  fetchData: (
    pageIndex: number,
    pageSize: number,
    searchParams: Record<string, string>,
    id?: number
  ) => Promise<PaginationResult<T>>
  initialPageSize?: number
  initialPageIndex?: number
  debounceDelay?: number
  id?: number
}

type PaginationResult<T> = {
  results: T[]
  totalPages: number
}

type UseInfiniteScrollWithFetchReturn<T> = {
  data: T[]
  totalPages: number
  pageIndex: number
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  setData: Dispatch<SetStateAction<T[]>>
  loadMore: () => void
  resetPagination: () => void
  searchParamsObj: Record<string, string>
}

const useInfiniteScrollWithFetch = <T>({
  queryKey = [],
  fetchData,
  initialPageSize = 2,
  initialPageIndex = 1,

  id
}: UseInfiniteScrollWithFetchProps<T>): UseInfiniteScrollWithFetchReturn<T> => {
  const [data, setData] = useState<T[]>([])
  const [pageIndex, setPageIndex] = useState(initialPageIndex)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [totalPages, setTotalPages] = useState<number>(Infinity)
  const [prevPageIndex, setPrevPageIndex] = useState<number>(initialPageIndex)

  const searchParams = useSearchParams()

  // Convert searchParams from URL to an object
  const searchParamsObj = useMemo(() => {
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })
    return params
  }, [searchParams])

  const {
    data: fetchedData,
    isLoading,
    isSuccess,
    isError
  } = useQuery<PaginationResult<T>, Error>({
    queryKey: [...queryKey, pageIndex, pageSize, searchParamsObj],
    queryFn: () => fetchData(pageIndex, pageSize, searchParamsObj, id)
  })
  const resetPagination = useCallback(() => {
    setPageIndex(initialPageIndex)
    setPageSize(initialPageSize)
  }, [initialPageIndex, initialPageSize])

  useEffect(() => {
    if (fetchedData) {
      if (pageIndex === 1) {
        setData(fetchedData.results || [])
      } else if (pageIndex !== prevPageIndex) {
        setData(prev => {
          const newResults = fetchedData.results || []
          return [...prev, ...newResults]
        })
      }
      setPrevPageIndex(pageIndex)
      setTotalPages(fetchedData.totalPages)
    }
  }, [fetchedData, searchParamsObj, pageIndex])

  const handlePageChange = useCallback(
    (newPageIndex: number) => {
      if (newPageIndex > totalPages || newPageIndex < 1) return
      setPageIndex(newPageIndex)
    },
    [totalPages]
  )

  const loadMore = useCallback(() => {
    setTimeout(() => {
      handlePageChange(pageIndex + 1)
    }, 1500)
  }, [pageIndex, handlePageChange])

  return {
    data,
    totalPages,
    pageIndex,
    isLoading,
    isError,
    isSuccess,
    setData,
    loadMore,
    resetPagination,
    searchParamsObj
  }
}

export default useInfiniteScrollWithFetch
