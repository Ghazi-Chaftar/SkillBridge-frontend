import { useLocale } from 'next-intl'
import React from 'react'

import { cn } from '@/lib/utils'

import { Currency } from './CurrencySelect'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger
} from './Select'

interface CurrencyInputProps {
  className?: string
  currencyCode?: string
  value?: number
  maxValue?: number
  onChange?: (value: number | React.ChangeEvent<HTMLInputElement>) => void
  onCurrencyChange?: (field: string, value: any) => void
  disabled?: boolean
  hideCurrency?: boolean
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      className,
      currencyCode,
      value,
      maxValue,
      onChange,
      disabled,
      hideCurrency,
      onCurrencyChange,
      ...props
    },
    ref
  ) => {
    const currentLanguage = useLocale()

    const uniqueCurrencies = React.useMemo<Currency[]>(() => {
      // Define only the three required currencies
      return [
        {
          code: 'TND',
          name: 'Tunisian Dinar',
          symbol: 'DT'
        },
        {
          code: 'USD',
          name: 'US Dollar',
          symbol: '$'
        },
        {
          code: 'EUR',
          name: 'Euro',
          symbol: '€'
        }
      ].sort((a, b) => a.name.localeCompare(b.name))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      // If the input is empty, pass undefined to the parent component
      if (e.target.value === '') {
        if (onChange) {
          onChange(undefined as any)
        }
        return
      }

      const inputValue = Number(e.target.value)
      const newValue =
        maxValue !== undefined && inputValue > maxValue ? maxValue : inputValue

      if (onChange) {
        onChange(newValue)
      }
    }

    // Handle click to select all text
    const handleClick = (e: React.MouseEvent<HTMLInputElement>): void => {
      e.currentTarget.select()
    }

    // Helper function to determine the input value display
    const getDisplayValue = (): number | '' => {
      if (value === undefined || value === null || value === 0) {
        return ''
      }
      return value
    }

    const handleCurrencyChange = (newCurrencyCode: string): void => {
      onCurrencyChange?.('currency', newCurrencyCode)
    }
    return (
      <div className='relative w-full'>
        <input
          ref={ref}
          className={cn(
            'border-input placeholder:text-text-secandary flex h-[48px] w-full rounded-full border bg-background bg-white px-3 py-2 text-sm text-secondary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            hideCurrency
              ? ''
              : currentLanguage === 'ar'
                ? 'pl-[90px]'
                : 'pr-[90px]',
            className
          )}
          type='number'
          min='0'
          step='1'
          onKeyDown={e => {
            if (
              !/^\d$/.test(e.key) &&
              ![
                'Backspace',
                'Tab',
                'ArrowLeft',
                'ArrowRight',
                'Delete',
                'Enter'
              ].includes(e.key)
            ) {
              e.preventDefault()
            }
          }}
          value={getDisplayValue()}
          disabled={disabled}
          onChange={handleChange}
          onClick={handleClick}
          max={maxValue}
          {...props}
        />

        {!hideCurrency && (
          <div
            className={cn(
              'absolute top-0 flex h-[48px] items-center',
              currentLanguage === 'ar' ? 'left-1' : 'right-1'
            )}
          >
            <Select
              value={currencyCode}
              onValueChange={handleCurrencyChange}
              name='currency-select'
              disabled={disabled}
            >
              <SelectTrigger
                className='h-[36px] border-0 bg-transparent hover:bg-gray-50 focus:ring-0'
                style={{ boxShadow: 'none' }}
              >
                <span className='flex items-center gap-1'>
                  <span>{currencyCode}</span>
                </span>
              </SelectTrigger>
              <SelectContent className='min-w-[200px]'>
                <SelectGroup>
                  {uniqueCurrencies.map(currency => (
                    <SelectItem
                      key={currency?.code}
                      value={currency?.code || ''}
                    >
                      <div className='flex w-full items-center gap-2'>
                        <span className='w-8 text-left text-sm font-medium'>
                          {currency?.code}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    )
  }
)

CurrencyInput.displayName = 'CurrencyInput'

export default CurrencyInput
