'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/src/app/shared/components/table'
import { FilterOption } from '@/src/modules/admin/blogs/constants/filters'
import { EmptyCollectionsTable } from '@/src/modules/supplierCatalogManagement/components/emptyCollectionsTable'
import { EmptyProductsTable } from '@/src/modules/supplierCatalogManagement/components/emptyProductsTable'
import { ProductVisibilityState } from '@/src/modules/supplierCatalogManagement/constants/productVisibilityState'
import { FilterConfig } from '@/src/types'

import { DropDownSearch } from '../form/DropDownSearch'
import FilterSelect from '../form/FilterSelect'
import { Input } from '../form/Input'
import { SimpleDatePicker } from '../form/SimpleDatePicker'
import DateFilter from '../utils/DateFilter'
import { SearchContainer } from './SearchContainer'
import { DataTablePagination } from './TablePagination'
import TableBodySkeleton from './TableSkeleton'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[] | undefined
  title?: string
  subTitle?: string
  pageCount: number
  pageIndex: number
  pageSize: number
  isFiltered?: boolean
  onPageChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
  button?: React.ReactNode
  hasSearchInput?: boolean
  hasTwoSearchInputs?: boolean
  onFilterVisibilityState?: (state: ProductVisibilityState | null) => void
  selectedVisibilityState?: ProductVisibilityState | null
  searchColumn?: keyof TData
  onSearch?: (searchTerm: string) => void
  filterOptions?: FilterOption[]
  onFilterChange?: (value: string) => void
  secondFilterOptions?: FilterOption[]
  onSecondFilterChange?: (value: string | null) => void
  withoutHearders?: boolean
  className?: string
  rowClassName?: string
  tableBodyClassName?: string
  collectionsTable?: boolean
  HeaderclassName?: string
  hasSearchSelect?: boolean
  filters?: FilterConfig[]
  quoteRequestFilters?: FilterConfig[]
  onBackendFilterChange?: (key: string, value: string | undefined) => void
  isLoading?: boolean
  renderExpandedRow?: (row: TData) => ReactNode
}

// eslint-disable-next-line complexity
export const DataTable = <TData, TValue>({
  columns,
  data = [],
  title,
  subTitle,
  pageCount,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
  button,
  hasSearchInput,
  hasTwoSearchInputs,
  onFilterVisibilityState,
  selectedVisibilityState,
  onSearch,
  filterOptions,
  onFilterChange,
  secondFilterOptions,
  onSecondFilterChange,
  withoutHearders = false,
  className,
  rowClassName,
  tableBodyClassName,
  collectionsTable,
  HeaderclassName,
  hasSearchSelect,
  filters,
  quoteRequestFilters,
  isFiltered,
  onBackendFilterChange,
  isLoading,
  renderExpandedRow
}: DataTableProps<TData, TValue>): JSX.Element => {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination: { pageIndex, pageSize } },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })
  const t = useTranslations('constants')
  const tSearch = useTranslations('supplierCatalogManagement')

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onSearch?.(event.target.value)
  }

  const handleFilterChange = (value: string): void => {
    onFilterChange?.(value)
  }

  return (
    <div
      className={cn(
        'rounded-[12px] border bg-white pb-7 pt-5',
        hasSearchInput && 'pt-0',
        className
      )}
    >
      <div className='mb-5 px-6'>
        <div className='flex justify-between'>
          {!hasSearchInput && (
            <div className='flex w-full flex-col'>
              <h1 className='w-fit self-start text-sm font-bold text-secondary md:text-lg'>
                {title}
              </h1>
              <p className='w-fit self-start text-[9px] text-text-secondary md:text-sm'>
                {subTitle}
              </p>
            </div>
          )}
          <div className='flex w-full flex-col items-start justify-between  sm:flex-row '>
            {!hasSearchSelect && (
              <SearchContainer
                hasSearchInput={hasSearchInput}
                hasTwoSearchInputs={hasTwoSearchInputs}
              >
                {hasSearchInput && (
                  <div className='grid w-full gap-2 sm:grid-cols-2 md:grid-cols-3 '>
                    <Input
                      type='text'
                      id='search'
                      className='mt-2 h-[42px]'
                      placeholder={
                        collectionsTable
                          ? tSearch('collection.searchInput')
                          : tSearch('product.searchInput')
                      }
                      icon={<Search className='mt-1 stroke-primary' />}
                      onChange={handleSearchChange}
                      parentClassName='w-full'
                    />
                    {hasTwoSearchInputs && filterOptions && (
                      <FilterSelect
                        className=''
                        options={filterOptions}
                        placeholder={
                          collectionsTable
                            ? tSearch('collection.filterPlaceholder')
                            : tSearch(
                                'product.addProductForm.collectionPlaceholder'
                              )
                        }
                        onFilterChange={handleFilterChange}
                      />
                    )}
                    {hasTwoSearchInputs && secondFilterOptions && (
                      <FilterSelect
                        className=''
                        options={secondFilterOptions!}
                        placeholder={tSearch('collection.filterPlaceholder')}
                        onFilterChange={onSecondFilterChange!}
                      />
                    )}
                  </div>
                )}

                {hasTwoSearchInputs && (
                  <div className='flex h-7 gap-1'>
                    {Object.values(ProductVisibilityState).map(state => (
                      <div
                        className={cn(
                          'cursor-pointer rounded-lg px-3 py-1 text-xs font-bold text-secondary',
                          selectedVisibilityState === state && 'bg-[#F5F7FF] '
                        )}
                        key={state}
                        onClick={() => onFilterVisibilityState?.(state)}
                      >
                        {tSearch(`product.productTable.visibility.${state}`)}
                      </div>
                    ))}
                  </div>
                )}
              </SearchContainer>
            )}
            {hasSearchSelect && quoteRequestFilters && (
              <div className='w-full flex-1 '>
                <div
                  className={cn(
                    quoteRequestFilters?.some(
                      filter => filter.type === 'buttons'
                    )
                      ? 'flex-col '
                      : 'flex-row ',
                    'flex w-full gap-4  pt-2 '
                  )}
                >
                  {/* Map through quoteRequestFiltersof type 'buttons' */}
                  {quoteRequestFilters
                    ?.filter(filter => filter.type === 'buttons')
                    .map((filter, index) => (
                      <React.Fragment key={index}>
                        <div className='hidden h-7 gap-1 border-b pb-8 sm:flex'>
                          {filter.options.map(option => (
                            <div
                              className={cn(
                                'flex cursor-pointer items-baseline gap-1  px-3 py-1 text-xs font-bold text-text-secondary',
                                (filter.value === option.value ||
                                  (!filter.value && option.value === 'all')) &&
                                  'border-b-2 border-b-secondary pb-[28px] text-secondary'
                              )}
                              key={option.value}
                              onClick={() => {
                                if (option.value === 'all') {
                                  onBackendFilterChange &&
                                    onBackendFilterChange(filter.key, undefined)
                                }
                                option.value !== 'all' &&
                                  onBackendFilterChange &&
                                  onBackendFilterChange(
                                    filter.key,
                                    option.value
                                  )
                              }}
                            >
                              <span className='whitespace-nowrap'>
                                {option.label}
                              </span>
                              <div
                                className={cn(
                                  'flex h-5 w-6 items-center justify-center rounded-sm p-[10px] text-xs ',
                                  option.value === 'toProcess' &&
                                    'bg-gray-200 text-gray-400',
                                  option.value === 'all' &&
                                    'bg-secondary text-white',
                                  option.value === 'closed' &&
                                    'bg-lime-100 text-success',
                                  (option.value === 'invoicing' ||
                                    option.value === 'quoteSent') &&
                                    'bg-yellow-100 text-pending-yellow-label'
                                )}
                              >
                                {option.tip}
                              </div>
                            </div>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}

                  {/* Map through quoteRequestFilters of other types */}
                  <div className='flex w-full flex-wrap items-center gap-2 '>
                    {quoteRequestFilters
                      ?.filter(filter => filter.type !== 'buttons')
                      .map((filter, index) => (
                        <React.Fragment key={index}>
                          {filter.options.length === 0 &&
                            !filter.suggestions &&
                            filter.type !== 'date' &&
                            filter.type !== 'dateRange' && (
                              <Input
                                type='text'
                                id='search'
                                className='h-[42px] flex-1'
                                placeholder={tSearch('searchInput')}
                                onChange={e => {
                                  onBackendFilterChange &&
                                    (e.target.value.length > 2 ||
                                      e.target.value === '') &&
                                    onBackendFilterChange(
                                      filter.key,
                                      e.target.value
                                    )
                                }}
                                value={filter.value}
                                parentClassName='md:w-1/5'
                              />
                            )}
                          {filter.options.length > 0 &&
                            filter.type === 'select' && (
                              <FilterSelect
                                selectedFilter={filter.value}
                                value={filter.value}
                                onFilterChange={e =>
                                  onBackendFilterChange &&
                                  onBackendFilterChange(filter.key, e)
                                }
                                placeholder={filter.title}
                                options={filter.options}
                                className='-mt-2 w-full !pt-0 md:w-1/5'
                              />
                            )}
                          {filter.suggestions && filter.type === 'dropdown' && (
                            <DropDownSearch<typeof filter.dataType>
                              value={filter.value as string}
                              onChange={filter.handleSearchChange!}
                              onSelect={filter.handleSelect!}
                              suggestions={filter.suggestions!}
                              renderSuggestion={item => (
                                <span>
                                  {filter.getDisplayValue &&
                                    filter.getDisplayValue(item)!}
                                </span>
                              )}
                              placeholder={filter.placeholder}
                              Icon={filter.Icon!}
                              onSelectSuggestion={filter.onSelectSuggestion!}
                              className='w-full min-w-[300px] md:w-1/5'
                              inputClassName='!h-[42px]'
                              defaultData={filter.defaultData}
                              title={filter.title!}
                              handleReset={filter.handleRest!}
                            />
                          )}
                          {filter.type === 'date' && (
                            <SimpleDatePicker
                              defaultDate={filter.value}
                              setSelectedDate={filter.handleChangeDate!}
                              variant='input'
                              className='w-1/5'
                              placeholder={filter.placeholder}
                            />
                          )}
                          {filter.type === 'dateRange' && (
                            <DateFilter
                              onFilter={filter.handleChangeDateRange!}
                              className='  '
                              placeholder={filter.placeholder}
                            />
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                  {quoteRequestFilters && button && (
                    <div className='flex justify-between'>
                      <h1 className='w-fit self-start text-sm font-bold text-secondary md:text-lg'>
                        {title}
                      </h1>
                      <div className='-mt-1 flex justify-end gap-2'>
                        {button}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {hasSearchSelect && !quoteRequestFilters && (
              <>
                <div
                  className={cn(
                    filters?.some(filter => filter.type === 'buttons')
                      ? 'flex-col '
                      : 'flex-row ',
                    'flex w-full gap-4 pt-2 '
                  )}
                >
                  {/* Map through filters of type 'buttons' */}
                  {filters
                    ?.filter(filter => filter.type === 'buttons')
                    .map((filter, index) => (
                      <React.Fragment key={index}>
                        <div className='hidden h-7 gap-1 border-b pb-8 sm:flex'>
                          {filter.options.map(option => (
                            <div
                              className={cn(
                                'flex cursor-pointer items-baseline gap-1 px-3 py-1 text-xs font-bold text-text-secondary',
                                (filter.value === option.value ||
                                  (!filter.value && option.value === 'all')) &&
                                  'border-b-2 border-b-secondary pb-[28px] text-secondary'
                              )}
                              key={option.value}
                              onClick={() => {
                                if (option.value === 'all') {
                                  onBackendFilterChange &&
                                    onBackendFilterChange(filter.key, undefined)
                                }
                                option.value !== 'all' &&
                                  onBackendFilterChange &&
                                  onBackendFilterChange(
                                    filter.key,
                                    option.value
                                  )
                              }}
                            >
                              {option.label}
                              <div
                                className={cn(
                                  'flex h-5 w-6 items-center justify-center rounded-sm p-[10px] text-xs ',
                                  (option.value === 'draft' ||
                                    option.value === 'canceled') &&
                                    'bg-gray-200 text-gray-400',
                                  option.value === 'all' &&
                                    'bg-secondary text-white',
                                  (option.value === 'accepted' ||
                                    option.value === 'paid') &&
                                    'bg-lime-100 text-success',
                                  option.value === 'pending' &&
                                    'bg-yellow-100 text-pending-yellow-label',
                                  option.value === 'rejected' &&
                                    'bg-red-100 text-red-700',
                                  option.value === 'refused' &&
                                    'bg-red-100 text-red-700',
                                  option.value === 'reminded' &&
                                    'bg-red-100 text-red-700',
                                  option.value === 'unpaid' &&
                                    'bg-red-100 text-red-700'
                                )}
                              >
                                {option.tip}
                              </div>
                            </div>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}

                  {/* Map through filters of other types */}
                  <div className='flex w-full flex-wrap items-center gap-2'>
                    {filters
                      ?.filter(filter => filter.type !== 'buttons')
                      .map((filter, index) => (
                        <React.Fragment key={index}>
                          {filter.options.length === 0 &&
                            !filter.suggestions &&
                            filter.type !== 'date' &&
                            filter.type !== 'dateRange' && (
                              <Input
                                type='text'
                                id='search'
                                className='h-[42px] flex-1'
                                placeholder={tSearch('searchInput')}
                                onChange={e => {
                                  if (onBackendFilterChange) {
                                    onBackendFilterChange(
                                      filter.key,
                                      e.target.value
                                    )
                                  }
                                }}
                                icon={
                                  filter.Icon ? (
                                    <filter.Icon className='-ml-[4px] -mt-[3px] text-primary' />
                                  ) : undefined
                                }
                                value={filter.value}
                                parentClassName='md:w-1/5'
                              />
                            )}
                          {filter.options.length > 0 &&
                            filter.type === 'select' && (
                              <FilterSelect
                                selectedFilter={filter.value}
                                value={filter.value}
                                onFilterChange={e =>
                                  onBackendFilterChange &&
                                  onBackendFilterChange(filter.key, e)
                                }
                                placeholder={filter.title}
                                options={filter.options}
                                className='-mt-2 w-full !pt-0 md:w-1/5'
                                icon={filter.Icon ? <filter.Icon /> : undefined}
                              />
                            )}
                          {filter.suggestions && filter.type === 'dropdown' && (
                            <DropDownSearch<typeof filter.dataType>
                              value={filter.value as string}
                              onChange={filter.handleSearchChange!}
                              onSelect={filter.handleSelect!}
                              suggestions={filter.suggestions!}
                              renderSuggestion={item => (
                                <span>
                                  {filter.getDisplayValue &&
                                    filter.getDisplayValue(item)!}
                                </span>
                              )}
                              placeholder={filter.placeholder}
                              Icon={filter.Icon!}
                              onSelectSuggestion={filter.onSelectSuggestion!}
                              className='w-full min-w-[200px] md:w-1/5'
                              inputClassName='!h-[42px]'
                              defaultData={filter.defaultData}
                              title={filter.title!}
                              handleReset={filter.handleRest!}
                            />
                          )}
                          {filter.type === 'date' && (
                            <SimpleDatePicker
                              defaultDate={filter.value}
                              setSelectedDate={filter.handleChangeDate!}
                              variant='input'
                              className='w-1/5'
                              placeholder={filter.placeholder}
                            />
                          )}
                          {filter.type === 'dateRange' && (
                            <DateFilter
                              onFilter={filter.handleChangeDateRange!}
                              className='w-full md:w-1/6'
                              placeholder={filter.placeholder}
                            />
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                  {filters && button && (
                    <div className='flex justify-between'>
                      <h1 className='w-fit self-start text-sm font-bold text-secondary md:text-lg'>
                        {title}
                      </h1>
                      <div className='-mt-1 flex justify-end gap-2'>
                        {button}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {!filters && !quoteRequestFilters && button && (
              <div className=' flex gap-2 pt-2'>{button}</div>
            )}
          </div>
        </div>
      </div>
      <div className='flex min-h-[280px]  flex-col justify-between'>
        <Table>
          <TableHeader
            className={cn(
              HeaderclassName,
              hasSearchInput && `bg-background text-text-secondary`,
              withoutHearders && 'hidden'
            )}
          >
            {table.getHeaderGroups().map((headerGroup, index) => (
              <TableRow key={index}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead key={index}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading && <TableBodySkeleton columns={columns} rowCount={10} />}
          {!isLoading && (
            <TableBody className={cn('pl-10', tableBodyClassName)}>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, index) => (
                  <React.Fragment key={index}>
                    {/* Normal row */}
                    <TableRow
                      className={cn('mb-4', rowClassName)}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* Expanded row content - only rendered if renderExpandedRow is provided */}
                    {renderExpandedRow &&
                      renderExpandedRow(row.original as TData)}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    {collectionsTable ? (
                      isFiltered ? (
                        t('noResults')
                      ) : (
                        <EmptyCollectionsTable />
                      )
                    ) : hasTwoSearchInputs ? (
                      isFiltered ? (
                        t('noResults')
                      ) : (
                        <EmptyProductsTable />
                      )
                    ) : (
                      t('noResults')
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>

        <div className='flex items-center justify-center space-x-2 p-4'>
          <DataTablePagination
            table={table}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </div>
    </div>
  )
}
