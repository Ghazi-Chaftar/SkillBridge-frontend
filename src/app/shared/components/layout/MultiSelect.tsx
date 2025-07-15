import React from 'react'

import useMultiSelect from '../../hooks/useMultiSelect'
import { Badge } from './Badge'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './DropdownMenu'

interface MultiSelectProps {
  values: { key: string; value: string }[]
  form: { setValue: any; watch: any; formState: any }
  title: string
  placeholder: string
  name: string
}

const MultiSelect = ({
  values,
  form,
  name,
  title,
  placeholder
}: MultiSelectProps): JSX.Element => {
  const { selectedItems, handleSelectChange } = useMultiSelect({
    form,
    fieldName: name
  })

  const isOptionSelected = (key: string): boolean => {
    return selectedItems.includes(key)
  }

  return (
    <div className='relative w-[300px] cursor-pointer max-sm:w-[250px] '>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex flex-wrap gap-2 rounded-md border-2 p-2'>
            {selectedItems.length === 0 ? (
              <span className='text-sm text-gray-400'>{placeholder}</span>
            ) : (
              selectedItems.map(key => {
                const item = values.find(value => value.key === key)
                return (
                  item && (
                    <Badge
                      key={key}
                      variant='default'
                      className='!z-50 flex items-center gap-1'
                    >
                      {item.value}
                    </Badge>
                  )
                )
              })
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='mt-2 max-h-[200px] w-56 overflow-y-scroll rounded-md border-2'
          onCloseAutoFocus={e => e.preventDefault()}
        >
          <DropdownMenuLabel className='text-secondary'>
            {title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className='bg-secondary' />
          {values.map((value, index) => (
            <DropdownMenuCheckboxItem
              onSelect={e => e.preventDefault()}
              key={index}
              checked={isOptionSelected(value.key)}
              onCheckedChange={() => handleSelectChange(value.key)}
              className='text-secondary'
            >
              {value.value}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default MultiSelect
