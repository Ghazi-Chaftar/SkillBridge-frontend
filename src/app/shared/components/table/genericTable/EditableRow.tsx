import { Pencil, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { useQuoteGenerationStore } from '@/src/lib/useQuoteGenerationStore'
import PageBreak from '@/src/modules/architect/quote/components/quoteGeneration/PageBreak'

import { TableCell, TableRow } from '../Table'
import { Column } from './GenericTable'

interface EditableRowProps<T> {
  row: T
  rowIndex: number
  columns: Column<T>[]
  onRowEdit?: (row: T, index: number) => void
  rowEditForm?: (
    row: T,
    index: number,
    onSubmit: (updated: T) => void,
    onCancel: () => void
  ) => React.ReactNode
  handleDelete: (index: number) => void
  currentEditingIndex: number | null
  setCurrentEditingIndex: (index: number | null) => void
  hideEdit?: boolean
}

function EditableRow<T>({
  row,
  rowIndex,
  columns,
  onRowEdit,
  rowEditForm,
  handleDelete,
  currentEditingIndex,
  setCurrentEditingIndex,
  hideEdit = false
}: EditableRowProps<T>): JSX.Element {
  const [isEditing, setIsEditing] = useState(false)
  const [editedRow, setEditedRow] = useState<T>(row)
  const { breakingAt } = useQuoteGenerationStore()
  const handleSave = (updated: T): void => {
    onRowEdit?.(updated, rowIndex)
    setIsEditing(false)
    setCurrentEditingIndex(null)
  }

  const handleCancel = (): void => {
    setIsEditing(false)
    setEditedRow(row)
    setCurrentEditingIndex(null)
  }

  const handleEdit = (): void => {
    setCurrentEditingIndex(rowIndex)
    setEditedRow(row)
    setIsEditing(true)
  }

  if (isEditing && rowEditForm && rowIndex === currentEditingIndex) {
    return (
      <td colSpan={columns.length + 1} className='w-full'>
        <div className='flex w-full flex-col gap-4'>
          {rowEditForm(editedRow, rowIndex, handleSave, handleCancel)}
        </div>
      </td>
    )
  }

  return (
    <React.Fragment key={rowIndex}>
      {breakingAt?.node === 'service' &&
        breakingAt?.index === rowIndex.toString() && (
          <TableRow key={`break-${rowIndex}`}>
            <TableCell colSpan={columns.length + 1}>
              <PageBreak />
            </TableCell>
          </TableRow>
        )}
      <Draggable draggableId={String(rowIndex)} index={rowIndex}>
        {provided => (
          <tr
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='w-full border-none '
          >
            {columns.map((col, colIndex) => (
              <td
                key={colIndex}
                className='px-4 py-4 text-sm text-gray-700 last:border-r-0'
                style={{
                  width: col.width || 'auto',
                  minWidth: col.minWidth || '100px'
                }}
              >
                {col.render
                  ? col.render((row as any)[col.key], row, rowIndex)
                  : String((row as any)[col.key] ?? '')}
              </td>
            ))}
            {!hideEdit && (
              <td className='px-4 py-2 text-sm text-gray-700 last:border-r-0'>
                <div className='flex h-full items-center justify-center gap-2'>
                  <Pencil
                    size={20}
                    className='cursor-pointer hover:text-primary'
                    onClick={handleEdit}
                  />
                  <Trash
                    size={20}
                    className='cursor-pointer hover:text-primary'
                    onClick={() => handleDelete(rowIndex)}
                  />
                </div>
              </td>
            )}
          </tr>
        )}
      </Draggable>
    </React.Fragment>
  )
}

export default EditableRow
