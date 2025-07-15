import { ColumnDef } from '@tanstack/react-table'

import { Skeleton } from '@/src/app/shared/components'

import { TableBody, TableCell, TableRow } from './Table'

const TableBodySkeleton = <TData, TValue>({
  columns,
  rowCount
}: {
  columns: ColumnDef<TData, TValue>[]
  rowCount: number
}): JSX.Element => {
  return (
    <TableBody className='pl-10'>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className={`'w-32' h-4 rounded-sm`} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TableBodySkeleton
