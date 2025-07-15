import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FieldValues } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { SimpleLabeledType } from '@/src/modules/office/offerPublication/services/getOfferData'
import { LabeledIconType } from '@/src/types'

import useMultiSelectHook from '../../hooks/useMultiSelectHook'
import {
  Badge,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../layout'

interface MultiSelectProps<T extends FieldValues> {
  values: LabeledIconType[] | SimpleLabeledType[]
  form: UseFormReturn<T>
  title: string
  placeholder: string
  name: keyof T
  slicingNumber?: number
  badgeClassName?: string
}

const MultiSelect = <T extends FieldValues>({
  values,
  form,
  name,
  placeholder,
  slicingNumber = 2,
  badgeClassName
}: MultiSelectProps<T>): JSX.Element => {
  const { selectedItems, handleSelectChange } = useMultiSelectHook({
    form,
    fieldName: name as string
  })
  const t = useTranslations('constants')
  const [isOpen, setIsOpen] = useState(false)
  const isOptionSelected = (id: string): boolean => {
    return selectedItems.includes(id)
  }

  const triggerRef = useRef<HTMLDivElement>(null)
  const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(
    undefined
  )

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setDropdownWidth(triggerRef.current.offsetWidth)
    }
  }, [selectedItems])

  return (
    <div className='relative w-full'>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild className='w-full'>
          <div
            ref={triggerRef}
            className='flex min-h-[48px] w-full cursor-pointer flex-wrap items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm transition focus:outline-none'
          >
            <div className='flex flex-1 flex-wrap items-center gap-2'>
              {selectedItems.length === 0 ? (
                <span className='text-sm text-gray-400'>{placeholder}</span>
              ) : (
                <>
                  {selectedItems.slice(0, slicingNumber).map(id => {
                    const item = values.find(
                      value => value.id.toString() === id
                    )
                    return (
                      item && (
                        <Badge
                          key={id}
                          variant='default'
                          className={cn(
                            'rounded-full bg-primary px-3 py-1 text-[10px] text-white',
                            badgeClassName
                          )}
                        >
                          {item.label}
                        </Badge>
                      )
                    )
                  })}
                  {selectedItems.length > slicingNumber && (
                    <Badge
                      variant='outline'
                      className='rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-[10px] text-secondary'
                    >
                      +{selectedItems.length - slicingNumber} {t('more')}
                    </Badge>
                  )}
                </>
              )}
            </div>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-secondary transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='mt-2 max-h-[250px] overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg'
          style={{ width: dropdownWidth }}
          onCloseAutoFocus={e => e.preventDefault()}
        >
          {values.map((value, index) => (
            <DropdownMenuCheckboxItem
              onSelect={e => e.preventDefault()}
              key={index}
              checked={isOptionSelected(value.id.toString())}
              onCheckedChange={() => handleSelectChange(value.id.toString())}
              className={cn(
                'flex items-center gap-2 px-3 py-2 pl-8 text-sm text-secondary hover:bg-gray-100',
                isOptionSelected(value.id.toString()) && 'font-semibold'
              )}
            >
              {value.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default MultiSelect
