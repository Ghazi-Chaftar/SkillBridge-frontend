import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import EditableRow from './EditableRow'
import { Column } from './GenericTable'

interface TableBodyProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowEdit?: (row: T, index: number) => void
  rowEditForm?: (
    row: T,
    index: number,
    onSubmit: (updated: T) => void,
    onCancel: () => void
  ) => React.ReactNode
  setItems: (items: T[]) => void
  currentEditingIndex: number | null
  setCurrentEditingIndex: (index: number | null) => void
  hideEdit?: boolean
}

function TableBody<T>({
  data,
  columns,
  onRowEdit,
  rowEditForm,
  setItems,
  currentEditingIndex,
  setCurrentEditingIndex,
  hideEdit
}: TableBodyProps<T>): JSX.Element {
  const handleDelete = (index: number): void => {
    const updatedData = [...data]
    updatedData.splice(index, 1)
    setItems(updatedData)
  }
  return (
    <Droppable droppableId='droppable'>
      {provided => (
        <tbody ref={provided.innerRef} {...provided.droppableProps}>
          {data.map((row, rowIndex) => (
            <EditableRow
              key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              columns={columns}
              onRowEdit={onRowEdit}
              rowEditForm={rowEditForm}
              handleDelete={handleDelete}
              currentEditingIndex={currentEditingIndex}
              setCurrentEditingIndex={setCurrentEditingIndex}
              hideEdit={hideEdit}
            />
          ))}
          {provided.placeholder}
        </tbody>
      )}
    </Droppable>
  )
}

export default TableBody
