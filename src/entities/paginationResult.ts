export type PaginationResult<T> = {
  count: number
  next: string | null
  previous: string | null
  totalPages: number
  results: T[]
}
