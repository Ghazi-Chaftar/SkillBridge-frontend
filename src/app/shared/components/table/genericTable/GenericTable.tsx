import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import TableBody from './TableBody'
import TableHeader from './TableHeader'

export interface Column<T> {
  key: keyof T
  label: string
  width?: string // e.g., '25%', '150px'
  minWidth?: string
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode
}
interface GenericTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowEdit?: (row: T, index: number) => void
  rowEditForm?: (
    row: T,
    index: number,
    onSubmit: (updated: T) => void,
    onCancel: () => void
  ) => React.ReactNode
  rowRenderer?: (row: T, index: number) => React.ReactNode
  setItems: (items: T[]) => void
  currentEditingIndex: number | null
  setCurrentEditingIndex: (index: number | null) => void
  hideEdit?: boolean
}

export function GenericTable<T>({
  data,
  columns,
  onRowEdit,
  rowEditForm,
  setItems,
  currentEditingIndex,
  setCurrentEditingIndex,
  hideEdit
}: GenericTableProps<T>): JSX.Element {
  const handleDragEnd = (result: any): void => {
    const { destination, source } = result
    if (!destination) return
    if (destination.index === source.index) return

    const reorderedItems = Array.from(data)
    const [removed] = reorderedItems.splice(source.index, 1)
    reorderedItems.splice(destination.index, 0, removed)
    setItems(reorderedItems)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='w-full overflow-x-auto'>
        <table className='min-w-full table-fixed'>
          <TableHeader columns={columns} hideEdit={hideEdit} />
          <TableBody
            data={data}
            columns={columns}
            onRowEdit={onRowEdit}
            rowEditForm={rowEditForm}
            setItems={setItems}
            hideEdit={hideEdit}
            currentEditingIndex={currentEditingIndex}
            setCurrentEditingIndex={setCurrentEditingIndex}
          />
        </table>
      </div>
    </DragDropContext>
  )
}
