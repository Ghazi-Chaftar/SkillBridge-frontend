import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'

import { Button } from '@/src/app/shared/components'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/src/app/shared/components'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  onPageChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
  pageSizeOptions?: number[]
}

export const DataTablePagination = <TData,>({
  table,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 40, 50]
}: DataTablePaginationProps<TData>): JSX.Element => {
  const t = useTranslations('constants')
  const pageIndex: number = table.getState().pagination.pageIndex
  const pageCount: number = table.getPageCount()
  //const pageSize: number = table.getState().pagination.pageSize
  const previousPage: number = table.getState().pagination.pageIndex - 1
  const nextPage: number = table.getState().pagination.pageIndex + 1

  return (
    <div className='flex w-full flex-col-reverse items-center justify-center gap-4 overflow-auto p-1 sm:flex-row sm:gap-8'>
      <div className='flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
        <div className='flex items-center space-x-2'>
          <p className='whitespace-nowrap text-sm font-medium'>
            {t('pageSize')}
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={value => {
              onPageSizeChange(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[4.5rem]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {pageSizeOptions.map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center justify-center text-sm font-medium'>
          {t('pageNumber', {
            pageIndex: table.getState().pagination.pageIndex,
            pageCount: table.getPageCount()
          })}
          {/* Page {table.getState().pagination.pageIndex} of
          {table.getPageCount()} */}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            aria-label='Go to first page'
            variant='outline'
            className='hidden size-8 p-0 lg:flex'
            onClick={() => onPageChange(1)}
            disabled={pageIndex == 1}
          >
            <DoubleArrowLeftIcon className='size-4' aria-hidden='true' />
          </Button>
          <Button
            aria-label='Go to previous page'
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => onPageChange(previousPage)}
            disabled={pageIndex == 1}
          >
            <ChevronLeftIcon className='size-4' aria-hidden='true' />
          </Button>
          <Button
            aria-label='Go to next page'
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => onPageChange(nextPage)}
            disabled={pageIndex == pageCount}
          >
            <ChevronRightIcon className='size-4' aria-hidden='true' />
          </Button>
          <Button
            aria-label='Go to last page'
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => onPageChange(table.getPageCount())}
            disabled={pageIndex === pageCount}
          >
            <DoubleArrowRightIcon className='size-4' aria-hidden='true' />
          </Button>
        </div>
      </div>
    </div>
  )
}
