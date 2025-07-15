import { ChevronDown, CircleX, LucideProps, Search } from 'lucide-react'
import React, {
  ChangeEvent,
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import { FieldError } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { FormLabel, Input, Separator } from '@/src/app/shared/components'

interface SearchWithDropdownProps<T> {
  value: string
  onChange: (value: string) => void
  onSelect: (item: T) => void
  suggestions: T[]
  renderSuggestion: (item: T) => React.ReactNode
  placeholder?: string
  debounceDelay?: number
  onSelectSuggestion: (item: any) => void
  className?: string
  setSuggestion?: Dispatch<SetStateAction<T[]>>
  inputClassName?: string
  withoutIcon?: boolean
  label?: string
  error?: FieldError
  defaultData?: T[]
  setStateValue?: Dispatch<SetStateAction<string>>
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  title: string
  handleReset: () => void
}

export function DropDownSearch<T>({
  value,
  onChange,
  onSelect,
  suggestions,
  renderSuggestion,
  className,
  setSuggestion,
  inputClassName,
  label,
  error,
  setStateValue,
  defaultData,
  Icon,
  placeholder,
  title,
  handleReset
}: SearchWithDropdownProps<T>): React.ReactElement {
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleToggleDropdown = (): void => {
    if (defaultData) setSuggestion?.(defaultData)
    setShowDropdown(prev => !prev)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value
    setSearchInput(newValue)
    setStateValue?.(newValue)

    if (newValue === '') {
      if (defaultData) setSuggestion?.(defaultData)
    }

    onChange(newValue)
  }

  const handleSuggestionClick = (item: T): void => {
    onSelect(item)
    setSearchInput('')
    if (defaultData) setSuggestion?.(defaultData)
    setShowDropdown(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} className={cn('relative', className)}>
      {label && (
        <FormLabel
          className={cn('text-secondary', error && 'text-destructive')}
        >
          {label}
        </FormLabel>
      )}
      {/* Main input acting as a dropdown toggle */}
      <Input
        readOnly
        value={value}
        onClick={handleToggleDropdown}
        placeholder={placeholder}
        className={cn('h-14 cursor-pointer', inputClassName)}
        icon={<Icon className='stroke-primary' size={20} />}
        rightIcon={
          <div className='flex items-center gap-2'>
            <CircleX
              className={cn(
                'cursor-pointer stroke-destructive',
                value == '' && 'hidden'
              )}
              size={16}
              onClick={() => {
                handleReset()
              }}
            />
            <ChevronDown
              className={cn(
                'cursor-pointer stroke-text-secondary transition-transform duration-300',
                showDropdown && 'rotate-180'
              )}
              onClick={handleToggleDropdown}
              size={16}
            />
          </div>
        }
      />

      {showDropdown && (
        <div className='absolute z-[200] mt-1 w-full rounded-md border bg-white shadow-lg'>
          {/* Search input inside dropdown */}
          <div className='p-2'>
            <h3 className='mb-2 px-1 font-semibold'>{title}</h3>
            <Input
              value={searchInput}
              onChange={handleSearchChange}
              placeholder={placeholder}
              icon={<Search className='stroke-primary' size={18} />}
              className='h-10'
            />
            <Separator className='mt-3 h-px bg-gray-200 ring-offset-background' />
          </div>

          <ul className='max-h-60 overflow-auto px-1 pb-2'>
            {suggestions.map((item, index) => (
              <li
                key={index}
                className='cursor-pointer rounded-md p-2 px-4 text-sm hover:bg-primary hover:text-white'
                onMouseDown={() => handleSuggestionClick(item)}
              >
                {renderSuggestion(item)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
