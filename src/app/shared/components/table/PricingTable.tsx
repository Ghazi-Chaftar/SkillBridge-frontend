'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Check, EllipsisVertical, Pencil, Trash, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { ZodObject, ZodRawShape } from 'zod'

import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/src/app/shared/components/table'
import { useQuoteGenerationStore } from '@/src/lib/useQuoteGenerationStore'
import PageBreak from '@/src/modules/architect/quote/components/quoteGeneration/PageBreak'

import { Input } from '../form'
import Editor from '../form/richText/Editor'
import { Button } from '../utils'
import TableBodySkeleton from './TableSkeleton'

function hasAccessorKey<TData>(
  col: ColumnDef<TData, unknown>
): col is ColumnDef<TData, unknown> & { accessorKey: keyof TData } {
  return 'accessorKey' in col && typeof col.accessorKey === 'string'
}

const getColumnWidthClass = (accessorKey?: string): string => {
  if (accessorKey === 'title') return 'w-[500px] min-w-[500px]'
  if (accessorKey === 'id') return 'w-[50px] min-w-[50px]'
  if (
    accessorKey === 'total' ||
    accessorKey === 'quantity' ||
    accessorKey === 'unitPrice'
  )
    return 'w-[100px] min-w-[100px]'
  if (accessorKey === 'draggable') return 'w-[50px] min-w-[50px]'
  return ''
}

interface DataTableProps<
  TData extends { id: string | number; [key: string]: any }
> {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  pageCount: number
  pageIndex: number
  pageSize: number
  onDragEnd?: (items: TData[]) => void
  setItems?: (items: TData[]) => void
  withoutHearders?: boolean
  className?: string
  rowClassName?: string
  tableBodyClassName?: string
  HeaderclassName?: string
  isLoading?: boolean
  zodSchema: ZodObject<ZodRawShape>
  operationKeys?: string[]
  calculatedKey?: string
  calculationType?: 'sum' | 'multiply'
  onEditFieldChange?: (row: TData, field: string, value: unknown) => TData
  customEditors?: Record<
    string,
    (value: unknown, onChange: (value: unknown) => void) => JSX.Element
  >
  expandableFieldKey?: string
}

export const PricingTable = <
  TData extends { id: string | number; [key: string]: any }
>({
  columns,
  data = [],
  pageCount,
  pageIndex,
  pageSize,
  onDragEnd,
  setItems,
  withoutHearders = false,
  className,
  rowClassName,
  tableBodyClassName,
  HeaderclassName,
  isLoading,
  onEditFieldChange,
  customEditors,
  zodSchema,
  operationKeys,
  calculatedKey,
  calculationType,
  expandableFieldKey
}: DataTableProps<TData>): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false)
  const [editingRowId, setEditingRowId] = useState<string | number | null>(null)
  const [editableData, setEditableData] = useState<Partial<TData>>({})
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})
  const t = useTranslations('validation')
  const { breakingAt } = useQuoteGenerationStore()

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination: { pageIndex, pageSize } },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const handleDragStart = (): void => setIsDragging(true)

  const handleDragEnd = (result: DropResult): void => {
    setIsDragging(false)
    if (!result.destination || result.destination.index === result.source.index)
      return

    const reordered = [...data]
    const [removed] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, removed)

    setItems?.(reordered)
    onDragEnd?.(reordered)
  }

  const handleSave = (itemId: string | number): void => {
    if (zodSchema) {
      const validationSchemaWithoutNeeds = zodSchema.omit({ needs: true })
      const result = validationSchemaWithoutNeeds.safeParse(editableData)
      if (!result.success) {
        const fieldErrors: Record<string, string> = {}
        result.error.errors.forEach(err => {
          const field = err.path[0]
          if (typeof field === 'string') fieldErrors[field] = err.message
        })
        setValidationErrors(fieldErrors)
        return
      }
    }

    const newData = data.map(item => {
      if (item.id !== itemId) return item
      let updated = { ...item }

      Object.entries(editableData).forEach(([key, value]) => {
        if (onEditFieldChange) {
          updated = onEditFieldChange(updated, key, value)
        } else {
          ;(updated as Record<string, unknown>)[key] = value
        }
      })

      if (operationKeys && calculatedKey) {
        const values = operationKeys.map(key =>
          Number((updated as Record<string, unknown>)[key])
        )
        const areAllValid = values.every(val => !isNaN(val))

        if (areAllValid) {
          ;(updated as Record<string, unknown>)[calculatedKey] =
            calculationType === 'sum'
              ? values.reduce((acc, val) => acc + val, 0)
              : values.reduce((acc, val) => acc * val, 1)
        }
      }

      return updated
    })

    setItems?.(newData)
    setEditingRowId(null)
    setEditableData({})
    setValidationErrors({})
  }

  const deleteRow = (id: number): void => {
    const newData = data.filter(item => item.id !== id)
    setItems?.(newData)
  }

  const renderInput = (
    key: string,
    value: unknown,
    icon?: string
  ): JSX.Element => {
    const error = validationErrors[key]
    return (
      <div className='flex flex-col'>
        {customEditors?.[key] ? (
          customEditors[key](value, val => {
            setEditableData(prev => ({ ...prev, [key]: val }))
            setValidationErrors(prev => ({ ...prev, [key]: '' }))
          })
        ) : (
          <Input
            type='text'
            className='w-full'
            value={String((value as string) ?? '')}
            onChange={e => {
              setEditableData(prev => ({ ...prev, [key]: e.target.value }))
              setValidationErrors(prev => ({ ...prev, [key]: '' }))
            }}
            rightIcon={
              key === 'quantity' ? (
                <p className='text-text-secondary'>{icon as string}</p>
              ) : undefined
            }
          />
        )}
        {error && (
          <span className='mt-1 text-xs text-destructive'>{t(error)}</span>
        )}
      </div>
    )
  }

  const renderExpandableRow = (isEditing: boolean): JSX.Element | null => {
    if (!isEditing || !expandableFieldKey) return null

    return (
      <TableRow>
        {Array.from({ length: columns.length + 1 }).map((_, i) => {
          if (i === 2) {
            return (
              <TableCell key={i} colSpan={4}>
                <div className='w-full border border-gray-200 p-2'>
                  <label className='mb-1 block text-sm font-semibold capitalize'>
                    {expandableFieldKey}
                  </label>

                  <Editor
                    value={editableData[expandableFieldKey] as string}
                    onChange={newValue =>
                      setEditableData(prev => ({
                        ...prev,
                        [expandableFieldKey]: newValue
                      }))
                    }
                    placeholder=''
                    className=''
                  />
                  {validationErrors[expandableFieldKey] && (
                    <span className='mt-1 text-xs text-destructive'>
                      {t(validationErrors[expandableFieldKey])}
                    </span>
                  )}
                </div>
              </TableCell>
            )
          }

          if (i < 4) return <TableCell key={i} />
          return null
        })}
      </TableRow>
    )
  }

  return (
    <div
      className={cn(
        'w-full rounded-[12px] bg-white pb-7 pt-5',
        isDragging && 'overflow-hidden',
        className
      )}
    >
      <div className='flex min-h-[280px] flex-col justify-between overflow-x-auto'>
        <Table className='w-full min-w-[600px] table-fixed md:overflow-hidden'>
          <TableHeader
            className={cn(
              'bg-secondary',
              HeaderclassName,
              withoutHearders && 'hidden'
            )}
          >
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'py-2 text-sm font-semibold text-white',
                      hasAccessorKey(header.column.columnDef) &&
                        getColumnWidthClass(
                          header.column.columnDef.accessorKey as string
                        )
                    )}
                  >
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
                <TableHead className='w-[100px] min-w-[100px] py-2 text-sm font-semibold text-white'>
                  <EllipsisVertical size={20} />
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>

          {isLoading && <TableBodySkeleton columns={columns} rowCount={10} />}

          {!isLoading && (
            <DragDropContext
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <Droppable droppableId='table-body'>
                {provided => (
                  <TableBody
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn('pl-10', tableBodyClassName)}
                  >
                    {data.map((item, index) => {
                      const row = table.getRowModel().rows[index]
                      const isEditing = editingRowId === item.id

                      return (
                        <React.Fragment key={item.id}>
                          {breakingAt?.node === 'service' &&
                            breakingAt?.index === index.toString() && (
                              <TableRow key={`break-${index}`}>
                                <TableCell colSpan={columns.length + 1}>
                                  <PageBreak />
                                </TableCell>
                              </TableRow>
                            )}
                          <Draggable
                            draggableId={String(item.id)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <TableRow
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={cn(
                                  'mb-4 w-full',
                                  rowClassName,
                                  snapshot.isDragging && 'opacity-80'
                                )}
                              >
                                {isEditing ? (
                                  <>
                                    {columns.map((col, colIdx) => {
                                      let key = col.id ?? ''
                                      if (hasAccessorKey(col))
                                        key = col.accessorKey as string
                                      const value =
                                        editableData[key as keyof TData] ?? ''
                                      return (
                                        <TableCell
                                          key={colIdx}
                                          className={cn(
                                            hasAccessorKey(col) &&
                                              getColumnWidthClass(
                                                col.accessorKey as string
                                              )
                                          )}
                                        >
                                          {colIdx === 0 ||
                                          colIdx === 1 ||
                                          colIdx === columns.length - 1 ? (
                                            <span>
                                              {String(
                                                item[key as keyof TData] ?? ''
                                              )}
                                            </span>
                                          ) : (
                                            renderInput(
                                              key,
                                              value,
                                              item['unit' as keyof TData].title
                                            )
                                          )}
                                        </TableCell>
                                      )
                                    })}
                                    <TableCell className='w-[300px] min-w-[300px]  text-center'>
                                      <div className='flex justify-center gap-3'>
                                        <Button
                                          onClick={() => handleSave(item.id)}
                                          size={'sm'}
                                          className='bg-secondary'
                                        >
                                          <Check size={20} />
                                        </Button>
                                        <Button
                                          onClick={() => {
                                            setEditingRowId(null)
                                            setEditableData({})
                                          }}
                                          size={'sm'}
                                          className='bg-secondary'
                                        >
                                          <X size={20} />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </>
                                ) : (
                                  <>
                                    {row.getVisibleCells().map(cell => (
                                      <TableCell
                                        key={cell.id}
                                        className={cn(
                                          hasAccessorKey(
                                            cell.column.columnDef
                                          ) &&
                                            getColumnWidthClass(
                                              cell.column.columnDef
                                                .accessorKey as string
                                            )
                                        )}
                                      >
                                        {flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext()
                                        )}
                                      </TableCell>
                                    ))}
                                    <TableCell>
                                      <div className='flex gap-2 self-center'>
                                        <Pencil
                                          size={20}
                                          className='cursor-pointer hover:text-primary'
                                          onClick={() => {
                                            setEditingRowId(item.id)
                                            setEditableData(item)
                                          }}
                                        />
                                        <Trash
                                          size={20}
                                          className='cursor-pointer hover:text-primary'
                                          onClick={() =>
                                            deleteRow(
                                              parseInt(item.id as string)
                                            )
                                          }
                                        />
                                      </div>
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            )}
                          </Draggable>
                          {isEditing &&
                            expandableFieldKey &&
                            renderExpandableRow(isEditing)}
                        </React.Fragment>
                      )
                    })}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </Table>
      </div>
    </div>
  )
}
