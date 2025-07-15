import { useTranslations } from 'next-intl'
import React from 'react'

import { Column } from './GenericTable'

interface TableHeaderProps<T> {
  columns: Column<T>[]
  hideEdit?: boolean
}

function TableHeader<T>({
  columns,
  hideEdit
}: TableHeaderProps<T>): JSX.Element {
  const t = useTranslations('admin')
  return (
    <thead>
      <tr className='bg-secondary '>
        {columns.map((column, index) => (
          <th
            key={index}
            className=' px-4 py-4 text-sm font-semibold text-white last:border-r-0'
            style={{
              width: column.width || 'auto',
              minWidth: column.minWidth || '100px'
            }}
          >
            {column.label}
          </th>
        ))}
        {!hideEdit && (
          <th className=' px-4 py-2 text-sm font-semibold text-white last:border-r-0'>
            {t('actions')}
          </th>
        )}
      </tr>
    </thead>
  )
}

export default TableHeader
