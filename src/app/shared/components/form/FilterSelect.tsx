// components/FilterSelect.tsx
import { X as ClearIcon } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/src/app/shared/components'
import { FilterOption } from '@/src/modules/admin/blogs/constants/filters'

interface FilterSelectProps {
  selectedFilter?: string
  onFilterChange: (value: string) => void
  options: FilterOption[]
  title?: string
  selectedStringFilter?: string
  value?: string
  className?: string
  selectClassName?: string
  listClassName?: string
  placeholder?: string
  icon?: React.ReactElement
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  selectedFilter,
  onFilterChange,
  options,
  title,
  icon,
  value,
  className,
  selectClassName,
  listClassName,
  placeholder
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <p className='text-base font-bold text-[#263238]'>{title}</p>
      <div className='flex items-center gap-2'>
        <Select value={value} onValueChange={onFilterChange}>
          <SelectTrigger
            className={cn(
              'flex w-[324px] items-center justify-between rounded-md border py-[10px] pl-3 pr-2 text-[#90A4AE]',
              selectClassName
            )}
          >
            <div className='flex flex-grow items-center gap-2'>
              {icon && (
                <span className='text-primary'>
                  {React.cloneElement(icon, { size: 20 })}
                </span>
              )}
              <SelectValue placeholder={placeholder} className='w-full' />
            </div>
          </SelectTrigger>

          <SelectContent
            className={cn('w-[324px] rounded-md border ', listClassName)}
          >
            <SelectGroup>
              <SelectLabel>{title}</SelectLabel>
              {options?.map(option =>
                option.value ? (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ) : null
              )}
            </SelectGroup>
          </SelectContent>
          {selectedFilter && (
            <ClearIcon
              onClick={() => {
                onFilterChange('')
              }}
              className='cursor-pointer stroke-[#CFD8DC]'
            />
          )}
        </Select>
      </div>
    </div>
  )
}

export default FilterSelect
